// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCXcXCu2_E50tF_x60sWQ6pyFwRhbYuME0",
  authDomain: "real-ezy-f21b0.firebaseapp.com",
  databaseURL: "https://real-ezy-f21b0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "real-ezy-f21b0",
  storageBucket: "real-ezy-f21b0.appspot.com",
  messagingSenderId: "112415547524",
  appId: "1:112415547524:web:b6aae38eed119faf7be2d1",
  measurementId: "G-SBBCPJ3J8C",
};


// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' && getAnalytics(app);


export default app
export { auth, db, analytics }







/*
let config = {
  apiKey: "AIzaSyCXcXCu2_E50tF_x60sWQ6pyFwRhbYuME0",
  authDomain: "real-ezy-f21b0.firebaseapp.com",
  databaseURL: "https://real-ezy-f21b0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "real-ezy-f21b0",
  storageBucket: "real-ezy-f21b0.appspot.com",
  messagingSenderId: "112415547524",
  appId: "G-SBBCPJ3J8C",
}; */
