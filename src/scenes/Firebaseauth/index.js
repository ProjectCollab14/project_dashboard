
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAv2M0PemyAZBzkbtkFsAXeXuG-bxj6-HU",
  authDomain: "projectcollaborationdashboard.firebaseapp.com",
  projectId: "projectcollaborationdashboard",
  storageBucket: "projectcollaborationdashboard.appspot.com",
  messagingSenderId: "575581576287",
  appId: "1:575581576287:web:3222fea2976525bb978fea",
  measurementId: "G-W4VT359F83"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const imgDB = getStorage(app);
export const txtDB = getFirestore(app);