import React, { Component } from 'react';
import { Platform, StyleSheet, View, Button, Dimensions } from 'react-native';
//import { createDrawerNavigator } from 'react-navigation-drawer';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
//import {Icon} from 'native-base';
import { Container, Text, Content, Image } from 'native-base';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Dashboard, Favorite, Account, Request, Detail } from './screenNames';
import DashboardComponent from './DashboardComponent';
import RequestLaundry from './RequestLaundry';
import LaundryDetail from './LaundryDetail';
import AccountComponent from './AccountComponent';
import FavoriteComponent from './FavoriteComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import * as Animatable from 'react-native-animatable';

const AuthRoute = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden' }, style]}>
      <Stack.Navigator
        options={{
          headerShown: true,
        }}
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => {
            <Button
              transparent
              padding
              marginHorizontal
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" size={18} />
            </Button>;
          },
        }}
      >
        <Stack.Screen name="dashboard" component={DashboardComponent} />
        <Stack.Screen name="request" component={RequestLaundry} />
        <Stack.Screen name="account" component={AccountComponent} />
        <Stack.Screen name="favorite" component={FavoriteComponent} />
        <Stack.Screen name="detail" component={LaundryDetail} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/*<DrawerItemList {...props} />*/}

      <View style={{ flex: 1 }}>
        <View style={styles.text_body}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require('../../assets/hanger2.jpg')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text style={styles.text_header}>Atunde Arisekola</Text>
        </View>
        <View style={styles.drawer_link}>
          <DrawerItem
            style={styles.drawer_item}
            label="Dashboard"
            labelStyle={styles.link_label}
            onPress={() => props.navigation.navigate('dashboard')}
            icon={() => <AntDesign name="dashboard" color="white" size={16} />}
          />
          <DrawerItem
            style={styles.drawer_item}
            label="Request Laundry"
            labelStyle={styles.link_label}
            onPress={() => props.navigation.navigate('request')}
            icon={() => (
              <MaterialIcons name="playlist-add" color="white" size={16} />
            )}
          />
          <DrawerItem
            style={styles.drawer_item}
            label="Account"
            labelStyle={styles.link_label}
            onPress={() => props.navigation.navigate('account')}
            icon={() => (
              <FontAwesome name="user-circle-o" color="white" size={16} />
            )}
          />
          <DrawerItem
            style={styles.drawer_item}
            label="Favorite"
            labelStyle={styles.link_label}
            onPress={() => props.navigation.navigate('favorite')}
            icon={() => (
              <MaterialIcons name="favorite-border" color="white" size={16} />
            )}
          />
        </View>
      </View>

      <View style={styles.logout}>
        <DrawerItem
          style={styles.drawer_item}
          label="Logout"
          labelStyle={styles.link_label}
          onPress={() => alert('Logout')}
          icon={() => <AntDesign name="logout" color="white" size={16} />}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });
  const screensStyles = { borderRadius, transform: [{ scale }] };
  return (
    <LinearGradient
      colors={['#5db8fe', '#39cff2', '#5db8fe', '#39cff2']}
      style={{ flex: 1 }}
    >
      <AuthRoute.Navigator
        drawerType="slide"
        overlayColor="transparent"
        initialRouteName="dashboard"
        drawerStyle={{ width: '50%', backgroundColor: 'transparent' }}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'green',
          inactiveTintColor: 'green',
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}
      >
        <AuthRoute.Screen name="Screens">
          {(props) => <Screens {...props} style={screensStyles} />}
        </AuthRoute.Screen>
      </AuthRoute.Navigator>
    </LinearGradient>
  );
};

const { height } = Dimensions.get('screen');
const height_logo = height * 0.4 * 0.4;
const styles = StyleSheet.create({
  link_label: {
    color: 'white',
    marginLeft: -16,
  },
  text_header: {
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  drawer_link: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  text_body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  drawer_item: {
    marginLeft: 20,
  },
  logout: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  logo: {
    height: height_logo,
    width: height_logo,
    borderRadius: 100,
  },
});
