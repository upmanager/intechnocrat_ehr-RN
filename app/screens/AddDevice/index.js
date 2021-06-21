import * as reduxActions from "@actions";
import { Header, Text } from "@components";
import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from './styles';
import { Icon, Image, Button } from "react-native-elements";
import { BaseColor } from "@config";
import { Images } from "@assets";
import Carousel from 'react-native-snap-carousel';
import { getDeviceWidth } from "@utils";
import {
  HS2Module,
  HSProfileModule,
} from '@ihealth/ihealthlibrary-react-native';

const { iHealth } = reduxActions;
const data = [
  {
    id: 1,
    title: "Smart Wireless Glucometer",
    image: Images.glucometer,
    devices: [
      // {
      //   id: 1,
      //   title: "Align (BG1)",
      //   image: Images.align_bg1,
      //   device: 'BG1',
      // },
      {
        id: 2,
        title: "Gluco (BG5)",
        image: Images.gluco_bg5,
        device: 'BG5'
      },
      {
        id: 3,
        title: "Gluco+ (BG5S)",
        image: Images.gluco_bg5s,
        device: 'BG5S'
      },
    ]
  },
  {
    id: 2,
    title: "Track Wireless BP Monitor",
    image: Images.bp_monitor,
    devices: [
      {
        id: 1,
        title: "Ease (BP3L)",
        image: Images.ease_bp3l,
        device: 'BP3L',
        setup_guide: [
          {
            description: 'Make sure your device is fully charged',
            image: Images.setup_bp3l,
          }
        ]
      },
      {
        id: 2,
        title: "Feel (BP5)",
        image: Images.feel_bp5,
        device: 'BP5',
        setup_guide: [
          {
            description: `Press 'START' or 'M' button on the iHealth Neo to turn on the Bluetooth. The bluetooth LED will be flashing.`,
            image: Images.setup_bp5,
          }
        ]
      },
      {
        id: 3,
        title: "NEO (BP5S)",
        image: Images.neo_bp5s,
        device: 'BP5S',
        setup_guide: [
          {
            description: `Press 'START' or 'M' button on the iHealth Neo to turn on the Bluetooth. The bluetooth LED will be flashing.`,
            image: Images.setup_bp5s,
          }
        ]
      },
      {
        id: 4,
        title: "View (BP7S)",
        image: Images.view_bp7s,
        device: 'BP7S'
      }
    ]
  },
  {
    id: 3,
    title: "Wireless Body Composition Scale",
    image: Images.diagonal,
    devices: [
      {
        id: 1,
        title: "Lina (HS2)",
        image: Images.lina_hs2,
        device: 'HS2',
        setup_guide: [
          {
            description: `Install batteries.`,
            image: Images.setup_hs2_1,
          },
          {
            description: `Please tap the right bottom corner of your scale to turn it on. Make sure 0.0 appear on the scale`,
            image: Images.setup_hs2_2,
          }
        ]
      },
      {
        id: 2,
        title: "Lite (HS4S)",
        image: Images.lite_hs4s,
        device: 'HS4S'
      },
      {
        id: 3,
        title: "Fit/Nexus (HS2S)",
        image: Images.fit_nexus_hs2s,
        device: 'HS2S',
        setup_guide: [
          {
            description: `Install batteries.`,
            image: Images.setup_hs2_1,
          }
        ]
      },
      {
        id: 4,
        title: "Core (HS6)",
        image: Images.core_hs6,
        device: 'HS6', // no eixt
        scanQRcode: true
      }
    ]
  },
  {
    id: 4,
    title: "Wave Wireless Activity Tracker",
    image: Images.wave,
    devices: [
      {
        id: 1,
        title: "Edge (AM3S)",
        image: Images.align_bg1,
        device: 'AM3S'
      },
      {
        id: 2,
        title: "Wav e (AM4)",
        image: Images.gluco_bg5,
        device: 'AM4'
      }
    ]
  },
];
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
    curId: 0,
    selectedDevice: '',
  }
  goBack() {
    if (this._carousel.currentIndex == 0) {
      this.props.navigation.goBack();
    } else {
      this._carousel.snapToPrev();
    }
  }
  chooseCategory({ id }) {
    this.setState({
      curId: id,
    }, () => {
      this._carousel.snapToNext();
    });
  }
  componentDidMount() {
    // this.addDevice();
  }
  componentWillUnmount() {
    // this.notifyListener.remove();
  }
  addDevice() {
    const { curId, selectedDevice } = this.state;
    iHealth.authenConfigureInfo("Wilfred", 'b619c60bdc7942d693f14d1d8cda16f3', '9a41ec10e873496791bd331525b2f457')
      .then(res => {
        console.log("get authen", res);
      })
      .catch(err => {
        console.log("get authen", err);
      });
    iHealth.startDiscover(selectedDevice)
      .then(res => {
        console.log("discover", res);
      })
      .catch(err => {
        console.log("discover", err);
      });
    // iHealthDeviceManagerModule.startDiscovery(selectedDevice);
    // add
    // HS2Module.startMeasure(mac);

    this.notifyListener = DeviceEventEmitter.addListener(HS2Module.Event_Notify, (event) => {
      if (event.action === HSProfileModule.ACTION_ONLINE_RESULT_HS) {
        console.log(event[HSProfileModule.DATAID]);
        console.log(event[HSProfileModule.WEIGHT_HS]);
        console.log(event[HSProfileModule.FAT_HS]);
        console.log(event[HSProfileModule.WATER_HS]);
        console.log(event[HSProfileModule.MUSCLE_HS]);
        console.log(event[HSProfileModule.SKELETON_HS]);
        console.log(event[HSProfileModule.FATELEVEL_HS]);
        console.log(event[HSProfileModule.DCI_HS]);
      }
    });

    // BP3LModule.getAllConnectedDevices();
  }
  chooseDevice({ device, setup_guide, scanQRcode }) {
    this.setState({
      selectedDevice: device
    }, () => {
      this._carousel.snapToNext();
    });
  }
  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={this.chooseCategory.bind(this, item)}
        style={styles.device_categories}>
        <Text blackColor style={{ flex: 1 }}>{item.title}</Text>
        <Image source={item.image} style={styles.category_img} resizeMode={'cover'} />
        <Icon name={'angle-right'} size={24} type={'font-awesome'} color={BaseColor.grayColor} />
      </TouchableOpacity>
    );
  }
  renderDevicesItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={this.chooseDevice.bind(this, item)}
        style={styles.device_item}>
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
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={this.renderItem.bind(this)}
        />
      </>
    )
  }
  renderDevices() {
    const { curId } = this.state;
    const devices = data.find(item => item.id == curId)?.devices || [];
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
  scanQRcode() {
    console.log("scan qr code");
    // this._carousel.snapToNext();
  }
  renderSetupGuide() {
    const { curId, selectedDevice } = this.state;
    const curDevice = data.find(item => item.id == curId)?.devices?.find(item => item.device == selectedDevice) || {};
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
              onPress={() => this._carousel.snapToNext()}
            />
          </View>
        }
      </>
    )
  }
  renderConnection() {
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
            title=" Searching"
            icon={<ActivityIndicator size={'small'} color={BaseColor.grayColor} />}
            containerStyle={styles.mt20}
            buttonStyle={styles.next_button}
            titleStyle={styles.next_button_txt}
            onPress={() => { }}
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
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Carousel
          ref={ref => this._carousel = ref}
          sliderWidth={getDeviceWidth()}
          itemWidth={getDeviceWidth()}
          data={this.getData()}
          renderItem={({ item, index }) => item}
        />
      </SafeAreaView>
    )
  }
};

mapStateToProps = (state) => (state)

mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index);