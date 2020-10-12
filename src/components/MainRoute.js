import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from './Main';
import AuthRoute from './AuthRoute';
import Splash from './Splash';

import { loadState, saveState } from '../Utils/localstorage';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

const Stack = createStackNavigator();

class MainRoute extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={!this.props.isAuth ? 'Splash' : 'Auth'}
        >
          {this.props.isAuth ? (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Splash"
                component={Splash}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="App"
                component={Main}
              />
            </>
          ) : (
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Auth"
              component={AuthRoute}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({}, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    loader: state.AuthReducer.loader,
    isAuth: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
