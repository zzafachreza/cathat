import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyTimePicker } from '../../components'
import { useIsFocused } from '@react-navigation/native';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { maskJs, maskCurrency } from 'mask-js';

export default function AddGula({ navigation, route }) {

    const tipe = route.params;

    const [data, setData] = useState([]);
    const isFocus = useIsFocused();
    const __getData = () => {
        getData('gula_darah').then(res => {
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
        gds: '',
        gdp: '',
        tanggal: moment().format('YYYY-MM-DD'),
        hba1c: '',
    });

    const sendData = () => {


        if (kirim.gds.length == 0) {
            showMessage({ message: 'gds wajib di isi!' })
        } else {



            if (route.params.tipe == 'EDIT') {
                let TMP = [...data];
                let IDX = TMP.map(i => i.id).indexOf(kirim.id);
                TMP[IDX] = {
                    id: kirim.id,
                    gds: kirim.gds,
                    gdp: kirim.gdp,
                    tanggal: kirim.tanggal,
                    hba1c: kirim.hba1c,

                }
                setData(TMP);
                storeData('gula_darah', TMP);
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
                    gds: kirim.gds,
                    gdp: kirim.gdp,
                    tanggal: kirim.tanggal,
                    hba1c: kirim.hba1c,
                });
                setData(TMP);
                storeData('gula_darah', TMP);
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
            <MyHeader title="Gula" />
            <ScrollView>
                <View style={{
                    padding: 20,


                }}>
                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.gds}
                        onChangeText={x => setKirim({ ...kirim, gds: x })}
                        label="GDS"
                        placeholder="Isi disini"
                        rightLabel="mg/dL"

                    />

                    <MyGap jarak={10} />


                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.gdp}
                        onChangeText={x => setKirim({ ...kirim, gdp: x })}
                        label="GDP"
                        placeholder="Isi disini"
                        rightLabel="mg/dL"

                    />

                    <MyGap jarak={10} />

                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.hba1c}
                        onChangeText={x => setKirim({ ...kirim, hba1c: x })}
                        label="HbA1C"
                        placeholder="Isi disini"
                        rightLabel="%"

                    />

                    <MyGap jarak={10} />

                    <MyCalendar value={kirim.tanggal}
                        onDateChange={x => setKirim({ ...kirim, tanggal: x })}

                        label="Tanggal" placeholder="Pilih tanggal" />

                    <MyGap jarak={10} />




                    <MyGap jarak={20} />
                </View>
            </ScrollView>

            <View style={{ padding: 20 }}>
                <MyButton title="Simpan" onPress={sendData} />
            </View>
        </View>
    )
}