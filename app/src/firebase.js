// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAy_g-SXp1nfTTB6NMbqNPoXDYLPhYOLfM",
  authDomain: "fir-app-a12bf.firebaseapp.com",
  projectId: "fir-app-a12bf",
  storageBucket: "fir-app-a12bf.appspot.com",
  messagingSenderId: "711777148180",
  appId: "1:711777148180:web:97fedc036d7c2fc7983601",
  measurementId: "G-3LM5J01JH8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);