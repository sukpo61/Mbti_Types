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

//고현석 꺼
// apiKey: "AIzaSyD6trVgVLj_UzoKmBmZ2pWX44j9ZLgFGqk",
// authDomain: "nativetodolist.firebaseapp.com",
// projectId: "nativetodolist",
// storageBucket: "nativetodolist.appspot.com",
// messagingSenderId: "11037294657",
// appId: "1:11037294657:web:5072139462213feb8306c0",
// measurementId: "G-CRYTSRWK2D",

// 튜터님꺼
// apiKey: "AIzaSyAv6jmIIhNnk7bMQNNj_GbLe0-mCdWp5kw",
// authDomain: "rn-movie-11f0e.firebaseapp.com",
// projectId: "rn-movie-11f0e",
// storageBucket: "rn-movie-11f0e.appspot.com",
// messagingSenderId: "163435972212",
// appId: "1:163435972212:web:340e590ea01616f1b2b321",
