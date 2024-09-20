import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { MyHeader } from '../../components'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { useIsFocused } from '@react-navigation/native'
import { getData, MYAPP, storeData } from '../../utils/localStorage'
import moment from 'moment'
import ImageView from "react-native-image-viewing";

export default function EKG({ navigation }) {


  const [data, setData] = useState([]);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getData();
    }
  }, [isFocus]);

  const __getData = () => {
    getData('ekg').then(res => {
      if (!res) {
        setData([]);
        storeData('ekg', []);
      } else {
        console.log(res)
        setData(res);
      }
    })
  }

  const [buka, setBuka] = useState(false);
  const [gambar, setGambar] = useState('')

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      {!buka &&
        <>
          <MyHeader title="EKG" />

          <View style={{
            flex: 1,
            padding: 10,
          }}>
            <FlatList data={data} renderItem={({ item, index }) => {
              return (
                <View style={{
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.border
                }}>
                  <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',

                  }}>
                    <Text style={{
                      ...fonts.body3,
                      flex: 1,
                    }}>Tanggal</Text>
                    <Text style={{
                      ...fonts.body3,
                    }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                  </View>
                  <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',

                  }}>
                    <Text style={{
                      ...fonts.body3,
                      flex: 1,
                    }}>Judul</Text>
                    <Text style={{
                      ...fonts.body3,
                    }}>{item.judul}</Text>
                  </View>
                  <View style={{

                  }}>
                    <Text style={{
                      ...fonts.body3,
                      flex: 1,
                    }}>gambar</Text>
                    <TouchableOpacity onPress={() => {
                      setBuka(true);
                      setGambar(item.gambar)
                    }}>
                      <Image style={{
                        width: '100%',
                        height: 250,
                        resizeMode: 'contain'
                      }} source={{
                        uri: item.gambar
                      }} />
                    </TouchableOpacity>
                  </View>



                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                  }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddEkg', {
                      tipe: 'EDIT',
                      data: item
                    })} style={{
                      padding: 10,
                    }}>
                      <Icon type='ionicon' name='create' color={colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                      { text: 'Tidak', },
                      {
                        text: 'Ya, Hapus',
                        onPress: () => {
                          let tmp = data.filter(i => i.id !== item.id);
                          console.log('filter', tmp);
                          setData(tmp);
                          storeData('ekg', tmp);

                        }
                      }
                    ])} style={{
                      padding: 10,
                    }}>
                      <Icon type='ionicon' name='trash' color={colors.danger} />
                    </TouchableOpacity>
                  </View>

                </View>
              )
            }} />
          </View>
          <View style={{
            paddingBottom: 20,
            paddingHorizontal: 20,
            alignItems: 'flex-end'
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('AddEkg', {
              tipe: 'ADD',
              data: {}
            })} style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary
            }}>
              <Icon type='ionicon' name='add' size={40} color={colors.white} />
            </TouchableOpacity>
          </View>
        </>

      }

      {/* {buka &&

        <View style={{
          flex: 1,
          position: 'relative'
        }}>
          <Image style={{
            marginTop: 10,
            width: windowWidth,
            height: windowHeight,
            resizeMode: 'contain'
          }} source={{
            uri: gambar
          }} />
          <TouchableOpacity onPress={() => setBuka(false)} style={{
            padding: 10,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
            <Icon type='ionicon' color={colors.primary} size={50} name='close-circle' />
          </TouchableOpacity>
        </View>

      } */}

      <ImageView
        images={[{ uri: gambar }]}
        imageIndex={0}
        visible={buka}
        onRequestClose={() => setBuka(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})