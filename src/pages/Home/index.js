import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import MyCarouser from '../../components/MyCarouser';
import { Icon } from 'react-native-elements';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 4,
        height: windowWidth / 4,
      }}>
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: 12,
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 5, height: windowWidth / 5,
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  useEffect(() => {
    __getUser();
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
    
    <ScrollView>


    {/* HEADER */}
    <View style={{padding:20, backgroundColor:colors.primary, borderBottomLeftRadius:50, borderBottomRightRadius:50,
      flexDirection:"row", justifyContent:'space-between', height:200, 
      }}>
      <View style={{
        
      }}>
        <Text style={{
          fontFamily:fonts.primary[500],
          color:colors.white,
          fontSize:36,

        }}>CATHAT</Text>
        <Text style={{
          fontFamily:fonts.primary[500],
          fontSize:15,
          color:colors.white,
          top: -15

        }}>Catatan Kesehatan</Text>
      </View>
      
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        top: -50
      }}>
        <TouchableWithoutFeedback>
          <View >
            <Image style={{
              width:16,
              height:18, 
            }} source={require('../../assets/logout.png')}/>
          </View>
        </TouchableWithoutFeedback>
      </View>


         
    </View>
    {/* END HEADERS */}

                <View style={{padding:10, }}>
                  {/* Sldier */}
                  
                  <View style={{alignItems:"center"}}>
                    <Image style={{
                      width:326,
                      height:161,
                      marginTop: -100,


                    }} source={require("../../assets/slider_1.png")}/>
                  </View>

                  <MyGap jarak={5}/>

                    <View style={{marginTop:'5%', padding:20,}}>
                    <View style={{flexDirection:"column", }}> 
                      <TouchableWithoutFeedback onPress={() => navigation.navigate('Identitas')}>
                        <View style={{padding:10, backgroundColor:colors.secondary, borderRadius:10,
                          flexDirection:"row", justifyContent:"center", borderWidth:2,
                          borderColor:Color.blueGray[400]
                        }}> 
                          <Image style={{
                            width:45,
                            height:45,
                            right:70,
                            top:4
                          }} source={require('../../assets/icon_identitas.png')}/>

                          <Text style={{
                            fontFamily:fonts.primary[500],
                            fontSize:20,
                            color:colors.primary, 
                            top:3,
                            right:55
                            

                          }}>Identitas</Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <MyGap jarak={10}/>


                      <TouchableWithoutFeedback onPress={() => navigation.navigate('HasilTekananDarah')}>
                        <View style={{padding:10, backgroundColor:colors.secondary, borderRadius:10,
                          flexDirection:"row", justifyContent:"center", borderWidth:2,
                          borderColor:Color.blueGray[400]
                        }}> 
                          <Image style={{
                            width:45,
                            height:45,
                            right:40,
                            top:4,

                          }} source={require('../../assets/icon_tekanandarah.png')}/>

                          <Text style={{
                            fontFamily:fonts.primary[500],
                            fontSize:20,
                            color:colors.primary, 
                            top:3,
                            right:25,

                          }}>Hasil Tekanan{'\n'}Darah</Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <MyGap jarak={10}/>
                      

                      <TouchableWithoutFeedback onPress={() => navigation.navigate("SubRiwayatPemeriksaanLaboratorium")}>
                        <View style={{padding:10, backgroundColor:colors.secondary, borderRadius:10,
                          flexDirection:"row", justifyContent:"center", borderWidth:2,
                          borderColor:Color.blueGray[400]
                        }}> 
                          <Image style={{
                            width:45,
                            height:45,
                            right:0,
                            top:4
                          }} source={require('../../assets/icon_pemeriksaanlabo.png')}/>

                          <Text style={{
                            fontFamily:fonts.primary[500],
                            fontSize:20,
                            color:colors.primary, 
                            top:3,
                            left: 10

                          }}>Riwayat Pemeriksaan{'\n'}Laboratorium</Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <MyGap jarak={10}/>
                      

                      <TouchableWithoutFeedback onPress={() => navigation.navigate("RiwayatPemeriksaanRadiologis")}>
                        <View style={{padding:10, backgroundColor:colors.secondary, borderRadius:10,
                          flexDirection:"row", justifyContent:"center", borderWidth:2,
                          borderColor:Color.blueGray[400]
                        }}> 
                          <Image style={{
                            width:45,
                            height:45,
                            right:0,
                            top:4
                          }} source={require('../../assets/icon_pemeriksaanradio.png')}/>

                          <Text style={{
                            fontFamily:fonts.primary[500],
                            fontSize:20,
                            color:colors.primary, 
                            top:3,
                            left:6

                          }}>Riwayat Pemeriksaan{'\n'}Radiologis</Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <MyGap jarak={10}/>
                      

                      <TouchableWithoutFeedback onPress={() => navigation.navigate("RiwayatObat")}>
                        <View style={{padding:10, backgroundColor:colors.secondary, borderRadius:10,
                          flexDirection:"row", justifyContent:"center", borderWidth:2,
                          borderColor:Color.blueGray[400]
                        }}> 
                          <Image style={{
                            width:45,
                            height:45,
                            left: -45,
                            top:4
                          }} source={require('../../assets/icon_riwayatobat.png')}/>

                          <Text style={{
                            fontFamily:fonts.primary[500],
                            fontSize:20,
                            color:colors.primary, 
                            top:3,
                            left: -40

                          }}>Riwayat Obat</Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <MyGap jarak={10}/>
                      

                      <TouchableWithoutFeedback onPress={() => navigation.navigate("EKG")}>
                        <View style={{padding:10, backgroundColor:colors.secondary, borderRadius:10,
                          flexDirection:"row", justifyContent:"center", borderWidth:2,
                          borderColor:Color.blueGray[400]
                        }}> 
                          <Image style={{
                            width:45,
                            height:45,
                            right:95,
                            top:4
                          }} source={require('../../assets/icon_ekg.png')}/>

                          <Text style={{
                            fontFamily:fonts.primary[500],
                            fontSize:20,
                            color:colors.primary, 
                            top:3,
                            right:85

                          }}>EKG</Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <MyGap jarak={10}/>
                      
                    </View>
                    
                    </View>
       
                </View>

    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})