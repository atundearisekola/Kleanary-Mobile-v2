import React,{Component} from 'react';
import Modal from 'react-native-modalbox'
import { Dimensions, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Container,Text,Button,Content,Header, Tab, Tabs, TabHeading, Icon,Fab,Card,CardItem,Body  } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'


var screen = Dimensions.get('window');
export default class ImageModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeRow: null
        }

    }

    showModal =()=>{
        this.refs.myModal.open()
    }
    

    render(){
        return(
            <Modal
            ref={'myModal'}
            style={{
                justifyContent: "center",
                borderRadius: Platform.OS === 'ios' ? 30 : 10,
                shadowRadius: 10,
                width: screen.width-50,
                height: screen.height-100,
            }} 
            position='center'
            backdrop={true}
            swipeToClose={false}
            onClosed={()=>{
              
            }}
            >
                 <FlatList 
                
              data={this.props.parentInit.state.selectedFiles}
              renderItem={this.props.parentInit.renderItem}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.props.parentInit.state}
               />
               

           
               <Fab
            
            containerStyle={{ }}
            style={{ backgroundColor: 'lightgray' }}
            position="topRight"
            onPress={() => this.refs.myModal.close()}>
            <MaterialIcons name="cancel" color="grey" size={36} />
           
          </Fab>

            </Modal>
        )
    }
}