import * as reduxActions from "@actions";
import { Header, Text, CustomTabView } from "@components";
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { View, Dimensions } from 'react-native';
import styles from './styles';
import { BaseColor } from "@config";
import {
  LineChart,
} from "react-native-chart-kit";
import CLineChart from "./LineChart";

const colors = {
  chartBlue:'#4286F5',
  chartRed:'#DC4437',
  chartYellow:'#F5B400',
  chartBlueOpacity:'rgba(66, 134, 245,0.3)',
  chartRedOpacity:null,//'rgba(220, 68, 55, 0)',
  chartYellowOpacity:null,//'rgba(245, 180, 0, 0)',
}

export class index extends Component {
  state = {
    tabIndex: 0
  }
  renderRecent() {
    return (
      <View style={{ flex: 1 }}>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ],
              },
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ],
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          getDotProps={(v, i) => {
            return {
              r: "3",
              stroke: "#f0f"
            };
          }}
          segments={1}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => BaseColor.grayColor,
            labelColor: (opacity = 1) => BaseColor.grayColor,
            strokeWidth: 1,
            barRadius: 99,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#f0f"
            }
          }}
          style={{
            marginVertical: 8,
          }}
        />
      </View>
    )
  }
  renderWeek() {
    return <Text>week</Text>
  }
  renderMonth() {
    return <Text>month</Text>
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
    const { tabIndex } = this.state;
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
