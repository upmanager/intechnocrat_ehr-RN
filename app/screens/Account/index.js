import * as reduxActions from "@actions";
import { Header, Text } from "@components";
import { BaseColor } from "@config";
import { getDeviceWidth } from "@utils";
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import styles from './styles';
const TESTIMAGEURL = 'https://raw.githubusercontent.com/iHealthDeviceLabs/iHealth-React-Native-SDK/main/doc/integrate-ios.png';

export class index extends Component {
  renderAccountItem(icon, title, onPress, isAccount = false) {
    return (
      <TouchableOpacity
        style={[styles.items, isAccount && styles.account]}
        onPress={onPress}>
        {isAccount ?
          <Avatar source={icon} rounded size={'medium'} title={title} />
          :
          <Icon name={icon.name} size={icon.size} type={icon.type} color={BaseColor.grayColor} />
        }
        <Text headline style={styles.title}>{title}</Text>
        <Icon name={'angle-right'} size={18} type={'font-awesome'} color={BaseColor.grayColor} />
      </TouchableOpacity>
    )
  }
  onDetail(page) {
    this.props.navigation.navigate(page);
  }
  renderAccount() {
    return (
      <>
        <Header title={"Account"} />
        {this.renderAccountItem({ uri: TESTIMAGEURL }, "Ke hq", this.onDetail.bind(this, "Profile"), true)}
        {/* {this.renderAccountItem({ name: "plus", type: "evilicon", size: 24 }, "Global", this.onDetail.bind(this, "Global"))} */}
        {this.renderAccountItem({ name: "pencil-ruler", type: "material-community", size: 24 }, "Units", this.onDetail.bind(this, "Units"))}
        {this.renderAccountItem({ name: "infocirlceo", type: "antdesign", size: 24 }, "About", this.onDetail.bind(this, "About"))}
        <TouchableOpacity
          style={[styles.items, { marginVertical: 15 }]}>
          <Text headline flexCenter primaryColor>Log Out</Text>
        </TouchableOpacity>
      </>
    );
  }
  getData() {
    return [
      this.renderAccount()
    ];
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
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
