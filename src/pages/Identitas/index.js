import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { ScrollView } from 'react-native'
import { color, Value } from 'react-native-reanimated'
import { useIsFocused } from '@react-navigation/native'
import { getData, MYAPP, storeData } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

export default function Indentitas({ navigation }) {

  const [kirim, setKirim] = useState({});

  const isFocus = useIsFocused();
  useEffect(() => {

    if (isFocus) {
      __getData();
    }

  }, [isFocus]);

  const sendData = () => {
    Alert.alert(MYAPP, 'Apakah kamu yakin akan menyimpan ini ?', [
      { text: 'TIDAK' },
      {
        text: 'YA, SIMPAN',

        onPress: () => {
          console.log(kirim);
          storeData('user', kirim);
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Data berhasil di simpan !'
          });
          navigation.goBack();
        }
      }
    ])
  }

  const __getData = () => {
    getData('user').then(res => {
      console.log(res)
      setKirim(res)
    })
  }

  const [editable, setEditable] = useState(false);

  const MyList = ({ label, value }) => {
    return (
      <View style={{
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Color.blueGray[300],
        paddingVertical: 5,
      }}>
        <Text style={{
          ...fonts.subheadline3,
          color: colors.primary,
          marginBottom: 8,
        }}>{label}</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: 15,
        }}>{value}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Identitas" onPress={() => {
        if (!editable) {
          navigation.goBack();
        } else {
          setEditable(false);
        }
      }} />
      <ScrollView>
        {editable &&

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

            <Text style={{
              marginTop: 10,
              ...fonts.subheadline3,
              color: colors.primary,
            }}>Usia {moment().diff(kirim.tanggal_lahir, 'years')} Tahun</Text>

            <MyGap jarak={20} />

            <MyPicker

              value={kirim.golongan_darah}
              onValueChange={x => setKirim({ ...kirim, golongan_darah: x })}
              label="Golongan Darah"
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

        }

        {
          !editable &&

          <View style={{
            padding: 20
          }}>
            <MyList value={kirim.nama_lengkap} label="Nama Lengkap" />
            <MyList value={moment(kirim.tanggal_lahir).format('dddd, DD MMMM YYYY')} label="Tanggal Lahir" />
            <MyList value={moment().diff(kirim.tanggal_lahir, 'years') + ' Tahun'} label="Usia" />
            <MyList value={kirim.golongan_darah} label="Golongan Darah" />
            <MyList value={kirim.riwayat_alergi} label="Riwayat Alergi" />
            <MyList value={kirim.riwayat_penyakit_terdahulu} label="Riwayat Penyakit Terdahulu" />
          </View>

        }
      </ScrollView>

      <View style={{
        padding: 20,

      }}>
        {editable && <MyButton title="Simpan" onPress={sendData} colorText={colors.primary} />}

        {!editable && <MyButton title="Edit Identitas" onPress={() => setEditable(true)} colorText={colors.primary} />}




      </View>
    </SafeAreaView>
  )
}