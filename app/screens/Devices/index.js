import * as reduxActions from "@actions";
import { DeviceItem, Header, Text } from "@components";
import { BaseColor, BaseConfig } from "@config";
import { convertUnits } from "@utils";
import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Avatar, Button, Icon } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Images } from "@assets";
import styles from './styles';
export class index extends Component {
  addNewDevice() {
    this.props.navigation.navigate("AddDevice");
  }
  onDevicePress(device) {
    this.props.navigation.navigate("ConnectDevice", { device });
  }
  getData(_H) {
    const { auth: { health_profile: { Height: height, WeightKg: weight } }, units: { height: height_units, weight: weight_units } } = this.props;
    const cur_unit = BaseConfig.UNITS[_H ? 'height' : 'weight'][_H ? height_units : weight_units];
    let real_height = convertUnits(_H ? height : weight, cur_unit, 1);
    if (typeof real_height == "object") {
      const { feet, inches } = real_height;
      real_height = `${feet}' ${inches}"`;
    } else {
      real_height = `${real_height} ${cur_unit.unit}`;
    }
    return `${_H ? "Height" : "Weight"}: ${real_height}`;
  }
  render() {
    const { devices: { devices }, auth: { user } } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          renderCenter={
            <View style={styles.headerContain}>
              <View style={styles.headerAvatar}>
                <Avatar
                  rounded
                  size={'xlarge'}
                  source={user.avatar ? { uri: user.avatar } : Images.def_avatar}
                />
              </View>
              <View style={styles.headerDetail}>
                <Text whiteColor headline>{this.getData(true)}</Text>
                <Text title2 grayColor > | </Text>
                <Text whiteColor headline>{this.getData(false)}</Text>
              </View>
            </View>
          }
          renderRight={
            <Icon name={'pluscircle'} size={30} type={'ant-design'} color={BaseColor.whiteColor} />
          }
          onPressRight={this.addNewDevice.bind(this)}
        />
        <View style={{ width: "100%", padding: 20, paddingBottom: 0 }}>
          <Text blackColor title3>My Devices</Text>
        </View>
        {devices?.length > 0 ?
          <FlatList
            data={devices}
            style={{ width: "100%" }}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            refreshControl={
              <RefreshControl
                colors={[BaseColor.primaryColor]}
                refreshing={false}
                onRefresh={() => console.log("refresh")}
              />
            }
            renderItem={({ item, index }) => <DeviceItem {...item} onPress={this.onDevicePress.bind(this, item)} />}
          />
          :
          <View style={{ flex: 1, marginTop: 40 }}>
            <Text flexCenter headline>You don't have any iHealth devices set up yet!</Text>
            <Button
              title="Select New Device"
              containerStyle={{ margin: 20 }}
              buttonStyle={{ paddingHorizontal: 15 }}
              onPress={this.addNewDevice.bind(this)}
            />
          </View>
        }
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
