import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { ScrollView } from 'react-native'
import { color, Value } from 'react-native-reanimated'
import { useIsFocused } from '@react-navigation/native'
import { getData, storeData } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'

export default function Indentitas({ navigation }) {

  const [kirim, setKirim] = useState({});

  const isFocus = useIsFocused();
  useEffect(() => {

    if (isFocus) {
      __getData();
    }

  }, [isFocus]);

  const sendData = () => {
    console.log(kirim);
    storeData('user', kirim);
    showMessage({
      type: 'success',
      icon: 'success',
      message: 'Data berhasil di simpan !'
    });
    navigation.goBack();
  }

  const __getData = () => {
    getData('user').then(res => {
      console.log(res)
      setKirim(res)
    })
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Identitas" />
      <ScrollView>
        <View style={{
          padding: 20
        }}>

          <MyInput
            value={kirim.nama_lengkap}
            onChangeText={x => setKirim({ ...kirim, nama_lengkap: x })}
            label="Nama Lengkap"
            placeholder="Belum diisi"
          />

          <MyGap jarak={20} />

          <MyCalendar label="Tanggal Lahir" value={kirim.tanggal_lahir}
            onDateChange={x => setKirim({ ...kirim, tanggal_lahir: x })} />

          <MyGap jarak={20} />

          <MyPicker

            value={kirim.golongan_darah}
            onValueChange={x => setKirim({ ...kirim, golongan_darah: x })}
            label="Golongan  Darah"
            data={[
              { label: "A+", value: "A+" },
              { label: "B+", value: "B+" },
              { label: "AB+", value: "AB+" },
              { label: "O+", value: "O+" },
              { label: "A-", value: "A-" },
              { label: "B-", value: "B-" },
              { label: "AB-", value: "AB-" },
              { label: "O-", value: "O-" },
            ]}
          />


          <MyGap jarak={20} />

          <MyInput
            value={kirim.riwayat_alergi}
            onChangeText={x => setKirim({ ...kirim, riwayat_alergi: x })}
            label="Riwayat Alergi"
            placeholder="Isi disini"
          />

          <MyGap jarak={20} />

          <MyInput
            value={kirim.riwayat_penyakit_terdahulu}
            onChangeText={x => setKirim({ ...kirim, riwayat_penyakit_terdahulu: x })}
            label="Riwayat Penyakit Terdahulu"
            placeholder="Isi disini"
          />


        </View>
      </ScrollView>

      <View style={{
        padding: 20,

      }}>
        <MyButton title="Simpan" onPress={sendData} colorText={colors.primary}

        />
      </View>
    </SafeAreaView>
  )
}