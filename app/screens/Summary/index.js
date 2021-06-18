import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableWithoutFeedback, TextInput, StyleSheet, Dimensions } from 'react-native'

import LineChart from './LineChart';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.chart = {
      values: [
        [28, 48, 40, 19, 96, 10],
        [65, 59, 90, 81, 56, 40],
      ],
      colors: {
        fillColor: ["#fff", "#eee"],
        strokeColor: ["#a3a3a3", "#a3a3a3"],
        strokeColors: [
          ["#f00", "#000", "#f0f", "#ff0", "#0f0", "#00f", "#a3a3a3"],
          ["#f00", "#000", "#f0f", "#ff0", "#0f0", "#00f", "#a3a3a3"],
        ],
        axisColor: '#a3a3a3',
        axisTextColor: 'gray',
      },
      options: {
        strokeWidth: 1,
        maxValue:100,
        minValue:20,
        margin: {
          left: 30,
          right: 20,
          top: 20,
          bottom: 20
        },
        labelWidth: 50,
      },
      showAxis: false,
      axis: ['10/09', '11/09', '13/09', '14/09', '15/09', '16/09'],
      backgroundColor: "#fff"
    }
  }

  selectChart(index) {
  }

  render() {
    return (
      <View style={{ marginTop: 40 }}>
        <LineChart  height={200} width={Dimensions.get('window').width} chart={this.chart} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    backgroundColor: '#FFF',
    margin: 8,
  },
  listHeaderText: {
    fontSize: 16,
  },
  listHeader: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: 'lightgray',
  },
  listSubtitle: {
    display: 'flex',
    paddingTop: 8,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingBottom: 8,
    borderTopWidth: 0.5,
    borderColor: 'lightgray',
    flexDirection: 'row',
  },
  listSubtitleText: {
    fontSize: 13,
    textAlign: 'center',
    flex: 1,
  },
  listSubtitleButton: {
    alignSelf: 'flex-end',
  },
  listSubtitleButtonText: {
    color: 'blue',
    fontSize: 13,
  },
  listItemColumn: {
    borderTopWidth: 0.5,
    borderColor: 'lightgray',
    display: 'flex',
    flexDirection: 'row',
  },
  listItemRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    borderColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  listItemRowText: {
    textAlign: 'center'
  },
  listItemRowTextTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
  },
  listItemRowSeparator: {
    borderTopWidth: 2,
  },
  listItemRowTextValue: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
  },
});