// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXaSI8PEPnwp2YpggC6m7lVK6OcBhaa-c",
  authDomain: "fir-a210f.firebaseapp.com",
  projectId: "fir-a210f",
  storageBucket: "fir-a210f.appspot.com",
  messagingSenderId: "572835236381",
  appId: "1:572835236381:web:3c73a9ae4c56c9167554f4",
  measurementId: "G-X4Q2CY62R7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);