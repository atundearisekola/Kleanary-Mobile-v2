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
const Makepayment = (props) => {
  return (
    <ScrollView>
      <Card>
        <CardItem>
          <Body style={styles.header}>
            <Text style={styles.title}>THANK YOU FOR YOUR PATRONAGE</Text>
            <Text style={styles.text_footer}>
              Click on checkout to complete your request
            </Text>
          </Body>
        </CardItem>
        <CardItem style={styles.nav_btn} footer>
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
            <Text
              style={[
                styles.textSign,
                {
                  color: '#4dc2f8',
                },
              ]}
            >
              Checkout
            </Text>
          </TouchableOpacity>

          <PaystackWebView
            buttonText="Pay Now"
            showPayButton={false}
            paystackKey="your-public-key-here"
            amount={120000}
            billingEmail="paystackwebview@something.com"
            billingMobile="09787377462"
            billingName="Oluwatobi Shokunbi"
            ActivityIndicatorColor="green"
            SafeAreaViewContainer={{ marginTop: 5 }}
            SafeAreaViewContainerModal={{ marginTop: 5 }}
            onCancel={(e) => {
              // handle response here
            }}
            onSuccess={(res) => {
              // handle response here
            }}
            autoStart={false}
          />
        </CardItem>
      </Card>
    </ScrollView>
  );
};
export default Makepayment;
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
    textAlign: 'center',
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
    fontSize: 20,
  },
  text_footer: {
    color: 'gray',
    fontSize: 12,
    //textAlign: "center"
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

  nav_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
