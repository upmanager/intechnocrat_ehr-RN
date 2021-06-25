import * as reduxActions from "@actions";
import { Header, Text } from "@components";
import { BaseColor, BaseConfig } from "@config";
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Icon, Image, Button } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Images } from "@assets";
import styles from './styles';
import {
  HSProfileModule,
  HS2SProfileModule,

  BGProfileModule,
  BG5SProfileModule,

  BPProfileModule,
} from '@ihealth/ihealthlibrary-react-native';

const { iHealth } = reduxActions;
const _CONNECTION_STATE = {
  CONNECTING: 0,
  CONNECTED: 1,
  DISCONNECTED: 2
}
export class index extends Component {
  state = {
    connection_state: _CONNECTION_STATE.CONNECTING,
    result: null
  }
  constructor(props) {
    super(props);
    this.params = props.route.params;
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      if (global.connected_device) {
        this.connectedDevice(global.connected_device);
      } else {
        this.connectDevice();
      }
    })
    this.blurListener = this.props.navigation.addListener("blur", () => {
      this.disconnectDevice();
    });
  }
  connectDevice() {
    const { device } = this.params;
    if (BaseConfig.TETSTING) {
      setTimeout(() => {
        const data = {
          mac: device.mac,
          type: device.type,
          errorid: 0
        }
        this.connectedDevice(data);
      }, 2000);
    } else {
      iHealth.connectDevice(device.mac, device.type)
        .then(res => {
          global.connected_device = res;
          this.connectedDevice(res);
        })
        .catch(err => {
          global.connected_device = null;
          this.connectFailed(err);
        })
    }
  }
  disconnectDevice() {
    const { device } = this.params;
    iHealth.stopMeasure(device);
    iHealth.disconnectDevice(device.mac, device.type)
      .then(res => {
        global.connected_device = null;
        console.log("disconnected", res);
      })
      .catch(err => {
        console.error("disconnected", err);
      })
  }
  componentWillUnmount() {
    this.disconnectDevice();
    this.focusListener.remove();
    this.blurListener.remove();
  }
  connectFailed(err) {
    this.setState({ connection_state: _CONNECTION_STATE.DISCONNECTED })
    console.log("connect failed", err);
  }
  connectedDevice(data) {
    console.log("connected", data);
    this.setState({ connection_state: _CONNECTION_STATE.CONNECTED });
    this.getEvent();
    iHealth.startMeasure(this.params.device);
  }
  getEvent() {
    const { type } = this.params.device;
    let action_event = '';
    switch (type) {
      // get scale
      case "HS2":
      case "HS4S":
        action_event = HSProfileModule.ACTION_ONLINE_RESULT_HS;
        break;
      case "HS2S":
        action_event = HS2SProfileModule.ACTION_ONLINE_RESULT;
        break;
      // ----- glucometer
      case "BG5":
        action_event = BGProfileModule.ACTION_ONLINE_RESULT_BG;
      case "BG5S":
        action_event = BG5SProfileModule.ACTION_ONLINE_RESULT_BG;
        break;
      // blood pressure
      case "BP3L":
      case "BP5":
      case "BP5S":
        action_event = BPProfileModule.ACTION_ONLINE_PRESSURE_BP;
        break;

      default:
        break;
    }
    iHealth.deviceEmitter(type, action_event, result => {
      console.log(type, { result });
      if (type in ["HS2", "HS4S", "HS2S"]) {
        this.props.setWeight(result?.weight || 0);
      } else if (type in ["BG5", "GB5S"]) {
        console.log("glucometer", result);
      } else if (type in ["BP3L", "BP5", "BP5S"]) {
        console.log("set bp", result);
        // this.props.setBP(result?.weight || 0);
      }
    })
  }
  goBack() {
    this.props.navigation.goBack();
  }
  render() {
    const { connection_state, result } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"About"}
          renderLeft={
            <Icon name={'times'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressLeft={this.goBack.bind(this)}
          renderRight={
            <Icon name={'cog'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressRight={this.goBack.bind(this)}
        />
        <ScrollView style={{ padding: 40 }} contentContainerStyle={{ alignItems: "center" }}>
          {connection_state == _CONNECTION_STATE.CONNECTING ?
            <>
              <Text title3 blackColor>Connecting...</Text>
              <Image source={Images.connecting} style={{ width: 260, height: 260 }} resizeMode={'contain'} />
            </>
            :
            connection_state == _CONNECTION_STATE.CONNECTED ?
              <>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                  <Icon name={'check-circle'} size={30} type={'feather'} color={BaseColor.primaryColor} />
                  <Text title3 blackColor>   The device is connected.</Text>
                </View>
                <Text headline blackColor>Stand on scale with bare foot</Text>
                <Image source={Images.connect_success} style={{ width: 260, height: 260 }} resizeMode={'contain'} />
              </>
              :
              <>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name={'closecircleo'} size={30} type={'ant-design'} color={BaseColor.redColor} />
                  <Text title3 blackColor>   Can't connect to device.</Text>
                </View>
                <Image source={Images.connecting} style={{ width: 260, height: 260 }} resizeMode={'contain'} />
              </>
          }
        </ScrollView>
        <Button
          containerStyle={{ marginBottom: 60 }}
          buttonStyle={{ paddingHorizontal: 60, paddingVertical: 10 }}
          title="History Data    "
          icon={<Icon name={'settings'} type={'octicon'} color={result ? BaseColor.primaryColor : BaseColor.grayColor} size={20} />}
          iconPosition={'right'}
          type={'outline'}
          disabled={!result}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
