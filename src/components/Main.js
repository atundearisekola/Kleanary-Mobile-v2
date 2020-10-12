import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import {Container, Text, Content} from 'native-base';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Main = createBottomTabNavigator();

export default () => {
  return (
    <Main.Navigator
      initialRouteName="Login"
      animationEnabled="true"
      swipeEnabled="true"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        style: {
          backgroundColor: 'white',
        },
        activeTintColor: '#5db8fe',
        inactiveTintColor: 'gray',
      }}>
      <Main.Screen
        name="Login"
        component={LoginForm}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="sign-in" size={size} color={color} />
          ),
        }}
      />
      <Main.Screen
        name="SignUp"
        component={SignupForm}
        options={{
          tabBarLabel: 'Sign Up',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="unlock" size={size} color={color} />
          ),
        }}
      />
    </Main.Navigator>
  );
};
