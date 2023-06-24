import { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import * as Location from 'expo-location';

import * as DocumentPicker from 'expo-document-picker';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { TouchableWithoutFeedback, TextInput, TouchableOpacity, Text, View } from 'react-native';

import SvgTrash from '../../assets/svg/SvgTrash';
import SvgLocation from '../../assets/svg/SvgLocation';
import SvgLoadPost from '../../assets/svg/SvgLoadPost';

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const [postImg, setPostImg] = useState('');
  const [postName, setPostName] = useState('');
  const [postAddress, setPostAddress] = useState('');
  const [postLocation, setPostLocation] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [currentFocused, setCurrentFocused] = useState('');

  useEffect(() => {
    setPostImg('');
    setPostLocation(null);

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    })();
  }, []);

  const addImageLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const [address] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setPostAddress(address.city);
    setPostLocation(coords);
  };

  const clearForm = () => {
    setPostImg('');
    setPostName('');
    setPostAddress('');
    setPostLocation(null);
  };

  const onSubmitPost = () => {
    if (!postImg || !postName.trim() || !postLocation)
      return console.warn('Будь ласка завантажте фото та заповніть поля');

    console.log({ postImg, postName, postAddress, postLocation });

    handleKeyboardHide();
    navigation.navigate('DefaultPosts', {
      postImg,
      postName: postName.trim(),
      postAddress: postAddress.trim(),
      postLocation,
    });
    clearForm();
  };

  const onLoadPostImg = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.takePictureAsync();
        await MediaLibrary.createAssetAsync(uri);
        setPostImg(uri);
      } catch (error) {
        console.log('Error > ', error.message);
      }
    }

    // if (!cameraRef && postImg) {
    //   try {
    //     const avatarImg = await DocumentPicker.getDocumentAsync({
    //       type: 'image/*',
    //     });

    //     if (avatarImg.type === 'cancel') return setPostImg('');

    //     setPostImg(avatarImg);
    //   } catch (error) {
    //     console.log('Error > ', error.message);
    //   }
    // }
    addImageLocation();
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
  const handleGoBack = () => {
    clearForm();
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text> No access to camera</Text>;
  }
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View
        style={{
          ...styles.container,
          justifyContent: isShowKeyboard ? 'center' : 'flex-start',
        }}
      >
        <View style={styles.loadWrapper}>
          <View style={styles.postImgWrapper}>
            {postImg ? (
              <>
                <Image style={styles.bgImage} source={{ uri: postImg }} />
                <TouchableOpacity
                  style={{
                    ...styles.loadBtn,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                  onPress={onLoadPostImg}
                >
                  <SvgLoadPost style={styles.loadBtnContent} fillColor={'#ffffff'} />
                </TouchableOpacity>
              </>
            ) : (
              isFocused && (
                <Camera
                  style={styles.camera}
                  ratio="1:1"
                  zoom={0}
                  type={Camera.Constants.Type.back}
                  ref={setCameraRef}
                >
                  <TouchableOpacity
                    style={{
                      ...styles.loadBtn,
                      backgroundColor: postImg ? 'rgba(255, 255, 255, 0.3)' : '#ffffff',
                    }}
                    onPress={onLoadPostImg}
                  >
                    <SvgLoadPost
                      style={styles.loadBtnContent}
                      fillColor={postImg ? '#ffffff' : '#bdbdbd'}
                    />
                  </TouchableOpacity>
                </Camera>
              )
            )}
          </View>
          <Text style={styles.loadWrapperText}>
            {postImg ? 'Редагувати фото' : 'Завантажте фото'}
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View>
            <TextInput
              style={{
                ...styles.input,
                borderColor: currentFocused === 'postName' ? '#ff6c00' : '#e8e8e8',
              }}
              placeholderTextColor="#bdbdbd"
              placeholder="Назва..."
              autoComplete="off"
              autoCapitalize="none"
              value={postName}
              onChangeText={setPostName}
              onFocus={() => handleFocus('postName')}
            />
            <View
              style={{
                ...styles.locationInputWrapper,
                borderColor: currentFocused === 'location' ? '#ff6c00' : '#e8e8e8',
              }}
            >
              <SvgLocation style={styles.btnLoaction} />
              <TextInput
                style={styles.inputLocation}
                placeholderTextColor="#bdbdbd"
                placeholder="Місцевість..."
                autoComplete="off"
                autoCapitalize="none"
                value={postAddress}
                onChangeText={setPostAddress}
                onFocus={() => handleFocus('location')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: !postImg || !postName.trim() || !postLocation ? '#f6f6f6' : '#ff6c00',
          }}
          onPress={onSubmitPost}
        >
          <Text
            style={{
              ...styles.btnText,
              color: !postImg || !postName.trim() || !postLocation ? '#bdbdbd' : '#ffffff',
            }}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnTrash} onPress={handleGoBack}>
          <SvgTrash stroke={'#dbdbdb'} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingVertical: 32,

    backgroundColor: '#fff',

    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  loadWrapper: {
    marginBottom: 32,
  },
  postImgWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    height: 240,
    maxHeight: 240,
    maxWidth: 342,

    marginBottom: 8,

    backgroundColor: '#F6F6F6',
    border: '1px solid #E8E8E8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  camera: {
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',
    width: '100%',
  },

  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    // zIndex: 99,
    flex: 1,
    height: 240,
    maxHeight: 240,
    width: '100%',
    maxWidth: 342,
    backgroundColor: '#000',
  },
  loadBtn: {
    alignItems: 'center',
    alignContent: 'center',

    width: 60,
    height: 60,

    padding: 18,

    color: '#bdbdbd',
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
  loadBtnContent: {},
  loadWrapperText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,

    color: '#BDBDBD',
  },

  locationInputWrapper: {
    position: 'relative',
    height: 50,
    paddingVertical: 16,

    alignContent: 'center',

    color: '#212121',
    backgroundColor: '#ffffff',

    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingVertical: 16,
    marginBottom: 16,

    color: '#212121',
    backgroundColor: '#ffffff',

    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
  },
  inputLocation: {
    fontSize: 16,

    marginLeft: 28,

    color: '#212121',
    backgroundColor: '#ffffff',
  },
  btnLoaction: {
    position: 'absolute',
    left: 0,
    bottom: 16,
    alignSelf: 'center',

    backgroundColor: 'transparent',
  },
  btn: {
    marginTop: 32,
    marginBottom: 120,

    paddingVertical: 16,

    backgroundColor: '#f6f6f6',
    borderRadius: 100,
  },
  btnText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,

    textAlign: 'center',

    color: '#bdbdbd',
  },
  btnTrash: {
    alignSelf: 'center',
    alignItems: 'center',

    width: 70,
    height: 40,

    paddingVertical: 8,
    paddingHorizontal: 8,

    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    // backgroundColor: props.accessibilityState.selected ? '#f6f6f6' : '#ff6c00',
  },
});
