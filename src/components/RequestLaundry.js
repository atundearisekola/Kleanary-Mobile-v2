import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet, StatusBar } from 'react-native';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
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
  ActionSheet,
  Root,
  Col,
  Row,
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import DatePicker from '@react-native-community/datetimepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Make from './Make';
import Confirm from './Confirm';
import Deliveryaddress from './Deliveryaddress';
import Makepayment from './Makepayment';
import HeaderComponent from './HeaderComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import ImagePicker from 'react-native-image-crop-picker';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import PaystackWebView from 'react-native-paystack-webview';
import {
  requestLaundry,
  setLoader,
  verifyStack,
} from '../actions/LaundryAction';
import ImageModal from './ImageModal';

class RequestLaundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      chosenDate: new Date(),
      selected: undefined,
      page: 0,

      numberformat: '0',
      pickupDate: new Date('2019-08-18T21:11:54'),
      deliveryDate: new Date('2019-08-18T21:11:54'),
      show: false,
      mode: 'date',
      name: '',
      qty: '1',
      klist: [],
      newList: [],
      selectedFile: null,
      selectedFiles: [],
      imageSrcArray: [],
      todoIron: [],
      todoHang: [],
      todoperfume: [],
      todo: '',
      shortNote: '',
      numclothes: 0,
      totalprice: 0,
      //email:this.props.user.email,
      // phone:this.props.user.phone,
      // country:this.props.user.country,
      // state:this.props.user.state,
      // localgov:this.props.user.localgov,
      // addr:this.props.user.addr,
      // starch:this.props.user.favstarch,
      // perfume:this.props.user.favperf,
      open: false,
      loading: false,
      klaundries: this.props.klaundries,

      total: 0,
    };

    this.setDate = this.setDate.bind(this);
  }
  showDateTimeMode = (currentMode) => {
    this.setState({ ...this.state, show: true, mode: currentMode });
  };

  getSteps = () => {
    return [
      'REQUEST LAUNDRY',
      'PICKUP & DELIVERY DETAILS',
      ' CONFIRM REQUEST ',
      'COMPLETE REQUEST',
    ];
  };

  loadImage = (todo) => {
    this.setState({ ...this.state, todo: todo });
    this.refs.imageModal.showModal();
  };

  onSelectedImage = (image) => {
    let newDataImg = this.state.selectedFiles;
    console.log(newDataImg);
    const source = { uri: image.uri };
    var filename = JSON.stringify(source).split('/');
    filename = filename[11];
    let item = {
      id: Date.now(),
      url: source,
      content: image.data,
      filename: filename,
    };
    newDataImg.push(item);
    this.setState({ selectedFiles: newDataImg });
  };

  takePhotoFromCamera = async () => {
    /*
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: true,
    }).then((image) => {
      this.onSelectedImage(image);
      console.log(image);
    });
    */
    const { status } = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      console.log(result);

      if (!result.cancelled) {
        //setImage(result.uri);
        this.onSelectedImage(result);
      }
    }
  };
  choosePhotoFromLibrary = async () => {
    /*
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,
      includeBase64: true,
      // multiple: true,
      cropping: true,
    }).then((image) => {
      this.onSelectedImage(image);
      console.log(image);
    });
    */
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      console.log(result);

      if (!result.cancelled) {
        //setImage(result.uri);
        this.onSelectedImage(result);
      }
    }
  };

  onClickAddImage = () => {
    const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'Select a Photo',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.takePhotoFromCamera();

            break;

          case 1:
            this.choosePhotoFromLibrary();

            break;

          default:
            break;
        }
      }
    );
  };

  addToToDo = (todo, filename, url) => {
    switch (todo) {
      case 'iron':
        if (this.state.todoIron.length > 0) {
          var isIn = false;
          for (let i = 0; i < this.state.todoIron.length; i++) {
            const element = this.state.todoIron[i];
            if (element.filename == filename) {
              isIn = true;
              break;
            }
          }
          if (isIn) {
            const list = this.state.todoIron.filter((lis) => {
              return lis.filename !== filename;
            });
            this.setState({ ...this.state, todoIron: list });
            // document.getElementById(filename).style.borderColor="grey";
          } else {
            const data = { todo: todo, filename: filename, url: url };
            let todoIron = [...this.state.todoIron, data];

            this.setState({ todoIron });

            //document.getElementById(filename).style.borderColor="green";
          }
        } else {
          const data = { todo: todo, filename: filename, url: url };
          let todoIron = [...this.state.todoIron, data];

          this.setState({ todoIron });
          // document.getElementById(filename).style.borderColor="green";
        }

        break;

      case 'hang':
        if (this.state.todoHang.length > 0) {
          var isIn = false;
          for (let i = 0; i < this.state.todoHang.length; i++) {
            const element = this.state.todoHang[i];
            if (element.filename == filename) {
              isIn = true;
              break;
            }
          }
          if (isIn) {
            const list = this.state.todoHang.filter((lis) => {
              return lis.filename !== filename;
            });
            this.setState({ ...this.state, todoHang: list });
            // document.getElementById(filename).style.borderColor="grey";
          } else {
            const data = { todo: todo, filename: filename, url: url };
            let todoHang = [...this.state.todoHang, data];

            this.setState({ todoHang });
            // document.getElementById(filename).style.borderColor="green";
          }
        } else {
          const data = { todo: todo, filename: filename, url: url };
          let todoHang = [...this.state.todoHang, data];

          this.setState({ todoHang });
          // document.getElementById(filename).style.borderColor="green";
        }

        break;

      case 'perfume':
        if (this.state.todoperfume.length > 0) {
          var isIn = false;
          for (let i = 0; i < this.state.todoperfume.length; i++) {
            const element = this.state.todoperfume[i];
            if (element.filename == filename) {
              isIn = true;
              break;
            }
          }
          if (isIn) {
            const list = this.state.todoperfume.filter((lis) => {
              return lis.filename !== filename;
            });
            this.setState({ ...this.state, todoperfume: list });
            //  document.getElementById(filename).style.borderColor="grey";
          } else {
            const data = { todo: todo, filename: filename, url: url };
            let todoperfume = [...this.state.todoperfume, data];

            this.setState({ todoperfume });
            //  document.getElementById(filename).style.borderColor="green";
          }
        } else {
          const data = { todo: todo, filename: filename, url: url };
          let todoperfume = [...this.state.todoperfume, data];

          this.setState({ todoperfume });
          // document.getElementById(filename).style.borderColor="green";
        }

        break;

      default:
        break;
    }
  };

  renderItem = ({ item, index }) => {
    var color = 'grey';
    switch (this.state.todo) {
      case 'iron':
        for (let i = 0; i < this.state.todoIron.length; i++) {
          const element = this.state.todoIron[i];
          if (item.filename == element.filename) {
            color = 'green';
            break;
          }
        }
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1,
              borderWidth: 2,
              borderColor: color,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.addToToDo('iron', item.filename, item.content);
              }}
            >
              <Image source={item.url} style={{ height: 150, width: 150 }} />
            </TouchableOpacity>
          </View>
        );
        break;

      case 'hang':
        for (let i = 0; i < this.state.todoHang.length; i++) {
          const element = this.state.todoHang[i];
          if (item.filename == element.filename) {
            color = 'green';
            break;
          }
        }
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1,
              borderWidth: 2,
              borderColor: color,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.addToToDo('hang', item.filename, item.content);
              }}
            >
              <Image source={item.url} style={{ height: 150, width: 150 }} />
            </TouchableOpacity>
          </View>
        );
        break;

      case 'perfume':
        for (let i = 0; i < this.state.todoperfume.length; i++) {
          const element = this.state.todoperfume[i];
          if (item.filename == element.filename) {
            color = 'green';
            break;
          }
        }
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1,
              borderWidth: 2,
              borderColor: color,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.addToToDo('perfume', item.filename, item.content);
              }}
            >
              <Image source={item.url} style={{ height: 150, width: 150 }} />
            </TouchableOpacity>
          </View>
        );
        break;

      default:
        break;
    }
  };

  handleChange = (prop) => (event) => {
    this.setState({ ...this.state, [prop]: event });
  };

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  handlePDateChange = (date) => {
    this.setState({ ...this.state, pickupDate: date });
  };
  handleDDateChange = (date) => {
    this.setState({ ...this.state, deliveryDate: date });
  };

  onValueChange2 = (value) => {
    this.setState({ name: value });
  };

  setPage = (page) => {
    this.setState({ page: page });
  };

  handleLaundry = (e) => {
    e.preventDefault();
    var name = this.state.name;
    if (name == '') {
      return;
    }
    var names = name.split('|');
    var kl = names[0];
    var kp = names[1];
    var newkp = kl;
    var newList = '';

    const qty = this.state.qty;
    const subt = qty * kp;
    const data = { kname: kl, kprice: kp, qty: qty, subtotal: subt };

    if (this.state.klist.length > 0) {
      this.state.klist.forEach((element) => {
        if (element.kname == newkp) {
          var newprice = this.state.totalprice - element.subtotal;
          var newclothesnum = this.state.numclothes - element.qty;
          this.setState({
            ...this.state,
            numclothes: newclothesnum,
            totalprice: newprice,
          });
          this.delLaundry(newkp);
        } else {
          var newprice = this.state.totalprice + subt;
          var newclothesnum = this.state.numclothes + qty;
          this.setState({
            ...this.state,
            numclothes: newclothesnum,
            totalprice: newprice,
          });
          let klist = [...this.state.klist, data];
          this.setState({ klist });
        }
      });
    } else {
      var newprice = this.state.totalprice + subt;
      var newclothesnum = this.state.numclothes + qty;
      this.setState({
        ...this.state,
        numclothes: newclothesnum,
        totalprice: newprice,
      });
      let klist = [...this.state.klist, data];
      this.setState({ klist });
    }
  };

  delLaundry = (kname) => {
    const list = this.state.klist.filter((lis) => {
      return lis.kname !== kname;
    });
    this.setState({ ...this.state, klist: list });

    console.log(this.state);
  };

  handleRequest = () => {
    console.log(this.props.loader);
    this.props.setLoader(true);
    console.log(this.props.loader);

    const data = {
      pickupDate: this.state.pickupDate,
      deliveryDate: this.state.deliveryDate,
      name: this.state.name,
      qty: this.state.qty,
      klist: this.state.klist,

      selectedFile: this.state.selectedFile,
      laundryimg: this.state.selectedFiles,
      imgSrc: this.state.imageSrcArray,
      todoIron: this.state.todoIron,
      todoHang: this.state.todoHang,
      todoPerfume: this.state.todoperfume,

      email: this.state.email,
      phone: this.state.phone,
      country: this.state.country,
      state: this.state.state,
      localgov: this.state.localgov,
      addr: this.state.addr,
      shortNote: this.state.shortNote,
      favstarch: this.state.starch,
      favperfume: this.state.perfume,
      token: this.props.token,
    };

    this.props.requestLaundry(data);
  };

  render() {
    return (
      <Root>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <HeaderComponent props={this.props} />
          <LinearGradient colors={['#05375a', '#39cff2']} style={styles.header}>
            <View style={styles.header_text}>
              <Text style={styles.texthead}>
                {this.getSteps()[this.state.page]}
              </Text>
            </View>
          </LinearGradient>

          <View style={styles.footer}>
            {this.state.page == 0 ? (
              <Make
                handleDDateChange={this.handleDDateChange}
                handlePDateChange={this.handlePDateChange}
                showDateTimeMode={this.showDateTimeMode}
                delLaundry={this.delLaundry}
                state={this.state}
                onClickAddImage={this.onClickAddImage}
                loadImage={this.loadImage}
                handleChange={this.handleChange}
                handleLaundry={this.handleLaundry}
                setPage={this.setPage}
              />
            ) : null}
            {this.state.page == 1 ? (
              <Deliveryaddress
                state={this.state}
                onValueChange2={this.onValueChange2}
                setPage={this.setPage}
              />
            ) : null}
            {this.state.page == 2 ? (
              <Confirm
                state={this.state}
                loadImage={this.loadImage}
                onValueChange2={this.onValueChange2}
                setPage={this.setPage}
              />
            ) : null}
            {this.state.page == 3 ? (
              <Makepayment
                state={this.state}
                onValueChange2={this.onValueChange2}
                setPage={this.setPage}
              />
            ) : null}
          </View>
        </View>

        <ImageModal ref={'imageModal'} parentInit={this} />
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={this.state.pickupDate}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.handlePDateChange}
          />
        )}
      </Root>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        requestLaundry,
        setLoader,
        verifyStack,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    klaundries: state.LaundryReducer.klaundries,
    id: 1,
    user: state.AuthReducer.user,
    token: state.AuthReducer.access_token,
    request: state.LaundryReducer.requestdetail,

    loader: state.LaundryReducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestLaundry);

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
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  footer: {
    flex: 8,
  },
  tab: {
    backgroundColor: '#05375a',
  },
  tabheading: {
    backgroundColor: '#05375a',
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
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 50,
  },
  laundry_body: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: 'white',
  },
  lbody_text: {
    color: '#05375a',
    fontSize: 18,
  },
  text_gray: {
    color: 'grey',
  },
});
