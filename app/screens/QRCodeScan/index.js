import { Text } from "@components";
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles';
import { TouchableOpacity } from "react-native";

export default class index extends Component {
  goBack() {
    this.props.navigation.goBack();
  }
  onSuccess = e => {
    this.props.route.params?.onDone?.(e);
    this.goBack();
  };
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    )
  }
}