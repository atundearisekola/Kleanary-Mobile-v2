import React, { Component } from 'react';
import { Container, Header, Content, Icon, Picker, Form } from 'native-base';
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
import { setFav } from '../actions/AuthAction';

class FavoriteComponent extends Component {
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
      perfume: this.props.favperfume,
      starch: this.props.favstarch,
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ ...this.state, [prop]: event });
  };
  handleSubmit = () => {
    var ps = this.state.perfume.split('|');
    var perfname = ps[0];
    var perfprice = ps[1];
    const newp = { perfname: perfname, perfprice: perfprice };
    var ss = this.state.starch.split('|');
    var starchname = ss[0];
    var starchprice = ss[1];
    const news = { starchname: starchname, starchprice: starchprice };
    const data = { favperf: newp, favstarch: news };
    this.props.setFav(data);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={{ flex: 1 }}>
              <HeaderComponent props={this.props} />

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
                  <Form style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', paddingLeft: 20 }}>
                      <Text
                        style={[
                          styles.text_footer,
                          {
                            marginTop: 35,
                          },
                        ]}
                      >
                        Select Starch
                      </Text>

                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Select your Starch"
                        placeholderStyle={{ color: '#bfc6ea' }}
                        placeholderIconColor="#007aff"
                        style={styles.textInput}
                        selectedValue={this.state.starch}
                        onValueChange={this.handleChange('starch')}
                      >
                        <Picker.Item label="EasyOn" value="key0" />
                        <Picker.Item label="GDB" value="key1" />
                      </Picker>
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
                        Select Perfume
                      </Text>

                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Select your Perfume"
                        placeholderStyle={{ color: '#bfc6ea' }}
                        placeholderIconColor="#007aff"
                        style={styles.textInput}
                        selectedValue={this.state.perfume}
                        onValueChange={this.handleChange('perfume')}
                      >
                        <Picker.Item label="Explorer" value="key0" />
                        <Picker.Item label="412" value="key1" />
                        <Picker.Item label="Love" value="key2" />
                      </Picker>
                    </View>
                  </Form>

                  <View style={styles.button}>
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
                          Update
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              </ScrollView>
            </View>
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
        setFav,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state) => {
  return {
    loader: state.AuthReducer.loader,
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    perfumes: state.AuthReducer.perfumelist,
    starchs: state.AuthReducer.starchlist,
    favstarch: state.AuthReducer.user.favstarch,
    favperfume: state.AuthReducer.user.favperf,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteComponent);

const { height } = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.4;
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
});
