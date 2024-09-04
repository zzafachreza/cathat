import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, windowHeight, windowWidth } from '../../utils'
import { FileUpload, MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyTimePicker } from '../../components'
import { useIsFocused } from '@react-navigation/native';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { maskJs, maskCurrency } from 'mask-js';
import { Icon } from 'react-native-elements';

export default function AddRadio({ navigation, route }) {

    const tipe = route.params;

    const [data, setData] = useState([]);
    const isFocus = useIsFocused();
    const __getData = () => {
        getData('radiologis').then(res => {
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
        judul: '',
        tanggal: moment().format('YYYY-MM-DD'),
        gambar: '',
    });

    const sendData = () => {


        if (kirim.judul.length == 0) {
            showMessage({ message: 'judul wajib di isi!' })
        } else {



            if (route.params.tipe == 'EDIT') {
                let TMP = [...data];
                let IDX = TMP.map(i => i.id).indexOf(kirim.id);
                TMP[IDX] = {
                    id: kirim.id,
                    judul: kirim.judul,
                    tanggal: kirim.tanggal,
                    gambar: kirim.gambar,

                }
                setData(TMP);
                storeData('radiologis', TMP);
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
                    judul: kirim.judul,
                    gambar: kirim.gambar,
                });
                setData(TMP);
                storeData('radiologis', TMP);
                showMessage({
                    type: 'success',
                    icon: 'success',
                    message: 'Data berhasil di simpan !'
                });
                navigation.goBack();
            }



        }

    }

    const [buka, setBuka] = useState(false);
    const [gambar, setGambar] = useState('');

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            {!buka &&

                <>

                    <MyHeader title="Riwayat Pemeriksaan Radiologis" />
                    <ScrollView>
                        <View style={{
                            padding: 20,


                        }}>
                            <MyInput

                                value={kirim.judul}
                                onChangeText={x => setKirim({ ...kirim, judul: x })}
                                label="Judul"
                                placeholder="Isi disini"

                            />

                            <MyGap jarak={10} />


                            <FileUpload label="Upload File" value={kirim.gambar} onFileSelected={x => {
                                setKirim({
                                    ...kirim,
                                    gambar: x.uri
                                })
                            }} />
                            <Image style={{
                                marginTop: 10,
                                width: '100%',
                                height: 250,
                                resizeMode: 'contain'
                            }} source={{
                                uri: kirim.gambar
                            }} />






                            <MyGap jarak={20} />
                        </View>
                    </ScrollView>

                    <View style={{ padding: 20 }}>
                        <MyButton title="Simpan" onPress={sendData} />
                    </View>
                </>
            }


        </View>
    )
}