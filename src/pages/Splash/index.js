import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData, storeData } from '../../utils/localStorage';
import moment from 'moment';

export default function Splash({ navigation }) {
  const img = new Animated.Value(0.5);
  const textScale = new Animated.Value(0.5);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textScale, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      })
    ]).start();


    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('MulaiPage');
          storeData('user', {
            nama_lengkap: '',
            tanggal_lahir: moment().format('YYYY-MM-DD'),
            golongan_darah: 'A+',
            riwayat_alergi: '',
            riwayat_penyakit_terdahulu: ''


          })
        } else {
          navigation.replace('MulaiPage')
        }
      })
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.white,
      justifyContent: 'center',
      position: 'relative'
    }}>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%'
      }}>

        <Animated.Image
          source={require('../../assets/logo.png')}
          resizeMode="contain"
          style={{
            transform: [{ scale: img }],
            width: windowWidth / 1.4,
            height: windowWidth / 1.4,
            marginTop: '30%'

          }}
        />


        <ActivityIndicator style={{ marginTop: 50 }} color={colors.primary} size="small" />

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
