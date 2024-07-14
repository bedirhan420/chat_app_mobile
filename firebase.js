// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBucdrLMEnK7okHXOVfDtQEfQ2KQfG3jY",
  authDomain: "wp-clone-31cf6.firebaseapp.com",
  projectId: "wp-clone-31cf6",
  storageBucket: "wp-clone-31cf6.appspot.com",
  messagingSenderId: "656524597221",
  appId: "1:656524597221:web:efa617c7ef1464787d010c",
  measurementId: "G-523YSL006C",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export function signIn(email,password) {
  return signInWithEmailAndPassword(auth, email,password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
