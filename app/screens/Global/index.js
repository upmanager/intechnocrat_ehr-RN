import * as reduxActions from "@actions";
import { Header, Text } from "@components";
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from './styles';
import { Icon, Input, Button } from "react-native-elements";
import { BaseColor, BaseConfig } from "@config";
import { convertUnits } from "@utils";

export class index extends Component {
  state = {
    cur_unit: "kg",
    weight: ''
  }
  goBack() {
    this.props.navigation.goBack();
  }
  componentDidMount() {
    const { global: { weight }, units: { weight: weight_units } } = this.props;
    const cur_unit = BaseConfig.UNITS['weight'][weight_units];
    const real_weight = convertUnits(weight, cur_unit, 1);
    this.setState({ cur_unit, weight: real_weight });
  }
  onSave() {
    const { cur_unit, weight } = this.state;
    let def_weight = convertUnits(weight, cur_unit, 1, true);
    this.props.setGlobal({ weight: def_weight });
    this.goBack();
  }
  render() {
    const { cur_unit, weight } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"Global"}
          renderLeft={
            <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressLeft={this.goBack.bind(this)}
        />
        <ScrollView style={{ width: "100%" }}>
          <Input
            leftIcon={<Text blackColor subhead>Target Weight</Text>}
            rightIcon={<Text blackColor subhead>{cur_unit.unit}</Text>}
            value={String(weight)}
            placeholder={'--'}
            onChangeText={weight => this.setState({ weight })}
            inputStyle={{ textAlign: "right", fontSize: 16 }}
            keyboardType={'numeric'}
          />
        </ScrollView>
        <View style={{ width: "100%", paddingVertical: 5, paddingHorizontal: 30 }}>
          <Button
            title={"Save"}
            onPress={this.onSave.bind(this)}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
