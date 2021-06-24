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
          this.connectedDevice(res);
        })
        .catch(err => {
          this.connectFailed(err);
        })
    }
  }
  connectFailed(err) {
    this.setState({ connection_state: _CONNECTION_STATE.DISCONNECTED })
    console.log("connect failed", err);
  }
  connectedDevice(data) {
    console.log("connected", data);
    this.setState({ connection_state: _CONNECTION_STATE.CONNECTED });
    iHealth.deviceEmitter(this.params.device.type, "history_data", result => {
      console.log(result);
      this.setState({ result })
    })
    iHealth.startMeasure(this.params.device);
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
