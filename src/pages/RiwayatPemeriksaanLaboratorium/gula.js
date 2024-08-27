import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { MyHeader } from '../../components'
import { Color, colors, fonts } from '../../utils'
import { useIsFocused } from '@react-navigation/native'
import { getData, MYAPP, storeData } from '../../utils/localStorage'
import moment from 'moment'

export default function HasilTekananDarah({ navigation }) {


  const [data, setData] = useState([]);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getData();
    }
  }, [isFocus]);

  const __getData = () => {
    getData('gula_darah').then(res => {
      if (!res) {
        setData([]);
        storeData('gula_darah', []);
      } else {
        console.log(res)
        setData(res);
      }
    })
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Gula" />

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
                }}>GDS</Text>
                <Text style={{
                  ...fonts.body3,
                }}>{item.gds} mg/dL</Text>
              </View>
              <View style={{
                alignItems: 'center',
                flexDirection: 'row',

              }}>
                <Text style={{
                  ...fonts.body3,
                  flex: 1,
                }}>GDP</Text>
                <Text style={{
                  ...fonts.body3,
                }}>{item.gdp} mg/dL</Text>
              </View>
              <View style={{
                alignItems: 'center',
                flexDirection: 'row',

              }}>
                <Text style={{
                  ...fonts.body3,
                  flex: 1,
                }}>HbA1C</Text>
                <Text style={{
                  ...fonts.body3,
                }}>{item.hba1c}%</Text>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
              }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddGula', {
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
                      storeData('gula_darah', tmp);

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
        <TouchableOpacity onPress={() => navigation.navigate('AddGula', {
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})