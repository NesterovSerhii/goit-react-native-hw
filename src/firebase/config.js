import { initializeApp } from 'firebase/app';

import { getAuth, initializeAuth, getReactNativePersistence, } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyCE3Yly0FPcnadjW-aZwbyjvFz0UfcOjV0",
  authDomain: "react-native-project-2023.firebaseapp.com",
  databaseURL: "https://react-native-project-2023-default-rtdb.firebaseio.com",
  projectId: "react-native-project-2023",
  storageBucket: "qreact-native-project-2023.appspot.com",
  messagingSenderId: "1088547327772",
  appId: "1:1088547327772:android:6f95dcb39d8ec6066e34d9",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


export const db = getFirestore(app);
export const storage = getStorage(app);
