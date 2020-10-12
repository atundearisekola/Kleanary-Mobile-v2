import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Splash extends Component {
  constructor() {
    super();
    //this._bootstrap();
  }

  _bootstrap = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'Auth' : 'App');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require('../../assets/hanger2.jpg')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.title}>Stay connect with everyone!</Text>
          <Text style={styles.text}>Sign in with account</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('App');
              }}
            >
              <LinearGradient
                colors={['#5db8fe', '#39cff2']}
                style={styles.singIn}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons name="navigate-next" color="white" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
export default Splash;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.4;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05375a',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    height: height_logo,
    width: height_logo,
    borderRadius: 100,
  },
  title: {
    color: '#05375a',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  singIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
