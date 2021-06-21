import * as reduxActions from "@actions";
import { Header, Text, CustomTabView } from "@components";
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { BaseColor } from "@config";
import { getDeviceWidth } from "@utils";
import { Icon, Badge } from "react-native-elements";
const chatWidth = getDeviceWidth() - 40;
import LineChart from './LineChart';

const ChartData = {
  values: [
    [160, 175, 155, 160, 158, 155, 160],
    [85, 90, 80, 85, 82, 80, 85],
  ],
  colors: {
    fillColor: [BaseColor.whiteColor, BaseColor.lightWhiteColor],
    strokeColor: [BaseColor.lightGrayColor, BaseColor.lightGrayColor],
    strokeColors: [
      [
        BaseColor.infoColor, BaseColor.dangerColor, BaseColor.infoColor, BaseColor.infoColor, BaseColor.infoColor, BaseColor.infoColor, BaseColor.infoColor
      ],
      [
        BaseColor.infoColor, BaseColor.dangerColor, BaseColor.infoColor, BaseColor.infoColor, BaseColor.infoColor, BaseColor.infoColor, BaseColor.infoColor
      ],
    ],
    axisColor: BaseColor.lightGrayColor,
    axisTextColor: 'gray',
  },
  options: {
    strokeWidth: 1,
    maxValue: 200,
    minValue: 60,
    margin: {
      left: 30,
      right: 20,
      top: 20,
      bottom: 30
    },
    labelWidth: 50,
  },
  showAxis: false,
  axis: [['11:00', 'Apr 17'], '12:00', '15/00', '17/00', ['19/00', 'Apr 18'], '19:30', '20:00'],
  backgroundColor: BaseColor.whiteColor
}

export class index extends Component {
  state = {
    tabIndex: 0
  }
  renderBloodPressure() {
    return (
      <View style={styles.contain}>
        <View style={styles.contain_title}>
          <Text title2 blackColor>Blood Pressure</Text>
          <TouchableOpacity style={styles.history}>
            <Text primaryColor title3>History </Text>
            <Icon name={'angle-right'} size={26} color={BaseColor.primaryColor} type={'font-awesome'} />
          </TouchableOpacity>
        </View>
        <View style={styles.badges}>
          <Badge badgeStyle={styles.badgeStyle} />
          <Text style={{ flex: 1 }}>SYS min-max 120-180</Text>
          <Badge badgeStyle={styles.badgeStyle} />
          <Text style={{ flex: 1 }}>DIA min-max 120-180</Text>
        </View>
        <View style={styles.chart}>
          <LineChart key={Math.random().toString()} height={200} width={chatWidth} chart={ChartData} />
        </View>
      </View>
    )
  }
  renderPulse() {
    return (
      <View style={styles.contain}>
        <View style={styles.contain_title}>
          <Text title2 blackColor>Pulse</Text>
        </View>
        <View style={styles.badges}>
          <Badge badgeStyle={styles.badgeStyle} />
          <Text style={{ flex: 1 }}>min-max 68 - 120</Text>
        </View>
        <View style={styles.chart}>
          <LineChart key={Math.random().toString()} height={200} width={chatWidth} chart={ChartData} />
        </View>
      </View>
    )
  }
  renderRecent() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderBloodPressure()}
        {this.renderPulse()}
        <View style={{ height: 60 }} />
      </ScrollView>
    )
  }
  renderWeek() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderBloodPressure()}
        {this.renderPulse()}
        <View style={{ height: 60 }} />
      </ScrollView>
    )
  }
  renderMonth() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderBloodPressure()}
        {this.renderPulse()}
        <View style={{ height: 60 }} />
      </ScrollView>
    )
  }
  getData() {
    return [
      {
        index: 0,
        title: "Recent",
        component: this.renderRecent()
      },
      {
        index: 1,
        title: "Week",
        component: this.renderWeek()
      },
      {
        index: 2,
        title: "Month",
        component: this.renderMonth()
      },
    ]
  }
  render() {
    const data = this.getData();
    return (
      <SafeAreaView style={styles.container}>
        <Header title={"Summary"} />
        <CustomTabView data={data} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
