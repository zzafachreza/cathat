import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Icon } from 'react-native-elements';
import { colors, Color } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MYAPP } from '../../utils/localStorage';

export default function FileUpload({ label, iconname = 'cloud-upload', onFileSelected }) {
  const [fileName, setFileName] = useState(null);

  const pickDocument = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {


        Alert.alert(MYAPP, 'Pilih ambil gambar', [
          { text: 'BATAL' },
          {
            text: 'GALERI',
            onPress: () => {
              launchImageLibrary({
                includeBase64: false,
                quality: 1,
                mediaType: "photo",
                maxWidth: 500,
                maxHeight: 500
              }, response => {
                // console.log('All Response = ', response.assets[0].uri);
                if (!response.didCancel) {
                  setFileName(response.assets[0].fileName);
                  onFileSelected(response.assets[0]);
                }


              });
            }
          },
          {
            text: 'KAMERA',
            onPress: () => {
              launchCamera({
                includeBase64: false,
                quality: 1,
                mediaType: "photo",
                maxWidth: 500,
                maxHeight: 500
              }, response => {
                // console.log('All Response = ', response.assets[0].uri);
                if (!response.didCancel) {
                  setFileName(response.assets[0].fileName);
                  onFileSelected(response.assets[0]);
                }


              })
            }
          }
        ])


      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    // try {
    //   const result = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.allFiles],
    //   });
    //   setFileName(result[0].name);
    //   if (onFileSelected) {
    //     onFileSelected(result[0]);
    //   }
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     console.log('User cancelled the document picker');
    //   } else {
    //     throw err;
    //   }
    // }


  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{
        ...fonts.subheadline3,
        color: colors.primary,
        marginBottom: 8,
      }}>{label}</Text>
      <TouchableOpacity onPress={pickDocument} style={styles.uploadContainer}>
        <View style={styles.iconContainer}>
          <Icon type='ionicon' name={iconname} color={Color.blueGray[300]} size={24} />
        </View>
        <Text style={styles.fileName}>
          {fileName ? fileName : 'Pilih File'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Color.blueGray[300],
    backgroundColor: 'white',
    paddingLeft: 12,
  },
  iconContainer: {
    marginRight: 10,
  },
  fileName: {
    ...fonts.body3,
    color: Color.blueGray[900],
    flex: 1,
  },
});
