import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfT8ZgDKKwObM3Zoip49ry0JQE49c_R_A",
  authDomain: "chat-ca3b4.firebaseapp.com",
  projectId: "chat-ca3b4",
  storageBucket: "chat-ca3b4.appspot.com",
  messagingSenderId: "944704402303",
  appId: "1:944704402303:web:943ea57bca24b4f92ba04a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()