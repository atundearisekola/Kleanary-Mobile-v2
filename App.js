import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainRoute from './src/components/MainRoute';

import { Provider } from 'react-redux';
import { giveMeStore } from './src/store/Store';

import { LogBox } from 'react-native';
//LogBox.ignoreWarnings(['Remote debugger']);

export default class App extends Component {
  render() {
    return (
      <Provider store={giveMeStore()}>
        <MainRoute />
      </Provider>
    );
  }
}
