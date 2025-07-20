// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-D22V0smbmyzHtlaaNET6tt67jgBjh1s",
  authDomain: "gramainfo-2e11d.firebaseapp.com",
  projectId: "gramainfo-2e11d",
  storageBucket: "gramainfo-2e11d.firebasestorage.app",
  messagingSenderId: "882995976082",
  appId: "1:882995976082:web:159b9d14479bc54d97d34b",
};

// Initialize Firebase App
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const firestore = getFirestore(firebaseApp);

// Initialize Auth - Using simple getAuth for compatibility
export const auth = getAuth(firebaseApp);
