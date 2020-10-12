import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import { FlatList } from 'react-native-gesture-handler';
const Make = (props) => {
  return (
    <ScrollView>
      <Card>
        <CardItem>
          <Body>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.text_footer}>Select laundry Images</Text>
              <TouchableOpacity
                onPress={props.onClickAddImage}
                style={[
                  styles.singIn,
                  {
                    //  borderColor: '#4dc2f8',
                    // borderWidth: 1,
                    marginBottom: 35,
                    marginTop: 10,
                    padding: 20,
                  },
                ]}
              >
                <Entypo name="images" color="#4dc2f8" size={60} />
              </TouchableOpacity>
            </View>

            <Text style={styles.text_footer}>Select laundry type</Text>
            <View style={styles.req_panel}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={
                  ([styles.textInput],
                  {
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    marginRight: 5,
                    padding: 1,
                    backgroundColor: 'lightgrey',
                    opacity: 0.6,
                  })
                }
                placeholder="Select your State"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={props.state.name}
                onValueChange={props.handleChange('name')}
              >
                <Picker.Item label="Select Laundry" value="" />
                {props.state.klaundries.map((option) => (
                  <Picker.Item
                    key={option.kname}
                    label={option.kprice + ' - ' + option.kname}
                    value={option.kname + '|' + option.kprice}
                  />
                ))}
              </Picker>

              <TextInput
                placeholder="0"
                style={styles.textInput}
                value={props.state.qty}
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={props.handleChange('qty')}
              />

              <TouchableOpacity
                style={[
                  styles.singIn,
                  {
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    marginLeft: 5,
                    padding: 15,
                  },
                ]}
                onPress={props.handleLaundry}
              >
                <FontAwesome name="plus" color="black" size={16} />
              </TouchableOpacity>
            </View>
            <View style={styles.laundry_container}>
              {props.state.klist != ''
                ? props.state.klist.map((klists) => {
                    return (
                      <View style={styles.laundry_list}>
                        <View style={styles.ltextv}>
                          <Text style={styles.ltext}>{klists.kname}</Text>
                        </View>
                        <View style={styles.ltextv}>
                          <Text style={styles.ltext}>{klists.qty}</Text>
                        </View>
                        <View style={styles.ltextv}>
                          <Text style={styles.ltext}>
                            {'\u20A6'} {klists.kprice}
                          </Text>
                        </View>
                        <View style={styles.ltextv}>
                          <Text style={styles.ltext}>
                            {'\u20A6'} {klists.subtotal}
                          </Text>
                        </View>
                        <View style={styles.ltextv}>
                          <TouchableOpacity
                            onPress={() => {
                              props.delLaundry(klists.kname);
                            }}
                            style={[styles.singIn, {}]}
                          >
                            <AntDesign
                              name="delete"
                              color="#4dc2f8"
                              size={20}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })
                : null}
            </View>

            <View style={styles.fav_panel}>
              <View style={styles.starch}>
                <H1 style={styles.title}>Starch</H1>
                <H3 style={styles.text}>EazyOn</H3>
                <Text style={styles.text}>{'\u20A6'} 50</Text>
              </View>
              <View style={styles.perf}>
                <H1 style={styles.title}>Perfume</H1>
                <H3 style={styles.text}>Explorer</H3>
                <Text style={styles.text}>{'\u20A6'} 100</Text>
              </View>
            </View>

            <Text style={styles.text_footer}>
              Choose Iron for clothes that just need to be ironed, choose Hang
              for clothes need to be hanged,{' '}
            </Text>
            <View style={styles.todo_btns}>
              <TouchableOpacity
                onPress={() => {
                  props.loadImage('iron');
                }}
                style={[
                  styles.singIn,
                  {
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    marginLeft: 5,
                    padding: 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#4dc2f8',
                    },
                  ]}
                >
                  JUST IRON
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.loadImage('hang');
                }}
                style={[
                  styles.singIn,
                  {
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    marginLeft: 5,
                    padding: 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#4dc2f8',
                    },
                  ]}
                >
                  HANG
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.loadImage('perfume');
                }}
                style={[
                  styles.singIn,
                  {
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    marginLeft: 5,
                    padding: 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#4dc2f8',
                    },
                  ]}
                >
                  ADD PERFUME
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.text_footer}>
              Select pickup and delivery date
            </Text>
            <View style={styles.date_pickers}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    props.showDateTimeMode('date');
                  }}
                  style={[
                    styles.singIn,
                    {
                      borderColor: '#4dc2f8',
                      borderWidth: 1,
                      marginLeft: 5,
                      padding: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#4dc2f8',
                      },
                    ]}
                  >
                    Select Pickup Date
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    props.showDateTimeMode('date');
                  }}
                  style={[
                    styles.singIn,
                    {
                      borderColor: '#4dc2f8',
                      borderWidth: 1,
                      marginLeft: 5,
                      padding: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#4dc2f8',
                      },
                    ]}
                  >
                    Select Delivery Date
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.text_footer}>
              Select pickup and delivery date
            </Text>
            <View style={styles.date_pickers}>
              <View style={styles.border}>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select pickup date"
                  textStyle={{ color: 'green' }}
                  placeHolderTextStyle={{ color: '#d3d3d3' }}
                  onDateChange={props.handlePDateChange}
                  disabled={false}
                />
              </View>
              <View style={styles.border}>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select delivery date"
                  textStyle={{ color: 'green' }}
                  placeHolderTextStyle={{ color: '#d3d3d3' }}
                  onDateChange={props.handleDDateChange}
                  disabled={false}
                />
              </View>
              <View></View>
            </View>
            <Text style={styles.text_footer}>Give a short note*</Text>
            <View style={styles.message}>
              <TextInput
                placeholder="Short Message..."
                onChangeText={props.handleChange('shortNote')}
                style={[
                  styles.textInput,
                  {
                    height: 100,
                    margin: 20,
                    padding: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                  },
                ]}
                multiline={true}
                value={props.state.password}
                returnKeyType="next"
              />
            </View>
          </Body>
        </CardItem>
        <CardItem style={styles.nav_btn} footer>
          <TouchableOpacity
            onPress={() => {
              props.setPage(1);
            }}
            style={[
              styles.singIn,
              {
                borderColor: '#4dc2f8',
                borderWidth: 1,
                marginTop: 15,
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
export default Make;

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
    color: 'grey',
    fontSize: 16,
    padding: 5,
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

    color: '#05375a',
    borderColor: 'lightgrey',
    borderWidth: 1,
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
    paddingBottom: 20,
  },
  fav_panel: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  date_pickers: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
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
    paddingBottom: 20,
  },
  border: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  laundry_container: {
    flexDirection: 'column',
    width: '100%',
  },
  laundry_list: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ltextv: {
    flex: 1,
    margin: 5,
  },
  ltext: {
    color: '#05375a',
    textAlign: 'center',
  },
});
