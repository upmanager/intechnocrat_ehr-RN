import * as reduxActions from "@actions";
import { Images } from "@assets";
import { PasswordInput, Text } from "@components";
import { BaseConfig } from "@config";
import React, { Component } from "react";
import { Image as RNImage, Linking, TouchableOpacity, View } from "react-native";
import { Button, Input } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { connect } from "react-redux";
import styles from "./styles";

class LogIn extends Component {
  state = {
    Username: 'wkangong@itechnocrat.com',
    Password: '123',
    fbuser: 0,
    validate: {
      Username: true,
      Password: true,
      show_password: false
    },
    signing: false
  }
  constructor(props) {
    super(props);
  }
  setValidateState(item) {
    this.setState({
      validate: {
        ...this.state.validate,
        ...item
      }
    })
  }
  onVisiblePassword() {
    const { validate: { show_password } } = this.state;
    this.setValidateState({ show_password: !show_password })
  }
  forgotPassword() {
    // Linking.openURL(BaseConfig.FORGOTPASSWORDLINK);
  }
  login() {
    const { Username, Password, fbuser } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    this.setValidateState({
      Username: reg.test(Username),
      Password: !!Password
    });
    if (!reg.test(Username) || !Password) {
      return;
    }
    this.setState({ signing: true });
    this.props.login({ Username, Password, fbuser }, res => {
      this.setState({ signing: false });
      if (res.success) {
        Toast.showWithGravity(res.LoginStatus || "Login success", Toast.SHORT, Toast.TOP);
        this.props.navigation.navigate("Main");
      } else {
        Toast.showWithGravity(res.LoginStatus || "Login failed", Toast.SHORT, Toast.TOP);
      }
    });
  }
  goSignUp() {
    this.props.navigation.navigate("SignUp");
  }
  render() {
    const { Username, Password, validate, signing } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contain}>
          <RNImage source={Images.logo} style={styles.logo} resizeMode={'contain'} />
          <Input
            placeholder='Email'
            value={Username}
            errorMessage={validate.Username ? '' : 'Please input valid Username'}
            onChangeText={Username => this.setState({ Username })}
          />
          <Input
            placeholder='Password'
            secureTextEntry={!validate.show_password}
            value={Password}
            isVisiblePassword={validate.show_password}
            onVisiblePassword={this.onVisiblePassword.bind(this)}
            errorMessage={validate.Password ? '' : 'Please input Password'}
            InputComponent={PasswordInput}
            onChangeText={Password => this.setState({ Password })}
          />
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity style={styles.p_10} onPress={this.forgotPassword.bind(this)}>
              <Text headline primaryColor>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Button
            title="Log In"
            buttonStyle={styles.actions}
            containerStyle={styles.m_10}
            loading={signing}
            onPress={this.login.bind(this)}
          />
          <Button
            title="Create Account"
            buttonStyle={styles.actions}
            containerStyle={styles.m_10}
            onPress={this.goSignUp.bind(this)}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => (state)
const mapDispatchToProps = { ...reduxActions }
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);