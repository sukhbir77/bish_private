import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAtaNBHXYomgvuCrZg5R2aHSopMwZYZ2BI",
  authDomain: "bish-584ce.firebaseapp.com",
  projectId: "bish-584ce",
  storageBucket: "bish-584ce.appspot.com",
  messagingSenderId: "701126008711",
  appId: "1:701126008711:web:4e6df5a35212ab35defd22",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
