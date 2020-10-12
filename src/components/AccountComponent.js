import React, { Component } from 'react';
import {
  Container,
  Header,
  Icon,
  Content,
  Form,
  Item,
  Picker,
  Input,
  Label,
} from 'native-base';
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
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from './HeaderComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUser, setAuthLoader } from '../actions/AuthAction';
class AccountComponent extends Component {
  /*
    static navigationOptions=({navigation})=>{
        let drawerLabel='dashboard';
        let drawerIcon = ()=>(
           <Icon name='ios-book-outline' style={{width:26,height:26,color:'#0067a7'}} />
        );
        return {drawerLabel,drawerIcon};

    }
*/
  constructor(props) {
    super(props);
    this.state = {
      fname: this.props.user.fname,
      lname: this.props.user.lname,
      name: this.props.user.name,
      email: this.props.user.email,
      country: this.props.user.country,
      state: this.props.user.state,
      localgov: this.props.user.localgov,
      addr: this.props.user.addr,
      phone: this.props.user.phone,

      selected2: undefined,
      check_textInputChange: false,
      password: '',
      secureTextEntry: true,
      password_confirm: '',
      secureTextEntry_confirm: true,
    };
  }
  handleChange = (prop) => (event) => {
    this.setState({ ...this.state, [prop]: event });
  };

  handleSubmit = () => {
    this.props.setAuthLoader(true);
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      name: this.state.name,
      country: this.state.country,
      state: this.state.state,
      localgov: this.state.localgov,
      addr: this.state.addr,
      phone: this.state.phone,
      token: this.props.token,
    };
    this.props.updateUser(data);
    //console.log(data);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <ScrollView style={styles.container}>
              <HeaderComponent props={this.props} />
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
                        value={this.state.fname}
                        onChangeText={this.handleChange('fname')}
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
                        value={this.state.lname}
                        onChangeText={this.handleChange('lname')}
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
                    value={this.state.username}
                    onChangeText={this.handleChange('username')}
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
                    onSubmitEditing={() => this.refs.phone.focus()}
                    value={this.state.email}
                    onChangeText={this.handleChange('email')}
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
                  Phone Number
                </Text>
                <View style={styles.action}>
                  <FontAwesome name="phone" color="#05375a" size={20} />
                  <TextInput
                    placeholder="Phone Number..."
                    style={styles.textInput}
                    value={this.state.phone}
                    onChangeText={this.handleChange('phone')}
                    returnKeyType="next"
                    autoCorrect={false}
                    ref={'phone'}
                    onSubmitEditing={() => this.refs.addr.focus()}
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
                    ref={'addr'}
                    value={this.state.addr}
                    onChangeText={this.handleChange('addr')}
                    returnKeyType="next"
                    autoCorrect={false}
                  />
                </View>

                <Form style={{ flexDirection: 'row' }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={styles.textInput}
                    placeholder="Select your Country"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.country}
                    onValueChange={this.handleChange('country')}
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
                    selectedValue={this.state.state}
                    value={this.state.fname}
                    onValueChange={this.handleChange('state')}
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
                    selectedValue={this.state.localgov}
                    onValueChange={this.handleChange('localgov')}
                  >
                    <Picker.Item label="Ifelodun" value="key0" />
                  </Picker>
                </Form>

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
                      this.handleSubmit();
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
                        Save
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
        updateUser,
        setAuthLoader,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    token: state.AuthReducer.access_token,
    loader: state.AuthReducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountComponent);

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
