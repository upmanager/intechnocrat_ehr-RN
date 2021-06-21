import * as reduxActions from "@actions";
import { Header, Text, ButtonSelector } from "@components";
import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from './styles';
import { Icon, Avatar, Input, Button, Overlay } from "react-native-elements";
import { BaseColor, BaseConfig } from "@config";
import moment from "moment";
import { convertUnits } from "@utils";
import ImagePicker from 'react-native-image-crop-picker';

const _UPDATEKEYS = [
  'name', 'avatar', 'email', 'gender', 'height', 'weight', 'birthday', 'region', 'athlete', 'daily_activity'
]
const TESTIMAGEURL = 'https://raw.githubusercontent.com/iHealthDeviceLabs/iHealth-React-Native-SDK/main/doc/integrate-ios.png';

export class index extends Component {
  state = {
    name: '',
    avatar: "",
    email: "",
    gender: "",
    height: '',
    weight: 0,
    birthday: "",
    region: "",
    athlete: "",
    daily_activity: "",
    saved: true,
    saving: false,
    bottomSheet: {
      visible: false,
      data: [],
      values: {}
    },
    update_avatar: {
      avatar: "",
      visible: false,
    }
  }
  cur_weight_unit = {};
  cur_height_unit = {};
  componentDidMount() {
    const { auth: { user } } = this.props;
    const { units: { weight, height } } = this.props;
    this.cur_height_unit = BaseConfig.UNITS['height'][height];
    this.cur_weight_unit = BaseConfig.UNITS['weight'][weight];

    _UPDATEKEYS.map(key => {
      if (user[key] != this.state[key]) {
        this.setState({ [key]: user[key] || '' });
      }
    })
  }
  goBack() {
    const { saved } = this.state;
    if (!saved) {
      this.onSave();
    }
    this.props.navigation.goBack();
  }
  visibleDialog(key) {
    let dlgData = [];
    let values = { [key]: this.state[key] };
    switch (key) {
      case "gender":
        dlgData = [
          { list: ["Male", "Female"], key }
        ];
        break;
      case "birthday":
        dlgData = [
          { maxValue: 2020, minValue: 1900, key: "year" },
          { maxValue: 12, minValue: 1, key: "month" },
          { maxValue: 31, minValue: 1, key: "day" },
        ];
        try {
          const birthday = moment(this.state.birthday);
          values = {
            year: birthday.year(),
            month: birthday.month() + 1,
            day: birthday.date(),
          };
        } catch (error) {
        }
        break;
      case "height":
        if (this.cur_height_unit.default) {
          dlgData = [
            { maxValue: 255, minValue: 50, key },
          ];
          values = { [key]: parseInt(this.state[key]) };
        } else {
          const { feet, inches } = convertUnits(this.state[key], this.cur_height_unit, 1);
          dlgData = [
            { maxValue: 8, minValue: 1, key: "feet", suffix: " \'" },
            { maxValue: 11, minValue: 0, key: "inches", suffix: " \"" },
          ];
          values = { feet, inches };
        }
        break;
      case "weight":
        const _def = this.cur_weight_unit.default;
        dlgData = [
          { maxValue: _def ? 2 : 5, minValue: 0, key: "weight_100" },
          { maxValue: 9, minValue: 0, key: "weight_10" },
          { maxValue: 9, minValue: 0, key: "weight_1" },
          { list: ["."], key: "" },
          { maxValue: 9, minValue: 0, key: "weight_01" },
        ];
        try {
          let weight = String(this.state.weight);
          weight = weight.split(".");
          let weight_01 = weight.length > 1 ? parseInt(weight[1][0]) : 0;
          weight = weight[0].split("").reverse();
          let weight_1 = weight.length > 0 ? parseInt(weight[0]) : 0;
          let weight_10 = weight.length > 1 ? parseInt(weight[1]) : 0;
          let weight_100 = weight.length > 2 ? parseInt(weight[2]) : 0;
          values = {
            weight_100,
            weight_10,
            weight_1,
            weight_01,
          };
        } catch (error) {
        }
        break;
      case "athlete":
        dlgData = [
          { list: ["Yes", "No"], key },
        ];
        break;
      case "daily_activity":
        dlgData = [
          { list: ['Sedentary', "Active", "Very Active"], key },
        ];
        break;
      default:
        break;
    }
    this.setState({
      bottomSheet: {
        data: dlgData,
        values,
        visible: true
      }
    });
  }
  renderInput(title, placeholder, key, unit) {
    const isDisable = key == "email" || key == "region";
    const isInput = key == "name";
    let value = this.state[key];

    if (key == "weight") {
      value = convertUnits(value, this.cur_weight_unit, 1);
    }
    if (key == "height") {
      if (!this.cur_height_unit.default) {
        const { feet, inches } = convertUnits(value, this.cur_height_unit, 1);
        value = `${feet || ''}\' ${inches || ''}\"`;
      }
    }

    const InputComponent = !isDisable && !isInput && {
      InputComponent: React.forwardRef((props, ref) =>
        <TouchableOpacity ref={ref} {...props} onPress={this.visibleDialog.bind(this, key)}>
          <Text {...props} style={[props.style, { textAlignVertical: "center" }]}>{props.value}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <Input
        leftIcon={<Text>  {title}  </Text>}
        rightIcon={unit && <Text> {unit}</Text>}
        placeholder={placeholder}
        containerStyle={{ backgroundColor: BaseColor.whiteColor }}
        errorStyle={{ height: 0 }}
        inputStyle={{ textAlign: "right", fontSize: 16 }}
        value={String(value)}
        onChangeText={txt => this.onDone({ [key]: txt })}
        disabled={isDisable}
        {...InputComponent}
      />
    )
  }
  onDone(res) {
    if ("day" in res && "month" in res && "year" in res) {
      const birthday = moment().year(res.year).month(parseInt(res.month) - 1).date(res.day).format('L');
      res = { birthday };
    } else if ("weight_01" in res) {
      let weight = parseFloat(`${res.weight_100}${res.weight_10}${res.weight_1}.${res.weight_01}`);
      weight = convertUnits(weight, this.cur_weight_unit, 2, true);
      res = { weight };
    }
    else if ("feet" in res && "inches" in res) {
      const height = convertUnits({ ...res }, this.cur_height_unit, 2, true);
      res = { height };
    }
    this.setState({ ...res, saved: false })
  }
  onSave() {
    let data = { ...this.state };
    delete data.bottomSheet;
    delete data.saved;
    delete data.saving;
    delete data.avatar;
    this.setState({ saving: true });
    setTimeout(() => {
      this.setState({ saving: false })
      this.setState({ saved: true });
      this.props.updateUser(data);
    }, 5000);
  }
  selectImage(isCamera) {
    const options = {
      cropping: true,
      cropperCircleOverlay: true
    };
    let pickerFunction = ImagePicker.openPicker;
    if (isCamera) {
      pickerFunction = ImagePicker.openCamera;
    }
    pickerFunction(options)
      .then(res => {
        console.log("image select", res);
        this.updateAvatarState({ avatar: res });
      })
      .catch(err => {
        this.updateAvatarState({ avatar: null });
        console.log("select error", err);
      })
  }
  updateAvatarState(item) {
    this.setState({
      update_avatar: {
        ...this.state.update_avatar,
        ...item
      }
    });
  }
  onUpdateAvatar() {
    const { update_avatar } = this.state;
    this.setState({
      avatar: update_avatar.avatar.path
    });
    this.props.updateUser({ avatar: update_avatar.avatar.path });
    this.toggleUpdateAvatar();
  }
  toggleUpdateAvatar() {
    const { update_avatar } = this.state;
    this.updateAvatarState({ visible: !update_avatar.visible, avatar: null });
  }
  render() {
    const { auth: { user } } = this.props;
    const { bottomSheet, saved, update_avatar, avatar, saving } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          saving={saving}
          renderCenter={
            <View style={styles.headerContain}>
              <View style={styles.headerAvatar}>
                <Avatar
                  rounded
                  size={'large'}
                  source={{ uri: user.avatar || '' }}
                  title={user.name?.slice(0, 2) || "Avatar"}
                >
                  <Avatar.Accessory size={30} onPress={this.toggleUpdateAvatar.bind(this)} />
                </Avatar>
              </View>
              <Text whiteColor headline> {user.name} </Text>
            </View>
          }

          renderLeft={
            <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressLeft={this.goBack.bind(this)}
        />
        <ScrollView style={{ width: "100%" }}>
          {this.renderInput("Name", "Input your name", "name")}
          {this.renderInput("Account", "", "email")}
          {this.renderInput("Gender", "", "gender")}
          {this.renderInput("Birthday", "", "birthday")}
          {this.renderInput("Height", "", "height", this.cur_height_unit?.unit)}
          {this.renderInput("Weight", "", "weight", this.cur_weight_unit?.unit)}
          {this.renderInput("Region", "", "region")}
          {this.renderInput("Athlete", "", "athlete")}
          {this.renderInput("Daily activity", "", "daily_activity")}
        </ScrollView>
        <View style={{ width: "100%", paddingVertical: 5, paddingHorizontal: 30 }}>
          <Button
            title={"Save"}
            disabled={saved}
            onPress={this.onSave.bind(this)}
          />
        </View>
        {/* data:
              {maxValue, minValue} => number range
              {startweek:0} => week range, 0=>Sunday
              {list} => show list
        */}
        <ButtonSelector
          data={bottomSheet.data}
          values={bottomSheet.values}
          visible={bottomSheet.visible}
          onDone={this.onDone.bind(this)}
          onClose={(close) => {
            this.setState({
              bottomSheet: {
                ...bottomSheet,
                visible: false
              }
            })
          }}
        />
        <Overlay isVisible={update_avatar.visible} onBackdropPress={this.toggleUpdateAvatar.bind(this)} overlayStyle={{ width: "80%" }}>
          <Text title2 primaryColor bold> Update your avatar</Text>
          <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
            <Avatar
              rounded
              size={'xlarge'}
              source={{ uri: update_avatar.avatar?.path || avatar || '' }}
              title={user.name?.slice(0, 2) || "Avatar"}
            />
          </View>
          {update_avatar.avatar ?
            <>
              <Button title={"Update"} containerStyle={{ marginVertical: 10 }} onPress={this.onUpdateAvatar.bind(this)} />
              <Button title={"Cancel"} type="outline" onPress={this.toggleUpdateAvatar.bind(this)} />
            </ >
            :
            <>
              <Button title={"Open Camera"} containerStyle={{ marginVertical: 10 }} onPress={this.selectImage.bind(this, true)} />
              <Button title={"Open Gallery"} type="outline" onPress={this.selectImage.bind(this, false)} />
            </>

          }
        </Overlay>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
