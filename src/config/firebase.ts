// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import{getStorage} from "firebase/storage";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMSjr2zph0rtQ5UuWhlPoUilS3ewtEK8A",
  authDomain: "studypennapps.firebaseapp.com",
  databaseURL: "https://studypennapps-default-rtdb.firebaseio.com",
  projectId: "studypennapps",
  storageBucket: "studypennapps.appspot.com",
  messagingSenderId: "961300563310",
  appId: "1:961300563310:web:e1d72d44cc2d7faf222d7f",
  measurementId: "G-1209G2N9NW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
