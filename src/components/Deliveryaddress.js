import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
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
  AsyncStorage,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import Feather from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  DatePicker,
  Thumbnail,
  Text,
  Left,
  Body,
  Fab,
  Form,
  Picker,
  Item,
  Label,
  Input,
  Icon,
  H1,
  H3,
  Button,
} from 'native-base';

//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const Deliveryaddress = (props) => {
  return (
    <ScrollView>
      <Card>
        <CardItem>
          <Body>
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              USERNAME
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />

              <TextInput
                style={styles.input}
                placeholder="Enter Username"
                style={styles.textInput}
                keyboardType="default"
                returnKeyType="next"
                autoCorrect={false}
              />
              {props.state.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              E-MAIL
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your email..."
                style={styles.textInput}
                keyboardType="email-address"
                returnKeyType="next"
                autoCorrect={false}
              />
              {props.state.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              Phone Number
            </Text>
            <View style={styles.action}>
              <FontAwesome name="phone" color="#05375a" size={20} />
              <TextInput
                placeholder="Phone Number..."
                style={styles.textInput}
                value={props.state.phone}
                returnKeyType="next"
                autoCorrect={false}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              Address
            </Text>
            <View style={styles.action}>
              <FontAwesome name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Address"
                style={styles.textInput}
                value={props.state.addr}
                returnKeyType="next"
                autoCorrect={false}
              />
              {/*
              <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
                query={{
                  key: 'AIzaSyBxVEex_dhZj5QzsIGUKWs38pOlvihAbOI',
                  language: 'en',
                }}
              />
              */}
            </View>

            <Form style={{ flexDirection: 'row' }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.textInput}
                placeholder="Select your Country"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={props.state.selected2}
                onValueChange={props.onValueChange2.bind(this)}
              >
                <Picker.Item label="Nigeria" value="key0" />
              </Picker>

              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.textInput}
                placeholder="Select your State"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={props.state.selected2}
                onValueChange={props.onValueChange2.bind(this)}
              >
                <Picker.Item label="Lagos" value="key0" />
                <Picker.Item label="Ogun" value="key1" />
              </Picker>

              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.textInput}
                placeholder="Select your LGA"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={props.state.selected2}
                onValueChange={props.onValueChange2.bind(this)}
              >
                <Picker.Item label="Ifelodun" value="key0" />
              </Picker>
            </Form>
          </Body>
        </CardItem>
        <CardItem style={styles.nav_btn} footer>
          <TouchableOpacity
            onPress={() => {
              props.setPage(0);
            }}
            style={[
              styles.singIn,
              {
                borderColor: '#4dc2f8',
                borderWidth: 1,
                marginTop: 15,
                marginRight: 20,
                padding: 30,
              },
            ]}
          >
            <MaterialIcons name="navigate-before" color="black" size={16} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.setPage(2);
            }}
            style={[
              styles.singIn,
              {
                borderColor: '#4dc2f8',
                borderWidth: 1,
                marginTop: 15,
                marginLeft: 20,

                padding: 30,
              },
            ]}
          >
            <MaterialIcons name="navigate-next" color="black" size={16} />
          </TouchableOpacity>
        </CardItem>
      </Card>
    </ScrollView>
  );
};
export default Deliveryaddress;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.5 * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#05375a',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 50,
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
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  singIn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  req_panel: {
    flexDirection: 'row',
    paddingBottom: 30,
    paddingTop: 20,
  },
  fav_panel: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    width: '100%',
  },
  starch: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,

    margin: 5,
  },
  perf: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,

    margin: 5,
  },
  todo_btns: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  date_pickers: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  nav_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  message: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
  },
  border: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    margin: 10,
  },
});
