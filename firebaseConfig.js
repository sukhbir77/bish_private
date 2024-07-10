import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtaNBHXYomgvuCrZg5R2aHSopMwZYZ2BI",
  authDomain: "bish-584ce.firebaseapp.com",
  projectId: "bish-584ce",
  storageBucket: "bish-584ce.appspot.com",
  messagingSenderId: "701126008711",
  appId: "1:701126008711:web:4e6df5a35212ab35defd22",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
