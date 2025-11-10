// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVpafSf_k63XZtB_clf1Vn0CiysIaAbHQ",
  authDomain: "travelsun-51927.firebaseapp.com",
  projectId: "travelsun-51927",
  storageBucket: "travelsun-51927.firebasestorage.app",
  messagingSenderId: "551035221968",
  appId: "1:551035221968:web:81158887df4d6185c7ebd5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
