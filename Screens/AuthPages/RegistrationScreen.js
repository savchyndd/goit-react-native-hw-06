import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { authSignUpUser } from '../../redux/auth/authOperations';

import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import backgroundImg from '../../assets/img/background.jpg';
import SvgAddButton from '../../assets/svg/SvgAddButton';
import { useNavigation } from '@react-navigation/native';
import { authStateChange } from '../../redux/auth/authSlice';
import { getStorage } from 'firebase/storage';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  const [currentFocused, setCurrentFocused] = useState('');

  const clearUserForm = () => {
    setAvatar(null);
    setLogin(null);
    setEmail(null);
    setPassword(null);
  };

  const onSubmitUserRegister = async () => {
    // if (!login || !email || !password) return console.warn('Будь ласка заповніть поля');

    const photo = avatar
      ? await uploadImageToServer(avatar, 'avatars')
      : 'https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57';

    dispatch(authSignUpUser({ photo, login, email, password })).then(data => {
      if (data === undefined || !data.uid) {
        alert(`Реєстрацію не виконано!`);
        return;
      }
      dispatch(authStateChange({ stateChange: true }));
      console.log(data);
    });

    console.log({ login, email, password, photo });

    // dispatch(authStateChange({ stateChange: true }));

    // navigation.navigate('Home', { user: { login, email, password } });
    // handleKeyboardHide();
    // clearUserForm();
  };

  const onLoadAvatar = async () => {
    if (avatar) {
      setAvatar(null);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadImageToServer = async (imageUri, prefixFolder) => {
    const uniquePostId = Date.now().toString();

    if (imageUri) {
      try {
        const response = await fetch(imageUri);

        const file = await response.blob();

        const imageRef = await ref(myStorage, `${prefixFolder}/${uniquePostId}`);

        await uploadBytes(imageRef, file);

        const downloadURL = await getDownloadURL(imageRef);

        return downloadURL;
      } catch (error) {
        console.warn('uploadImageToServer: ', error);
      }
    }
  };

  const handleFocus = (currentFocusInput = '') => {
    setIsShowKeyboard(true);
    setCurrentFocused(currentFocusInput);
  };

  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    setCurrentFocused('');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ImageBackground source={backgroundImg} style={styles.bgContainer}>
          <View style={styles.contentWrapper}>
            <View style={styles.avatarWrapper}>
              <Image style={styles.avatar} source={{ uri: avatar }} />
              <TouchableOpacity
                style={avatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar}
                onPress={onLoadAvatar}
              >
                <SvgAddButton
                  style={avatar ? styles.btnAddAvatarSvgLoad : styles.btnAddAvatarSvg}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ ...styles.title, marginTop: 92 }}>Реєстрація</Text>
            <TextInput
              style={{
                ...styles.input,
                backgroundColor: currentFocused === 'login' ? '#ffffff' : '#f6f6f6',
                borderColor: currentFocused === 'login' ? '#ff6c00' : '#e8e8e8',
              }}
              placeholder="Логін"
              placeholderTextColor="#bdbdbd"
              autoComplete="username"
              autoCapitalize="none"
              value={login}
              onChangeText={setLogin}
              onFocus={() => handleFocus('login')}
            />
            <TextInput
              style={{
                ...styles.input,
                backgroundColor: currentFocused === 'email' ? '#ffffff' : '#f6f6f6',
                borderColor: currentFocused === 'email' ? '#ff6c00' : '#e8e8e8',
              }}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#bdbdbd"
              autoComplete="email"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleFocus('email')}
            />
            <View
              style={{
                ...styles.passWrapper,
                marginBottom: isShowKeyboard ? 159 : 43,
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  ...styles.inputLast,

                  backgroundColor: currentFocused === 'password' ? '#ffffff' : '#f6f6f6',
                  borderColor: currentFocused === 'password' ? '#ff6c00' : '#e8e8e8',
                }}
                placeholder="Пароль"
                placeholderTextColor="#bdbdbd"
                autoComplete="password"
                autoCapitalize="none"
                secureTextEntry={isSecureText}
                value={password}
                onChangeText={setPassword}
                onFocus={() => handleFocus('password')}
              />
              <TouchableOpacity
                style={styles.btnPassShow}
                onPress={() => password !== '' && setIsSecureText(prevState => !prevState)}
              >
                <Text style={styles.btnPassShowText}>Показати</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={styles.btn} onPress={onSubmitUserRegister}>
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>
                  Вже є акаунт? <Text style={styles.linkTextUnderline}>Увійти</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  bgContainer: {
    width: '100%',
    height: '100%',

    flexDirection: 'row',
    alignItems: 'flex-end',

    resizeMode: 'cover',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  contentWrapper: {
    paddingHorizontal: 16,

    width: '100%',
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
  input: {
    height: 50,
    fontSize: 16,
    padding: 16,
    marginBottom: 16,

    color: '#212121',
    backgroundColor: '#f6f6f6',

    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8,
  },
  inputLast: {
    marginBottom: 0,
  },
  passWrapper: {
    marginBottom: 43,
  },
  btnPassShow: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignSelf: 'center',

    padding: 16,

    backgroundColor: 'transparent',
  },
  btnPassShowText: {
    color: '#1B4371',
  },

  btn: {
    alignItems: 'center',
    padding: 16,

    backgroundColor: '#ff6c00',
    borderRadius: 100,
  },
  btnText: {
    color: '#ffffff',
  },

  link: {
    alignItems: 'center',

    marginTop: 16,
  },
  linkText: {
    color: '#1B4371',
    marginBottom: 45,
  },
  linkTextUnderline: {
    textDecorationLine: 'underline',
  },

  //
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
