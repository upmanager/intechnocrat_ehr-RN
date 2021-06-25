import * as reduxActions from "@actions";
import { Images } from "@assets";
import { Header, Text } from "@components";
import { BaseColor, BaseConfig, IHEALTHDEVICES } from "@config";
import { getDeviceWidth } from "@utils";
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Image, Overlay } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import styles from './styles';
import Toast from 'react-native-simple-toast';

const { iHealth } = reduxActions;

const connection_guide = {
  title: "Not working? You can try the following.",
  setps: [
    "Heep all the other smart devices away to avoid interference.",
    "Make sure your iHealth device is nearby.",
    "Turn off Bluetooth in your mobile device settings then turn on again.",
    "Double check to make sure no other apps are running in the background. Once all the other apps have been closed, Please repoen the app."
  ]
}

export class index extends Component {
  state = {
    curId: 0, //3
    selectedDevice: '',//HS4S
    discoveredDevices: {
      visible: false,
      devices: []
    },
    searching: true
  }
  componentWillUnmount() {
    if (BaseConfig.TETSTING) {
      try {
        clearInterval(this.timer);
      } catch (error) {
      }
    }
    iHealth.stopDiscover();
  }
  goBack() {
    if (this._carousel.currentIndex == 0) {
      this.props.navigation.goBack();
    } else {
      this._carousel.snapToPrev();
    }
    try {
      iHealth.stopDiscover();
    } catch (error) {
    }
  }
  chooseCategory({ id }) {
    this.setState({
      curId: id,
    }, () => {
      this._carousel.snapToNext();
    });
  }
  selectDevice(device) {
    iHealth.stopDiscover();
    this.props.addDevice(device);
    this.props.navigation.goBack();
    this.props.navigation.navigate("ConnectDevice", { device });
  }
  addDevice() {
    const { curId, selectedDevice } = this.state;
    this.setState({ searching: true });
    const device_info = IHEALTHDEVICES.find(item => item.id == curId).devices.find(item => item.device == selectedDevice);
    if (BaseConfig.TETSTING) {
      this.timer = setInterval(() => {
        const { discoveredDevices: { devices } } = this.state;
        const key = `${(new Date()).getTime()}${parseInt(Math.random() * 99 + 100)}`;
        const rssi = `${(new Date()).getTime()}${parseInt(Math.random() * 99 + 100)}`;
        const res = {
          mac: key,
          type: selectedDevice,
          rssi,
          title: device_info.title,
          image: device_info.image
        };
        this.setDiscoveredStates({ devices: [...devices, res], visible: true });
        if (devices.length >= 10) {
          clearInterval(this.timer);
        }
      }, 1000);
    } else {
      iHealth.startDiscover(selectedDevice, res => {
        console.log("discover", res);
        if (!res) {
          if (this.state.discoveredDevices?.devices?.length > 0) {
          } else {
            Toast.showWithGravity("Can't find deivce!", Toast.SHORT, Toast.TOP);
          }
          this.setState({ searching: false });
          return;
        }
        res = {
          ...res,
          title: device_info.title,
          image: device_info.image
        };
        const { discoveredDevices: { devices } } = this.state;
        const { devices: { devices: registerd_devices } } = this.props;

        let allDevices = [...registerd_devices, ...devices];
        if (!res.mac || allDevices.findIndex(item => item.mac == res.mac) >= 0) {
          return;
        }
        this.setDiscoveredStates({ devices: [...devices, res], visible: true });
      })
    }
  }
  chooseDevice({ device }) {
    const { curId } = this.state;
    this.setState({
      selectedDevice: device
    }, () => {
      if (curId == 2 || curId == 3) {
      } else {
        this.addDevice();
      }
      this._carousel.snapToNext();
    });
  }
  renderItem({ item, index }) {
    if (item.hide) return null;
    return (
      <TouchableOpacity
        onPress={this.chooseCategory.bind(this, item)}
        style={[styles.device_categories]}>
        <Text blackColor style={{ flex: 1 }}>{item.title}</Text>
        <Image source={item.image} style={styles.category_img} resizeMode={'cover'} />
        <Icon name={'angle-right'} size={24} type={'font-awesome'} color={BaseColor.grayColor} />
      </TouchableOpacity>
    );
  }
  renderDevicesItem({ item, index }) {
    if (item.hide) return null;
    return (
      <TouchableOpacity
        onPress={this.chooseDevice.bind(this, item)}
        style={[styles.device_item]}>
        <Image source={item.image} style={styles.device_img} resizeMode={'cover'} />
        <Text blackColor>{item.title}</Text>
      </TouchableOpacity>
    );
  }
  renderCategories() {
    return (
      <>
        <Header
          title={"Select New Device"}
          renderRight={
            <Icon name={'close'} size={30} type={'material_icons'} color={BaseColor.whiteColor} />
          }
          onPressRight={this.goBack.bind(this)}
        />
        <FlatList
          style={styles.flex}
          data={IHEALTHDEVICES}
          keyExtractor={(_, index) => index.toString()}
          renderItem={this.renderItem.bind(this)}
        />
      </>
    )
  }
  renderDevices() {
    const { curId } = this.state;
    const devices = IHEALTHDEVICES.find(item => item.id == curId)?.devices || [];
    return (
      <>
        <Header
          title={"Select New Device"}
          renderLeft={
            <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressLeft={this.goBack.bind(this)}
        />
        <FlatList
          style={styles.flex}
          data={devices}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          renderItem={this.renderDevicesItem.bind(this)}
        />
      </>
    )
  }
  scanedQRcode(data) {
    console.log("qr code data", data);
  }
  scanQRcode() {
    this.props.navigation.navigate("QRCodeScan", { onDone: this.scanedQRcode.bind(this) });
  }
  onConnect() {
    this._carousel.snapToNext();
    this.addDevice();
  }
  renderSetupGuide() {
    const { curId, selectedDevice } = this.state;
    const curDevice = IHEALTHDEVICES.find(item => item.id == curId)?.devices?.find(item => item.device == selectedDevice) || {};
    const setup_guide = curDevice.setup_guide || [];
    const scanQRcode = curDevice.scanQRcode;
    return (
      <>
        <Header
          title={"Setup Guide"}
          renderLeft={
            <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressLeft={this.goBack.bind(this)}
        />
        {scanQRcode ?
          <View style={styles.setup_guide}>
            <Image source={Images.setup_scan_qrcode} style={styles.qrcode_img} />
            <Text headline>Scan QR code on the back of the scale</Text>
            <View style={{ flex: 1 }} />
            <Button
              title="Scan QR code"
              containerStyle={styles.mt20}
              buttonStyle={{ paddingHorizontal: 60 }}
              onPress={this.scanQRcode.bind(this)}
            />
          </View>
          :
          <View style={[styles.setup_guide, { backgroundColor: BaseColor.grayColor }]}>
            {setup_guide.map((item, index) => (
              <View style={styles.guide} key={`setup_guide_${index}`}>
                <Text whiteColor flexLeft>{item.description}</Text>
                <Image source={item.image} style={styles.guide_img} />
              </View>
            ))}
            <Button
              title="Next"
              containerStyle={styles.mt20}
              buttonStyle={styles.next_button}
              titleStyle={styles.next_button_txt}
              onPress={this.onConnect.bind(this)}
            />
          </View>
        }
      </>
    )
  }
  renderConnection() {
    const { searching } = this.state;
    return (
      <>
        <Header
          title={"Setup Guide"}
          renderLeft={
            <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressLeft={this.goBack.bind(this)}
        />
        <View style={[styles.setup_guide, { backgroundColor: BaseColor.grayColor }]}>
          <View style={styles.flex}>
            <Text whiteColor style={{ marginVertical: 15 }}>{connection_guide.title}</Text>
            {connection_guide.setps.map((item, index) => (
              <View style={styles.connection_guide} key={`connect_guide_${index}`}>
                <Text whiteColor style={styles.guide_numbers}>{index + 1}</Text>
                <Text whiteColor style={{ flex: 1 }}>{item}</Text>
              </View>
            ))}
          </View>
          <Button
            title={searching ? " Searching" : "  Search"}
            icon={searching && <ActivityIndicator size={'small'} color={BaseColor.grayColor} />}
            disabled={searching}
            containerStyle={styles.mt20}
            buttonStyle={styles.next_button}
            titleStyle={styles.next_button_txt}
            onPress={this.addDevice.bind(this)}
          />
        </View>
      </>
    )
  }
  getData() {
    const { curId } = this.state;
    if (curId == 2 || curId == 3) {
      return [
        this.renderCategories(),
        this.renderDevices(),
        this.renderSetupGuide(),
        this.renderConnection()
      ];
    } else {
      return [
        this.renderCategories(),
        this.renderDevices(),
        this.renderConnection()
      ];
    }
  }
  setDiscoveredStates(item, callback) {
    this.setState({
      discoveredDevices: {
        ...this.state.discoveredDevices,
        ...item
      }
    }, callback);
  }
  toggleOverlay() {
    const { discoveredDevices } = this.state;
    this.setDiscoveredStates({ visible: !discoveredDevices.visible });
  }
  render() {
    const { discoveredDevices } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Carousel
          ref={ref => this._carousel = ref}
          sliderWidth={getDeviceWidth()}
          itemWidth={getDeviceWidth()}
          scrollEnabled={false}
          data={this.getData()}
          renderItem={({ item, index }) => item}
        />
        <Overlay isVisible={discoveredDevices.visible} onBackdropPress={() => { }} overlayStyle={{ width: "80%", padding: 20, maxHeight: "70%" }}>
          <Text title3 blackColor bold>Select the device to connect</Text>
          <ScrollView>
            {discoveredDevices.devices.map((item, index) => (
              <TouchableOpacity key={index} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }} onPress={this.selectDevice.bind(this, item)}>
                <Image source={item.image} style={{ width: 60, height: 60, marginRight: 10 }} resizeMode={'contain'} />
                <View >
                  <Text headline blackColor>{item.title}</Text>
                  <Text subhead>{item.mac}</Text>
                </View>
              </TouchableOpacity>
            ))}

          </ScrollView>
        </Overlay>
      </SafeAreaView>
    )
  }
};

mapStateToProps = (state) => (state)

mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index);