import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { StyleSheet,Image,TouchableWithoutFeedback,
    StatusBar,TextInput,SafeAreaView,
    Keyboard,TouchableOpacity,KeyboardAvoidingView,ScrollView, Dimensions,
    ActivityIndicator,AsyncStorage} from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, DatePicker,
    Thumbnail, Text, Left, Body,Fab, Form,Picker,Item,Label,Input, Icon, H1, H3, Button } from 'native-base';
const Confirm =(props)=>{

   return(
    <ScrollView>
          <Card >
            <CardItem style={{
              justifyContent: "center",
              alignItems: "center",
            }}>
              
              <View style={styles.price_body}>
              <Text style={styles.price_text}>Total Price </Text>
          <Text style={styles.price}>{'\u20A6'} {props.state.totalprice}</Text>
              </View>
              <View style={styles.clothes_body}> 
              <Text style={styles.clothes_text}>Total Clothes </Text>
                <Text style={styles.clothes}>{props.state.numclothes}</Text>
              </View>
            </CardItem>
            
            <CardItem>
              <Body>

              <View style={{
  justifyContent: "center",
  alignItems: "center",
  width: '100%'
}}><View style={styles.dotted_hr}></View></View>

              <View style={styles.laundry_container}>
              { 
    
    props.state.klist !="" ? (
     props.state.klist.map(klists=>{
       return(

        <View style={styles.laundry_list}>
        <View style={styles.ltextv}>
        <Text style={styles.ltext}>{klists.kname}</Text>
        </View>
        <View style={styles.ltextv}>
        <Text style={styles.ltext}>{klists.qty}</Text>

        </View>
        <View style={styles.ltextv}>
        <Text style={styles.ltext}>{'\u20A6'} {klists.kprice}</Text>
        </View>
        <View style={styles.ltextv}>
        <Text style={styles.ltext}>{'\u20A6'} {klists.subtotal}</Text>
        </View>
        <View style={styles.ltextv}>
        <TouchableOpacity
         onPress={()=>{
          props.delLaundry(klists.kname)
         }}
         style={[styles.singIn,{
          
           
         }]}
         >
           <AntDesign name="delete" color="#4dc2f8" size={20} />
         </TouchableOpacity>
        </View>
     
      </View>
       
            
       )
       
     })

     ) : null
     }
                

              </View>

                
                <View style={styles.fav_panel}>
                      <View style={styles.starch}>
                        <H1 style={styles.text_header}>Starch</H1>
                        <H3 style={styles.text}>EazyOn</H3>
                        <Text style={styles.text}>{'\u20A6'} 50</Text>
                      </View>
                      <View style={styles.perf}>
                        <H1 style={styles.text_header}>Perfume</H1>
                        <H3 style={styles.text}>Explorer</H3>
                        <Text style={styles.text}>{'\u20A6'} 100</Text>
                      </View>
                      </View>

                     

                      <Text style={styles.text_footer}>Choose Iron for clothes that just need to be ironed, choose Hang for clothes need  to be hanged,   </Text>
                      <View style={styles.todo_btns}>
                      <TouchableOpacity
                   onPress={()=>{
                    props.loadImage('iron')
                  }}
                   style={[styles.singIn,{
                     borderColor: '#4dc2f8',
                     borderWidth: 1,
                     marginLeft: 5,
                     padding:15
                   }]}
                   >
                    <Text style={[styles.textSign,{
                   color: '#4dc2f8'
                 }]}>JUST IRON</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                   onPress={()=>{
                     props.loadImage('hang')
                   }}
                   style={[styles.singIn,{
                     borderColor: '#4dc2f8',
                     borderWidth: 1,
                     marginLeft: 5,
                     padding:15
                   }]}
                   >
                    <Text style={[styles.textSign,{
                   color: '#4dc2f8'
                 }]}>HANG</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                  onPress={()=>{
                    props.loadImage('perfume')
                  }}
                   style={[styles.singIn,{
                     borderColor: '#4dc2f8',
                     borderWidth: 1,
                     marginLeft: 5,
                     padding:15
                   }]}
                   >
                     <Text style={[styles.textSign,{
                   color: '#4dc2f8'
                 }]}>ADD PERFUME</Text>
                   </TouchableOpacity>
    
                      </View>


                      


<View style={styles.date_pickers}>
                       <View style={styles.border}>
                       <Text style={styles.text_footer}>Pickup Date   </Text>
                       <Text>
              Date: {props.state.chosenDate.toString().substr(4, 12)}
            </Text>
                        </View>
                        <View style={styles.border}>
                        <Text style={styles.text_footer}>Delivery Date   </Text>
                        <Text>
              Date: {props.state.chosenDate.toString().substr(4, 12)}
            </Text>

                        </View>

                        </View>

                        <View style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: '100%'
                        }}><View style={styles.dotted_hr}>
                          </View>
                          </View>

                          <View style={styles.contact}>
                           
                          <View style={styles.list}>
                            <Text style={styles.title}>Username</Text>
                            <Text style={styles.sub}><FontAwesome
                 name="user-o"
                 color="#05375a"
                 size={20}
                  />  atundearisekola</Text>
                            </View>

                            

                            <View style={styles.list}>
                            <Text style={styles.title}>Email</Text>
                            <Text style={styles.sub}><FontAwesome
                 name="at"
                 color="#05375a"
                 size={20}
                  />  atundearisekola@gmail.com</Text>
                            </View>

                            <View style={styles.list}>
                            <Text style={styles.title}> Phone</Text>
                            <Text style={styles.sub}><FontAwesome
                 name="phone"
                 color="#05375a"
                 size={20}
                  />  08159109387</Text>
                            </View>

                            <View style={styles.list}>
                            <Text style={styles.title}>Address</Text>
                            <Text style={styles.sub}>  10 Alhaji Arogunmasa street</Text>
                            </View>
                            <View style={styles.list}>
                            <Text style={styles.title}>Country</Text>
                            <Text style={styles.sub}>  Nigeria</Text>
                            </View>
                            <View style={styles.list}>
                            <Text style={styles.title}>State</Text>
                            <Text style={styles.sub}>  Lagos</Text>
                            </View>
                            

                          </View>
                         


                
               
    
                    
    
    
                
              </Body>
            </CardItem>
            <CardItem style={styles.nav_btn} footer>
            <TouchableOpacity
                   onPress={()=>{
                     props.setPage(1)
                   }}
                   style={[styles.singIn,{
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    marginTop: 15,
                    marginRight:20,
                    padding:30
                  }]}
                  >
                    
                    <MaterialIcons name="navigate-before" color="black" size={16} />
                   </TouchableOpacity>

                   <TouchableOpacity
                   onPress={()=>{
                     props.setPage(3)
                   }}
                   style={[styles.singIn,{
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    marginTop: 15,
                    marginLeft: 20,

                    padding:30
                  }]}
                  >
                    
                    <MaterialIcons name="navigate-next" color="black" size={16} />
                   </TouchableOpacity>
                   
            </CardItem>
            
         </Card>
      </ScrollView>

   )

}
export default Confirm

const {height} = Dimensions.get("screen");
const height_logo =height*0.5 * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#05375a',
    
  },
  header:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 50,
  },
  
  logo:{
    height: height_logo,
    width: height_logo,
    borderRadius: 100

  },
  
  footer:{
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  text_header:{
    color: '#05375a',
    fontWeight: 'bold',
    fontSize: 30

  },
  
  text_footer:{
    color: 'grey',
    fontSize: 16,
    padding: 5
  },
  action:{
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput:{
    flex: 1,
    
    color: '#05375a',
    borderColor: "lightgrey",
    borderWidth: 1

  },
  button:{
    alignItems: 'center',
    marginTop: 30
  },
  singIn:{
    
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    
  },
  req_panel:{
    flexDirection: 'row',
    paddingBottom:20,
    
  },
  fav_panel:{
    justifyContent: "center",
    alignItems:"center",
    flexDirection: "row",
    width: "100%",
    paddingBottom:20,
    
  },
  starch:{
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    
    margin: 5,
    

  },
  perf:{
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    
    margin: 5,

  },
  todo_btns:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom:20,
  },
  date_pickers:{
    width: '100%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    paddingBottom:20,
  },
  nav_btn:{
    flexDirection :"row",
    justifyContent: "center",
    alignItems: "center",
    width:"100%"
  },
  message:{
    flex:1,
    width: '100%',
    paddingBottom:20,
  },
  border:{
    
    marginLeft: 10,
    marginRight: 10,
  },

  dotted_hr:{
    
    width: '100%',
    borderStyle: "dotted",
    borderStartColor: "red",
    borderEndColor: "blue",
    borderColor:"lightgrey",
    borderWidth: 1,
    marginBottom: 20,
    
  },
  contact:{
    flexDirection: 'column'
  },
  list:{
    
    flexDirection: "column",
    marginBottom: 20,
  },
  sub:{
    
    
    marginLeft: 20,
    color: 'gray'
  },
  title:{
    
    color: '#05375a',
    fontWeight: 'bold',
    fontSize: 18  },
    clothes_text:{
      color: '#05375a',
      fontWeight: 'bold',
      fontSize: 20
  
    },
    price_text:{
      color: '#05375a',
      fontWeight: 'bold',
      fontSize: 20
  
    },
    clothes_body:{
      marginLeft: 20, 
      marginRight:20
    },
    price_body:{
      marginLeft: 20, 
      marginRight:20
    },
    laundry_container:{
      flexDirection: 'column',
      width: '100%'
      
    },
    laundry_list:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    ltextv:{
      flex: 1,
      margin: 5,
    },
    ltext:{
      color: '#05375a',
      textAlign: "center"
  
    },
    price:{
      color: "#4dc2f8"
    },
    clothes:{
      color: "#4dc2f8"
    }
    


  


  

  

 
  
});