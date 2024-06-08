import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "pinkribbonbhc-55787.firebaseapp.com",
  projectId: "pinkribbonbhc-55787",
  storageBucket: "pinkribbonbhc-55787.appspot.com",
  messagingSenderId: "164700029901",
  appId: "1:164700029901:web:aac1bbf776d7b11f3b7a84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
