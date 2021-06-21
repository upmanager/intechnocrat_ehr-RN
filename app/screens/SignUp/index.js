import * as reduxActions from "@actions";
import { BaseConfig, BaseColor } from "@config";
import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Button, Input, Icon, CheckBox, ButtonGroup } from 'react-native-elements';
import { connect } from "react-redux";
import styles from "./styles";
import { PasswordInput, Header, Text } from "@components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { ActivityIndicator } from "react-native";
import Toast from 'react-native-simple-toast';
import Carousel from 'react-native-snap-carousel';
import { getDeviceWidth } from "@utils";

class LogIn extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    receive_newsletter: false,
    validate: {
      email: true,
      password: true,
      confirm_password: true,
      show_password: false,
      show_confirm_password: false,
    },
    gender: 0,
    visible_datepicker: false,
    birthday: '',
    agree_terms: false,
    registering: false
  }
  curIndex = 0;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.swiper.scrollBy(2, true);
    // setTimeout(() => {
    //   this.setState({ email: "Adsf" })
    // }, 2000);
  }
  setValidateState(item) {
    this.setState({
      validate: {
        ...this.state.validate,
        ...item
      }
    })
  }
  next() {
    if (this._carousel.currentIndex == 0) {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      const { email, password, confirmPassword } = this.state;
      this.setValidateState({
        email: reg.test(email),
        password: !!password,
        confirm_password: password == confirmPassword
      })
      if (!reg.test(email) || !password || password != confirmPassword) {
        return;
      }
    }
    this._carousel.snapToNext(true);
  }
  onBack() {
    if (this._carousel.currentIndex == 0) {
      this.props.navigation.navigate("LogIn");
    } else {
      this._carousel.snapToPrev(true);
    }
  }
  renderAuth() {
    const { email, password, confirmPassword, validate, receive_newsletter } = this.state;
    return (
      <View style={styles.contain}>
        <Text title1 blackColor flexCenter>Enter email and password</Text>
        <Input
          placeholder='Email'
          value={email}
          errorMessage={validate.email ? '' : 'Please input valid email'}
          containerStyle={{ marginTop: 30 }}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          placeholder='Password'
          secureTextEntry={!validate.show_password}
          value={password}
          isVisiblePassword={validate.show_password}
          onVisiblePassword={() => {
            this.setValidateState({ show_password: !validate.show_password })
          }}
          errorMessage={validate.password ? '' : 'Please input password'}
          InputComponent={PasswordInput}
          onChangeText={password => this.setState({ password })}
        />

        <Input
          placeholder='Confirm Password'
          secureTextEntry={!validate.show_confirm_password}
          value={confirmPassword}
          isVisiblePassword={validate.show_confirm_password}
          onVisiblePassword={() => {
            this.setValidateState({ show_confirm_password: !validate.show_confirm_password })
          }}
          errorMessage={validate.confirm_password ? '' : 'Confirm password no match'}
          InputComponent={PasswordInput}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
        />
        <View style={{ flex: 1 }} />
        <CheckBox
          title='I agree to receive the iHealth newsletter'
          checked={receive_newsletter}
          onPress={() => this.setState({ receive_newsletter: !receive_newsletter })}
        />

        <Button
          title="Next"
          buttonStyle={styles.actions}
          containerStyle={styles.m_10}
          disabled={!email || !password || !confirmPassword || password != confirmPassword || !receive_newsletter}
          onPress={this.next.bind(this)}
        />
      </View>
    );
  }
  renderProfile() {
    const buttons = ['Male', 'Female']
    const { gender, birthday } = this.state
    return (
      <View style={styles.contain}>
        <View style={{ flex: 1 }}>
          <Text title1 blackColor flexCenter>Select your gender</Text>
          <ButtonGroup
            onPress={(gender) => this.setState({ gender })}
            selectedIndex={gender}
            buttons={buttons}
            containerStyle={{ borderRadius: 100, overflow: "hidden", height: 50, marginTop: 40 }}
            textStyle={{ fontSize: 20 }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text title1 blackColor flexCenter>When where you born?</Text>
          <TouchableOpacity onPress={() => this.setState({ visible_datepicker: true })} activeOpacity={1}>
            <Input
              placeholder='Birthday'
              containerStyle={{ marginTop: 30 }}
              onPress={() => console.log("press")}
              disabled={true}
              value={birthday}
            />
          </TouchableOpacity>
        </View>
        <Button
          title="Create"
          buttonStyle={styles.actions}
          disabled={!birthday}
          containerStyle={styles.m_10}
          onPress={this.next.bind(this)}
        />
      </View>
    );
  }
  register() {
    Toast.showWithGravity('Successfully registerd.', Toast.SHORT, Toast.TOP);
    this.setState({ registering: false });
    setTimeout(() => {
      this.props.navigation.navigate("LogIn");
    }, 1000);
  }
  renderTerms() {
    const { agree_terms } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text numberOfLines={9999999}>
            These General terms of use (hereinafter the “Terms”) are signed between the company IHEALTHLABS US (hereinafter “iHealth”) and any third-party developer (hereinafter the “Developer”) wishing to use the iHealth Application Programming Interface (hereinafter the “API”) in order to develop third party applications intended for users of the iHealth products and services (hereinafter the “Users”).
            Use of the API is subject to strict compliance with these Terms, which the Developer must first have reviewed and accepted.
            Use of the API implies the Developer’s unconditional acceptance of the applicable terms, which impose certain obligations as well as behaviour and usage constraints upon the Developer.
            The Terms are completed by the "Partner Confidentiality Policy",which the Developers must also agree to.
          </Text>
        </ScrollView>
        <CheckBox
          title={`By registering an iHealth account, you have read and agreed with iHealth's Terms of Use and Privacy Policies`}
          checked={agree_terms}
          containerStyle={styles.m_10}
          onPress={() => this.setState({ agree_terms: !agree_terms })}
        />
        <Button
          title="Ok"
          buttonStyle={styles.actions}
          disabled={!agree_terms}
          containerStyle={styles.m_20}
          onPress={this.register.bind(this)}
        />
      </View>
    )
  }
  render() {
    const { visible_datepicker, registering } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={'Create account'}
          renderLeft={<Icon name={'angle-left'} color={BaseColor.whiteColor} size={30} type={'font-awesome'} />}
          onPressLeft={this.onBack.bind(this)}

        />
     <Carousel
          ref={(c) => { this._carousel = c; }}
          data={[this.renderAuth.bind(this), this.renderProfile.bind(this), this.renderTerms.bind(this)]}
          renderItem={({ item, index }) => item()}
          sliderWidth={getDeviceWidth()}
          itemWidth={getDeviceWidth()}
          scrollEnabled={false}
          currentScrollPosition={2}
        />
        {registering &&
          <View style={{ align: "center", flex: 1, position: "absolute", justifyContent: "center" }}>
            <View style={{ backgroundColor: "#00000099", padding: 30, borderRadius: 12 }}>
              <ActivityIndicator size={'large'} color={BaseColor.whiteColor} />
            </View>
          </View>
        }
        <DateTimePickerModal
          isVisible={visible_datepicker}
          mode="date"
          onConfirm={(res) => {
            let birthday = moment(res).format('l');
            this.setState({ birthday })
          }}
          onCancel={(err) => console.log("cancel", err)}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => (state)
const mapDispatchToProps = { ...reduxActions }
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);