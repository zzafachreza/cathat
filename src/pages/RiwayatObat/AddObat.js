import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyTimePicker } from '../../components'
import { useIsFocused } from '@react-navigation/native';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { maskJs, maskCurrency } from 'mask-js';

export default function AddObat({ navigation, route }) {

    const tipe = route.params;

    const [data, setData] = useState([]);
    const isFocus = useIsFocused();
    const __getData = () => {
        getData('obat').then(res => {
            if (!res) {
                setData([])
            } else {
                setData(res)
            }
        })
    }


    useEffect(() => {
        if (isFocus) {
            if (route.params.tipe == 'EDIT') {
                setKirim(route.params.data);
            }
            __getData();
        }
    }, [isFocus])


    const [kirim, setKirim] = useState({
        id: moment().format('YYYYMMDDHHmmss_TD'),
        nama_obat: '',
        dosis: '',
        tanggal: moment().format('YYYY-MM-DD'),
        keterangan: '',
    });

    const sendData = () => {


        if (kirim.nama_obat.length == 0) {
            showMessage({ message: 'Nama Obat wajib di isi!' })
        } else if (kirim.dosis.length == 0) {
            showMessage({ message: 'Dosis wajib di isi!' })
        } else {



            if (route.params.tipe == 'EDIT') {
                let TMP = [...data];
                let IDX = TMP.map(i => i.id).indexOf(kirim.id);
                TMP[IDX] = {
                    id: kirim.id,
                    nama_obat: kirim.nama_obat,
                    dosis: kirim.dosis,
                    tanggal: kirim.tanggal,
                    keterangan: kirim.keterangan,

                }
                setData(TMP);
                storeData('obat', TMP);
                showMessage({
                    type: 'success',
                    icon: 'success',
                    message: 'Data berhasil di simpan !'
                });
                navigation.goBack();

            } else {
                let TMP = [...data];
                TMP.push({
                    id: kirim.id,
                    nama_obat: kirim.nama_obat,
                    dosis: kirim.dosis,
                    tanggal: kirim.tanggal,
                    keterangan: kirim.keterangan,
                });
                setData(TMP);
                storeData('obat', TMP);
                showMessage({
                    type: 'success',
                    icon: 'success',
                    message: 'Data berhasil di simpan !'
                });
                navigation.goBack();
            }



        }

    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Riwayat Obat" />
            <ScrollView>
                <View style={{
                    padding: 20,


                }}>
                    <MyInput

                        value={kirim.nama_obat}
                        onChangeText={x => setKirim({ ...kirim, nama_obat: x })}
                        label="Nama Obat"
                        placeholder="Isi disini"


                    />

                    <MyGap jarak={10} />


                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.dosis}
                        onChangeText={x => setKirim({ ...kirim, dosis: x })}
                        label="Dosis"
                        placeholder="Isi disini"

                    />

                    <MyGap jarak={10} />

                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.keterangan}
                        onChangeText={x => setKirim({ ...kirim, keterangan: x })}
                        label="keterangan"
                        placeholder="Isi disini"


                    />






                    <MyGap jarak={20} />
                </View>
            </ScrollView>

            <View style={{ padding: 20 }}>
                <MyButton title="Simpan" onPress={sendData} />
            </View>
        </View>
    )
}