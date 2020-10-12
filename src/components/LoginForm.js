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
} from 'react-native';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { loginUser, setAuthLoader } from '../actions/AuthAction';
import { connect } from 'react-redux';
import * as Facebook from 'expo-facebook';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textInputChange: false,
      password: '',
      secureTextEntry: true,
    };
  }
  static tabBarIcon = ({ tintColor }) => {
    return <Icon name="ios-book-outline" style={{ color: tintColor }} />;
  };

  textInputChange(value) {
    if (value.length !== 0) {
      this.setState({
        check_textInputChange: true,
      });
    } else {
      this.setState({
        check_textInputChange: false,
      });
    }
  }

  secureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  handleSubmit = () => {
    const data = { email: this.state.email, password: this.state.password };
    this.props.setAuthLoader(true);
    this.props.loginUser(data);
  };

  facebookLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('280665525755908', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            //  setLoggedinStatus(true);
            //setUserData(data);

            this.props.setAuthLoader(true);
            this.props.loginUser(data);
          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <ScrollView style={styles.container}>
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
                <Text style={styles.text_footer}>E-MAIL</Text>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color="#05375a" size={20} />
                  <TextInput
                    placeholder="Your email..."
                    style={styles.textInput}
                    onChangeText={(text) => this.textInputChange(text)}
                  />
                  {this.state.check_textInputChange ? (
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
                  Password
                </Text>
                <View style={styles.action}>
                  <FontAwesome name="lock" color="#05375a" size={20} />
                  <TextInput
                    placeholder="Your password..."
                    style={styles.textInput}
                    secureTextEntry={this.state.secureTextEntry}
                    value={this.state.password}
                    onChangeText={(text) =>
                      this.setState({
                        password: text,
                      })
                    }
                  />
                  <TouchableOpacity onPress={() => this.secureTextEntry()}>
                    {this.state.secureTextEntry ? (
                      <Feather name="eye-off" color="gray" size={20} />
                    ) : (
                      <Feather name="eye" color="gray" size={20} />
                    )}
                  </TouchableOpacity>
                </View>

                <Text style={{ color: '#009bd1', marginTop: 15 }}>
                  Forgot password?
                </Text>

                <View style={styles.button}>
                  {/*
               <LinearGradient colors={['#5db8fe', '#39cff2']}
               style={styles.singIn}>
                 <Text style={[styles.textSign,{
                   color: 'white',
                 }]}>Sign In</Text>
                 
               </LinearGradient>

               <TouchableOpacity
               onPress={()=>{
                 this.props.navigation.navigate("Auth")
               }}
               style={[styles.singIn,{
                 borderColor: '#4dc2f8',
                 borderWidth: 1,
                 marginTop: 15,
               }]}
               >
                 <Text style={[styles.textSign,{
                   color: '#4dc2f8'
                 }]}>Sign In</Text>
               </TouchableOpacity>
                */}
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Auth');
                    }}
                    style={[
                      styles.singIn,
                      {
                        marginTop: 15,
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={['#5db8fe', '#39cff2']}
                      style={styles.singIn}
                    >
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: 'white',
                          },
                        ]}
                      >
                        Sign In
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={this.facebookLogIn}
                  >
                    <Text style={{ color: '#fff' }}>Login with Facebook</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        loginUser,
        setAuthLoader,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state) => {
  return {
    loader: state.AuthReducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

const { height } = Dimensions.get('screen');
const height_logo = height * 0.5 * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05375a',
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
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  singIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
