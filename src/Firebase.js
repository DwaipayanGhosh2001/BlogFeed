// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBplVgA61KpS2tcugWY2ag3-8LGYRkVtAA",
  authDomain: "blogapp-90663.firebaseapp.com",
  projectId: "blogapp-90663",
  storageBucket: "blogapp-90663.appspot.com",
  messagingSenderId: "611210347748",
  appId: "1:611210347748:web:167ce1b15ff3c79ddbd8f1",
  measurementId: "G-314DXSQ4CK",
  databaseURL: "https://blogapp-90663-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const database= getDatabase(app)
const storage = getStorage(app);
export{app, auth, database, storage};
