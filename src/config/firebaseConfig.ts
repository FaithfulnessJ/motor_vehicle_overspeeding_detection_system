// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database"
import { getFirestore } from "@firebase/firestore"
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: (process.env.REACT_APP_FIREBASE_AP1_KEY as string),
  // authDomain: (process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string),
  // databaseURL: (process.env.REACT_APP_FIREBASE_URL as string),
  // projectId: (process.env.REACT_APP_FIREBASE_PROJECT_ID as string),
  // storageBucket: (process.env.REACT_APP_FIREBASE_STORAGE_BUCKET as string),
  // messagingSenderId: (process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string),
  // appId: (process.env.REACT_APP_FIREBASE_APP_ID as string)
  apiKey: "AIzaSyBpgO2cLQ9tQ8XbsP3X2pZLmLQ35uxPgQI",
  authDomain: "speed-detection-app.firebaseapp.com",
  databaseURL: "https://speed-detection-app.firebaseio.com",
  projectId: "speed-detection-app",
  storageBucket: "speed-detection-app.appspot.com",
  messagingSenderId: "768816596142",
  appId: "1:768816596142:web:471adb75b7fb6da40e193f"
};
// https://speed-detection-app-default-rtdb.europe-west1.firebasedatabase.app
// https://speed-detection-app.firebaseio.com
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize realtime database 
export const realtimedb = getDatabase(app);

// Intialize firestore database
export const firestoredb = getFirestore(app);

// Intialize authentication database
export const auth = getAuth(app);