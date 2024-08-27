import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyTimePicker } from '../../components'
import { useIsFocused } from '@react-navigation/native';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { maskJs, maskCurrency } from 'mask-js';

export default function AddLipid({ navigation, route }) {

    const tipe = route.params;

    const [data, setData] = useState([]);
    const isFocus = useIsFocused();
    const __getData = () => {
        getData('profil_lipid').then(res => {
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
        kolesterol_total: '',
        lipid_tg: '',
        tanggal: moment().format('YYYY-MM-DD'),
        lipid_hdl: '',
        lipid_ldl: '',
    });

    const sendData = () => {


        if (kirim.kolesterol_total.length == 0) {
            showMessage({ message: 'kolesterol_total wajib di isi!' })
        } else if (kirim.lipid_tg.length == 0) {
            showMessage({ message: 'lipid_tg wajib di isi!' })
        } else {



            if (route.params.tipe == 'EDIT') {
                let TMP = [...data];
                let IDX = TMP.map(i => i.id).indexOf(kirim.id);
                TMP[IDX] = {
                    id: kirim.id,
                    kolesterol_total: kirim.kolesterol_total,
                    lipid_tg: kirim.lipid_tg,
                    tanggal: kirim.tanggal,
                    lipid_hdl: kirim.lipid_hdl,
                    lipid_ldl: kirim.lipid_ldl,

                }
                setData(TMP);
                storeData('profil_lipid', TMP);
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
                    kolesterol_total: kirim.kolesterol_total,
                    lipid_tg: kirim.lipid_tg,
                    tanggal: kirim.tanggal,
                    lipid_hdl: kirim.lipid_hdl,
                    lipid_ldl: kirim.lipid_ldl
                });
                setData(TMP);
                storeData('profil_lipid', TMP);
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
            <MyHeader title="Profil Lipid" />
            <ScrollView>
                <View style={{
                    padding: 20,


                }}>
                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.kolesterol_total}
                        onChangeText={x => setKirim({ ...kirim, kolesterol_total: x })}
                        label="Kolesterol Total"
                        placeholder="Isi disini"
                        rightLabel="mg/dL"

                    />

                    <MyGap jarak={10} />


                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.lipid_tg}
                        onChangeText={x => setKirim({ ...kirim, lipid_tg: x })}
                        label="TG"
                        placeholder="Isi disini"
                        rightLabel="mg/dL"

                    />

                    <MyGap jarak={10} />

                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.lipid_hdl}
                        onChangeText={x => setKirim({ ...kirim, lipid_hdl: x })}
                        label="HDL"
                        placeholder="Isi disini"
                        rightLabel="mg/dL"

                    />
                    <MyGap jarak={10} />

                    <MyInput
                        keyboardType='number-pad'
                        value={kirim.lipid_ldl}
                        onChangeText={x => setKirim({ ...kirim, lipid_ldl: x })}
                        label="LDL"
                        placeholder="Isi disini"
                        rightLabel="mg/dL"

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