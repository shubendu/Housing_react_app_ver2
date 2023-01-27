// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqqHRMVJDBKPCbvA_FRXIQH8sY89msIjg",
  authDomain: "housing-git.firebaseapp.com",
  projectId: "housing-git",
  storageBucket: "housing-git.appspot.com",
  messagingSenderId: "842632935875",
  appId: "1:842632935875:web:b830cd6339aa91617da576"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore()