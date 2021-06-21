import * as reduxActions from "@actions";
import { Header, Text } from "@components";
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from './styles';
import { Icon, ButtonGroup } from "react-native-elements";
import { BaseColor, BaseConfig } from "@config";

const _UNITS = [
  {
    key: "bp",
    label: "Blood Pressure Units:",
  },
  {
    key: "weight",
    label: "Weight Units:",
  },
  {
    key: "distance",
    label: "Distance Units:",
  },
  {
    key: "height",
    label: "Height Units:",
  },
  {
    key: "temperature",
    label: "Temperature Units:",
  },
];
export class index extends Component {
  goBack() {
    this.props.navigation.goBack();
  }
  updateUnit(key, value) {
    this.props.updateUnits({ [key]: value })
  }
  renderItem({ label, key }, index) {
    const buttons = BaseConfig.UNITS[key]?.map(item => item.unit);
    const { units } = this.props;
    return (
      <View style={{ marginTop: 10 }} key={`units_${index}`}>
        <Text headline> {label}</Text>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={units[key] || 0}
          onPress={this.updateUnit.bind(this, key)}
          containerStyle={{ backgroundColor: "#eee", padding: 3, height: 45, marginHorizontal: 0 }}
          textStyle={{ fontWeight: "bold", fontSize: 16 }}
          selectedButtonStyle={{ backgroundColor: "#fff" }}
          selectedTextStyle={{ color: BaseColor.primaryColor }}
        />
      </View>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"Units"}
          renderLeft={
            <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressLeft={this.goBack.bind(this)}
        />
        <ScrollView style={{ width: "100%", padding: 20 }}>
          {_UNITS.map((item, index) => this.renderItem(item, index))}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
