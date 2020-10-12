import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Text,
  Content,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Fab,
  Card,
  CardItem,
  Body,
} from 'native-base';
import HeaderComponent from './HeaderComponent';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  requestPLaundry,
  requestDLaundry,
  setLoader,
} from '../actions/LaundryAction';

class DashboardComponent extends Component {
  /*
     static navigationOptions=({navigation})=>{
         let drawerLabel='dashboard';
         let drawerIcon = ()=>(
            <Icon name='ios-book-outline' style={{width:26, height:26, color:'#0067a7'}} />
         );
         return {drawerLabel,drawerIcon};

     }
     */
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  componentDidMount() {
    this.props.setLoader(true);
    this.props.requestPLaundry();
    this.props.requestDLaundry();
  }

  render() {
    console.log(this.props);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <HeaderComponent props={this.props} />
        <LinearGradient colors={['#05375a', '#39cff2']} style={styles.header}>
          <View style={styles.header_img}>
            <Animatable.Image
              animation="bounceIn"
              duration={1500}
              source={require('../../assets/hanger2.jpg')}
              style={styles.logo}
              //resizeMode="stretch"
            />
          </View>
          <View style={styles.header_text}>
            <Text style={styles.texthead}>Atunde Arisekola</Text>
            <Text style={{ color: 'white' }}>atundearisekola@gmail.com</Text>
          </View>
        </LinearGradient>
        <Animatable.View animation="fadeInDownBig" style={styles.footer}>
          <Tabs tabBarActiveTextColor="red" tabBarInactiveTextColor="black">
            <Tab
              style={styles.tab}
              heading={
                <TabHeading style={styles.tabheading}>
                  <Icon name="apps" />
                  <Text style={styles.tab_text}>Pending Laundry</Text>
                </TabHeading>
              }
            >
              <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingTop: 10 }}></View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('detail');
                  }}
                >
                  <Card>
                    <CardItem>
                      <Body>
                        <View style={styles.card_panel}>
                          <View style={styles.laundry_numuber}>
                            <Text style={styles.lnumber}>255</Text>
                          </View>

                          <View style={styles.laundry_body}>
                            <Text style={styles.lbody_text}>22T6YZV4478H7</Text>

                            <Text style={styles.text_gray}>27/05/2020</Text>
                          </View>
                          <View style={styles.laundry_status}>
                            <Text style={styles.lprice}>{'\u20A6'} 10,500</Text>
                            <Text style={styles.lstatus}>Pending</Text>
                          </View>
                        </View>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </ScrollView>
            </Tab>
            <Tab
              style={styles.tab}
              heading={
                <TabHeading style={styles.tabheading}>
                  <Text style={styles.tab_text}>Delivered Laundry</Text>
                </TabHeading>
              }
            ></Tab>
          </Tabs>

          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5db8fe' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('request')}
          >
            <MaterialIcons name="playlist-add" color="white" />
          </Fab>
        </Animatable.View>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        requestPLaundry,
        requestDLaundry,
        setLoader,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state) => {
  return {
    pendinglaundries: state.LaundryReducer.pendinglaundries,
    deliveredlaundries: state.LaundryReducer.deliveredlaundries,
    loader: state.LaundryReducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

const { height } = Dimensions.get('screen');
const height_logo = height * 0.5 * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05375a',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  footer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    //backgroundColor: '#05375a',
    color: 'red',
  },
  tabheading: {
    backgroundColor: '#05375a',
    color: '#000',
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
  texthead: {
    color: 'white',
    fontWeight: 'bold',
  },
  header_text: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
  },
  header_img: {
    borderRadius: 100,
    backgroundColor: '#5db8fe',
    // marginTop: -25,
  },
  card_panel: {
    flexDirection: 'row',
  },
  lnumber: {
    color: 'white',
  },
  laundry_numuber: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5db8fe',
    padding: 5,
    fontWeight: 'bold',
    borderRadius: 50,
  },
  laundry_body: {
    flex: 2,
    justifyContent: 'center',

    marginLeft: 20,
    marginRight: 10,
  },
  laundry_price: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05375a',
    padding: 5,
    fontWeight: 'bold',
    borderRadius: 50,
  },
  lprice: {
    color: '#5db8fe',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lbody_text: {
    color: '#05375a',

    fontFamily: 'roboto',
    //fontWeight: 'bold',
  },
  text_gray: {
    color: 'grey',
    fontSize: 14,
  },
  laundry_status: {
    flex: 1.5,
    justifyContent: 'center',
  },
  lstatus: {
    color: 'gray',
    fontSize: 12,
  },
});
