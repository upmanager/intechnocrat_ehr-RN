import * as reduxActions from "@actions";
import { Header, Text } from "@components";
import { BaseColor } from "@config";
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Icon } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from './styles';

export class index extends Component {
  goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"About"}
          renderLeft={
            <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
          }
          onPressLeft={this.goBack.bind(this)}
        />
        <ScrollView>
          <Text title1 primaryColor>About us</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
