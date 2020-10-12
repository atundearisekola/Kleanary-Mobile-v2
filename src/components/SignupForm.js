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
import { connect } from 'react-redux';
import { regUser, setAuthLoader } from '../actions/AuthAction';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textInputChange: false,

      secureTextEntry: true,
      password_confirm: '',
      secureTextEntry_confirm: true,
      fname: '',
      lname: '',
      username: '',
      email: '',
      password: '',
      errors: '',

      loader: this.props.loader,
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

  secureTextEntry_confirm() {
    this.setState({
      secureTextEntry_confirm: !this.state.secureTextEntry_confirm,
    });
  }

  handleSubmit = () => {
    this.props.setAuthLoader(true);
    const data = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname,
      name: this.state.fname,
      password: this.state.password,
      confirmpass: this.state.password_confirm,
    };
    this.setState({ ...this.state, loader: true });
    this.state.confirmpass == 'Password Matches'
      ? this.props.regUser(data)
      : this.setState({
          ...this.state,
          loader: false,
          errors: 'Password does not Match',
        });
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
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'column', paddingLeft: 20 }}>
                    <Text
                      style={[
                        styles.text_footer,
                        {
                          marginTop: 35,
                        },
                      ]}
                    >
                      First Name
                    </Text>
                    <View>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter First Name"
                        style={styles.textInput}
                        keyboardType="default"
                        returnKeyType="next"
                        autoCorrect={false}
                        ref={'fname'}
                        onSubmitEditing={() => this.refs.lname.focus()}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'column', paddingLeft: 20 }}>
                    <Text
                      style={[
                        styles.text_footer,
                        {
                          marginTop: 35,
                        },
                      ]}
                    >
                      Last Name
                    </Text>
                    <View>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter Last Name"
                        style={styles.textInput}
                        keyboardType="default"
                        returnKeyType="next"
                        autoCorrect={false}
                        ref={'lname'}
                        onSubmitEditing={() => this.refs.username.focus()}
                      />
                    </View>
                  </View>
                </View>

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
                    ref={'username'}
                    onSubmitEditing={() => this.refs.email.focus()}
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
                    ref={'email'}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
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
                    returnKeyType="next"
                    autoCorrect={false}
                    ref={'txtPassword'}
                    onSubmitEditing={() => this.refs.cPassword.focus()}
                  />
                  <TouchableOpacity onPress={() => this.secureTextEntry()}>
                    {this.state.secureTextEntry ? (
                      <Feather name="eye-off" color="gray" size={20} />
                    ) : (
                      <Feather name="eye" color="gray" size={20} />
                    )}
                  </TouchableOpacity>
                </View>

                <Text
                  style={[
                    styles.text_footer,
                    {
                      marginTop: 35,
                    },
                  ]}
                >
                  Confirm Password
                </Text>
                <View style={styles.action}>
                  <FontAwesome name="lock" color="#05375a" size={20} />
                  <TextInput
                    placeholder="Confirm password..."
                    style={styles.textInput}
                    secureTextEntry={this.state.secureTextEntry_confirm}
                    ref={'cPassword'}
                    value={this.state.password_confirm}
                    onChangeText={(text) =>
                      this.setState({
                        password_confirm: text,
                      })
                    }
                    returnKeyType="go"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => this.secureTextEntry_confirm()}
                  >
                    {this.state.secureTextEntry_confirm ? (
                      <Feather name="eye-off" color="gray" size={20} />
                    ) : (
                      <Feather name="eye" color="gray" size={20} />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.textPrivate}>
                  <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                  </Text>
                  <Text
                    style={[
                      styles.color_textPrivate,
                      {
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {' '}
                    Terms of service
                  </Text>
                  <Text style={styles.color_textPrivate}> and</Text>
                  <Text
                    style={[
                      styles.color_textPrivate,
                      {
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {' '}
                    Privacy Policy
                  </Text>
                </View>

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
                      this.props.navigation.navigate('App');
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
                        Sign Up
                      </Text>
                    </LinearGradient>
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
        regUser,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

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
    paddingTop: 50,
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'gray',
  },
});
