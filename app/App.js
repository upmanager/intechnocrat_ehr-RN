/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { persistor, store } from "@store";
import React from 'react';
import { LogBox, StyleSheet, Platform, StatusBar } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./navigation";
import { BaseColor } from "@config";

LogBox.ignoreAllLogs(true);
const App = () => {
  if (Platform.OS == "android") {
    StatusBar.setBackgroundColor(BaseColor.primaryColor)
    StatusBar.setBarStyle("light-content")
    StatusBar.setTranslucent(true);
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
};

const styles = StyleSheet.create({

});

export default App;
