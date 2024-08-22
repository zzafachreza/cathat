import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { ScrollView } from 'react-native'
import { color, Value } from 'react-native-reanimated'

export default function Indentitas({navigation}) {
  return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor:colors.white
    }}>
    <MyHeader title="Identitas"/>
      <ScrollView>
        <View style={{
            padding:20
        }}>

            <MyInput 
                label="Nama Lengkap"
                placeholder="Belum diisi"
            />

            <MyGap jarak={20}/> 

            <MyCalendar label="Tanggal Lahir"/>

            <MyGap jarak={20}/> 

            <MyPicker 
                label="Golongan  Darah"
                data={[
                    {label: "A+", Value: "A+"},
                    {label: "B+", Value: "B+"},
                    {label: "AB+", Value: "AB+"},
                    {label: "O+", Value: "O+"},
                    {label: "A-", Value: "A-"},
                    {label: "B-", Value: "B-"},
                    {label: "AB-", Value: "AB-"},
                    {label: "O-", Value: "O-"},
                ]}
            />

            
            <MyGap jarak={20}/> 

            <MyInput
                label="Riwayat Elergi"
                placeholder="Isi disini"
            />

            <MyGap jarak={20}/> 

            <MyInput
                label="Riwayat Penyakit Terdahulu"
                placeholder="Isi disini"
            />
            

        </View>
      </ScrollView>

      <View style={{
        padding:20,

      }}>
            <MyButton title="Simpan" colorText={colors.primary}
                
            />
      </View>
    </SafeAreaView>
  )
}