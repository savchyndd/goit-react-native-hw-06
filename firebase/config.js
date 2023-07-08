import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB1YRizHEKH8AMLu7EtBwLcmNfqSM3pH98',
  authDomain: 'goit-react-native-1.firebaseapp.com',
  projectId: 'goit-react-native-1',
  storageBucket: 'goit-react-native-1.appspot.com',
  messagingSenderId: '78873247793',
  appId: '1:78873247793:web:d65a6923dbd40f85d81510',
};

export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(app);
export const myStorage = getStorage(app);
export const db = getFirestore(app);
