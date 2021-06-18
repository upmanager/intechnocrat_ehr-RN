import * as reduxActions from "@actions";
import { Images } from "@assets";
import React, { Component } from "react";
import { ActivityIndicator, PermissionsAndroid, Platform, View, Image } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { BaseColor } from "@config";

// app permission (android only)
const _PERMISSIONS = [
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
];

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.requestAndroidPermission();
    setTimeout(() => {
      this.props.navigation.navigate("Main");
      // this.props.navigation.navigate("LogIn");
    }, 1500);
  }
  requestAndroidPermission = async () => {
    try {
      if (Platform.OS != "android") return;
      const granted = await PermissionsAndroid.requestMultiple(_PERMISSIONS);
      let permissionGranted = true;
      let permissionNeverAsk = false;
      _PERMISSIONS.every((item, index) => {
        if (granted[item] !== PermissionsAndroid.RESULTS.GRANTED) {
          permissionNeverAsk = granted[item] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
          permissionGranted = false;
          return false;
        };
        return true;
      })
      if (permissionGranted) {
      } else if (!permissionNeverAsk) {
        this.requestAndroidPermission();
      }
    } catch (err) {
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginTop: -200 }}>
          <Image source={Images.logo} style={styles.logo} resizeMode={'contain'} />
        </View>
        <ActivityIndicator
          size="large"
          color={BaseColor.blackColor}
          style={styles.loading}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => (state)
const mapDispatchToProps = { ...reduxActions }
export default connect(mapStateToProps, mapDispatchToProps)(Loading);