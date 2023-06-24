import { ImageBackground } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { StyleSheet, View, Image, Text } from 'react-native';

import backgroundImg from '../../assets/img/background.jpg';
import { TouchableOpacity } from 'react-native';
import SvgAddButton from '../../assets/svg/SvgAddButton';
import { Dimensions } from 'react-native';
import { useState } from 'react';

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(null);

  const onLoadAvatar = async () => {
    const avatarImg = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });

    if (avatarImg.type === 'cancel') return setAvatar(null);

    setAvatar(avatarImg);
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.bgContainer}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.avatarWrapper}>
            <Image style={styles.avatar} source={avatar} />
            <TouchableOpacity
              style={avatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar}
              onPress={onLoadAvatar}
            >
              <SvgAddButton style={avatar ? styles.btnAddAvatarSvgLoad : styles.btnAddAvatarSvg} />
            </TouchableOpacity>
          </View>
          <Text style={{ ...styles.title, marginTop: 92 }}>Name</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: 16,
    // paddingVertical: 32,
    // backgroundColor: '#fff',
  },

  bgContainer: {
    // flexDirection: 'row',
    // alignItems: 'flex-start',

    resizeMode: 'cover',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  contentWrapper: {
    paddingHorizontal: 16,

    width: '100%',
    height: '100%',
    marginTop: 247,

    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',

    marginTop: 32,
    marginBottom: 32,
    color: '#212121',
  },
  avatarWrapper: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',

    width: 120,
    height: 120,

    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,

    alignItems: 'center',
    alignContent: 'center',

    width: 25,
    height: 25,

    color: '#ff6c00',
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
  btnAddAvatarLoad: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,

    alignItems: 'center',
    alignContent: 'center',

    width: 25,
    height: 25,

    color: '#ff6c00',
    backgroundColor: '#ffffff',
    borderRadius: 50,

    transform: [{ rotate: '45deg' }],
  },
  btnAddAvatarSvg: {
    fill: '#ff6c00',
    stroke: '#ff6c00',
    backgroundColor: '#ffffff',
  },
  btnAddAvatarSvgLoad: {
    fill: '#bdbdbd',
    stroke: '#e8e8e8',
    backgroundColor: '#ffffff',
  },
});
