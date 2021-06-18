import * as reduxActions from "@actions";
import { Header } from "@components";
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from './styles';

export class index extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"Summary"}
        />
        <ScrollView></ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = reduxActions

export default connect(mapStateToProps, mapDispatchToProps)(index)
