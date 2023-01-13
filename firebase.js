import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6trVgVLj_UzoKmBmZ2pWX44j9ZLgFGqk",
  authDomain: "nativetodolist.firebaseapp.com",
  projectId: "nativetodolist",
  storageBucket: "nativetodolist.appspot.com",
  messagingSenderId: "11037294657",
  appId: "1:11037294657:web:5072139462213feb8306c0",
  measurementId: "G-CRYTSRWK2D",
};

const app = initializeApp(firebaseConfig);

export const dbService = getFirestore(app);
export const authService = getAuth(app);
