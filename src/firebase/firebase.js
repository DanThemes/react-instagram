import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJvpcDNAMk_InbdPVCWh78CYiyPWVq8oc",
  authDomain: "react-instagram-db67c.firebaseapp.com",
  projectId: "react-instagram-db67c",
  storageBucket: "react-instagram-db67c.appspot.com",
  messagingSenderId: "1044579337004",
  appId: "1:1044579337004:web:b24c83e9dfc2222656a289",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
