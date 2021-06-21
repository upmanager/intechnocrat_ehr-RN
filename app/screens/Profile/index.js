import * as reduxActions from "@actions";
import { Header, Text, ButtonSelector } from "@components";
import React, { Component } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from './styles';
import { Icon, Avatar, Input } from "react-native-elements";
import { BaseColor } from "@config";
import moment from "moment";

const TESTIMAGEURL = 'https://raw.githubusercontent.com/iHealthDeviceLabs/iHealth-React-Native-SDK/main/doc/integrate-ios.png';

export class index extends Component {
  state = {
    name: 'test user',
    email: "test@gmail.com",
    gender: "Male",
    height: '155',
    weight: 45.7,
    birthday: "05/01/1990",
    region: "United States",
    athlete: "No",
    daily_activity: "Sedentary",
    bottomSheet: {
      visible: false,
      data: [],
      values: {}
    }
  }
  componentDidMount() {
    // this.RBSheet.open();
  }
  goBack() {
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
        dlgData = [
          { maxValue: 255, minValue: 50, key },
        ];
        values = { [key]: parseInt(this.state[key]) };
        break;
      case "weight":
        dlgData = [
          { maxValue: 2, minValue: 0, key: "weight_100" },
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
  renderInput(title, placeholder, key) {
    const isDisable = key == "email" || key == "region";
    const isInput = key == "name";

    const InputComponent = !isDisable && !isInput && {
      InputComponent: (props) => (
        <TouchableOpacity {...props} onPress={this.visibleDialog.bind(this, key)}>
          <Text {...props} style={[props.style, { textAlignVertical: "center" }]}>{props.value}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <Input
        leftIcon={<Text>  {title}  </Text>}
        placeholder={placeholder}
        containerStyle={{ backgroundColor: BaseColor.whiteColor }}
        errorStyle={{ height: 0 }}
        inputStyle={{ textAlign: "right", fontSize: 16 }}
        value={this.state[key]}
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
      const weight = parseFloat(`${res.weight_100}${res.weight_10}${res.weight_1}.${res.weight_01}`);
      res = { weight };
    }
    this.setState({ ...res })
  }
  render() {
    const { bottomSheet } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          renderCenter={
            <View style={styles.headerContain}>
              <View style={styles.headerAvatar}>
                <Avatar
                  rounded
                  size={'large'}
                  source={{ uri: TESTIMAGEURL }}
                />
              </View>
              <Text whiteColor headline> Daniel </Text>
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
          {this.renderInput("Height", "", "height")}
          {this.renderInput("Weight", "", "weight")}
          {this.renderInput("Region", "", "region")}
          {this.renderInput("Athlete", "", "athlete")}
          {this.renderInput("Daily activity", "", "daily_activity")}
        </ScrollView>
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
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
