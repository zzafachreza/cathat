import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyTimePicker } from '../../components'
import { useIsFocused } from '@react-navigation/native';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { maskJs, maskCurrency } from 'mask-js';

export default function TambahTekananDarah({ navigation, route }) {

    const tipe = route.params;

    const [data, setData] = useState([]);
    const isFocus = useIsFocused();
    const __getData = () => {
        getData('tekanan_darah').then(res => {
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
        sistolik: '',
        diastolik: '',
        tanggal: moment().format('YYYY-MM-DD'),
        waktu: '',
    });

    const sendData = () => {


        if (kirim.sistolik.length == 0) {
            showMessage({ message: 'Sistolik wajib di isi!' })
        } else if (kirim.diastolik.length == 0) {
            showMessage({ message: 'Diastolik wajib di isi!' })
        } else {
            let hasilStatus = '';
            // if ((kirim.sistolik >= 90 && kirim.sistolik <= 140) && (kirim.diastolik >= 60 && kirim.diastolik <= 90)) {
            //     hasilStatus = 'Normal';
            // } else if (kirim.sistolik < 90 && kirim.diastolik < 60) {
            //     hasilStatus = 'Hipotensi';
            // } else if (kirim.sistolik > 140) {
            //     hasilStatus = 'Hipertensi';
            // } else if (kirim.diastolik < 90) {
            //     hasilStatus = 'Hipotensi';
            // } else if (kirim.sistolik > 140 && kirim.diastolik > 90) {
            //     hasilStatus = 'Hipertensi';
            // } else if (kirim.sistolik >= 90 && kirim.sistolik <= 140) {
            //     hasilStatus = 'Normal';
            // } else if (kirim.diastolik >= 60 && kirim.diastolik <= 90) {
            //     hasilStatus = 'Normal';
            // }

            if ((kirim.sistolik >= 130 && kirim.sistolik <= 139) || (kirim.diastolik >= 80 && kirim.diastolik <= 89)) {
                hasilStatus = 'Prehipertensi';
            } else if (kirim.sistolik >= 140 || kirim.diastolik >= 90) {
                hasilStatus = 'Hipertensi';
            } else {
                hasilStatus = 'Normal';
            }



            if (route.params.tipe == 'EDIT') {
                let TMP = [...data];
                let IDX = TMP.map(i => i.id).indexOf(kirim.id);
                TMP[IDX] = {
                    id: kirim.id,
                    sistolik: kirim.sistolik,
                    diastolik: kirim.diastolik,
                    tanggal: kirim.tanggal,
                    waktu: kirim.waktu,
                    hasil: hasilStatus
                }
                setData(TMP);
                storeData('tekanan_darah', TMP);
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
                    sistolik: kirim.sistolik,
                    diastolik: kirim.diastolik,
                    tanggal: kirim.tanggal,
                    waktu: kirim.waktu,
                    hasil: hasilStatus
                });
                setData(TMP);
                storeData('tekanan_darah', TMP);
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
            <MyHeader title="Tambah Tekanan Darah" />
            <ScrollView>
                <View style={{
                    padding: 20,


                }}>
                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.sistolik}
                        onChangeText={x => setKirim({ ...kirim, sistolik: x })}
                        label="Tekanan Darah Sistolik"
                        placeholder="Isi disini"
                        rightLabel="mmHg"

                    />

                    <MyGap jarak={10} />


                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.diastolik}
                        onChangeText={x => setKirim({ ...kirim, diastolik: x })}
                        label="Tekanan Darah Diastolik"
                        placeholder="Isi disini"
                        rightLabel="mmHg"

                    />

                    <MyGap jarak={10} />

                    <MyCalendar value={kirim.tanggal}
                        onDateChange={x => setKirim({ ...kirim, tanggal: x })}

                        label="Tanggal" placeholder="Pilih tanggal" />

                    <MyGap jarak={10} />


                    <MyInput

                        keyboardType='number-pad'
                        value={kirim.waktu}
                        maxLength={5}
                        onChangeText={x => {

                            setKirim({ ...kirim, waktu: maskJs('99:99', x) })
                        }}
                        label="Waktu"
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