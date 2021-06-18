import * as reduxActions from "@actions";
import { Images } from "@assets";
import { BaseConfig } from "@config";
import React, { Component } from "react";
import { Image as RNImage, Linking, TouchableOpacity, View } from "react-native";
import { Button, Input } from 'react-native-elements';
import { connect } from "react-redux";
import styles from "./styles";
import { PasswordInput, Text } from "@components";
class LogIn extends Component {
  state = {
    email: '',
    password: '',
    validate: {
      email: true,
      password: true,
      show_password: false
    },
    signing: false
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {

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
    Linking.openURL(BaseConfig.FORGOTPASSWORDLINK);
  }
  login() {
    const { email, password } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    this.setValidateState({
      email: reg.test(email),
      password: !!password
    });
    if (!reg.test(email) || !password) {
      return;
    }
    this.setState({ signing: true });
    setTimeout(() => {
      this.setState({ signing: false });
      this.props.navigation.navigate("Main");
    }, 3000);
  }
  goSignUp() {
    this.props.navigation.navigate("SignUp");
  }
  render() {
    const { email, password, validate, signing } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contain}>
          <RNImage source={Images.logo} style={styles.logo} resizeMode={'contain'} />
          <Input
            placeholder='Email'
            value={email}
            errorMessage={validate.email ? '' : 'Please input valid email'}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            placeholder='Password'
            secureTextEntry={!validate.show_password}
            value={password}
            isVisiblePassword={validate.show_password}
            onVisiblePassword={this.onVisiblePassword.bind(this)}
            errorMessage={validate.password ? '' : 'Please input password'}
            InputComponent={PasswordInput}
            onChangeText={password => this.setState({ password })}
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