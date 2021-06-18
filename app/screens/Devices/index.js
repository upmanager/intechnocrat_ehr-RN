import * as reduxActions from "@actions";
import { DeviceItem, Header, Text } from "@components";
import { BaseColor } from "@config";
import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from './styles';
const TESTIMAGEURL = 'https://raw.githubusercontent.com/iHealthDeviceLabs/iHealth-React-Native-SDK/main/doc/integrate-ios.png';
const data = [
  {
    name: "Track-09EA345",
    image: TESTIMAGEURL
  },
  {
    name: "Fit/Nexus-19BE544",
    image: TESTIMAGEURL
  },
  {
    name: "PT3SBT-28AE238",
    image: TESTIMAGEURL
  },
  {
    name: "Air-19BE544",
    image: TESTIMAGEURL
  },
];
export class index extends Component {
  state = {
    devices: []
  }
  componentDidMount() {
    this.setState({ devices: data });
  }
  render() {
    const { devices } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          renderCenter={
            <View style={styles.headerContain}>
              <View style={styles.headerAvatar}>
                <Avatar
                  rounded
                  size={'xlarge'}
                  source={{ uri: TESTIMAGEURL }}
                />
              </View>
              <View style={styles.headerDetail}>
                <Text whiteColor headline> Height: 170 cm</Text>
                <Text title2 grayColor > | </Text>
                <Text whiteColor headline> Weight: 65.0 kg</Text>
              </View>
            </View>
          }
          renderRight={
            <Icon name={'pluscircle'} size={30} type={'ant-design'} color={BaseColor.whiteColor} />
          }
          onPressRight={() => console.log("plus action")}
        />
        <View style={{ width: "100%", padding: 20 }}>
          <Text blackColor title3>My Devices</Text>
        </View>
        <FlatList
          data={devices}
          style={{ width: "100%" }}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              refreshing={false}
              onRefresh={this.componentDidMount.bind(this)} />
          }
          renderItem={({ item, index }) => <DeviceItem {...item} />}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
