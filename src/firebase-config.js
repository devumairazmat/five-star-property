// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "five-star-property.firebaseapp.com",
  projectId: "five-star-property",
  storageBucket: "five-star-property.appspot.com",
  messagingSenderId: "909945463059",
  appId: "1:909945463059:web:34b1c9887dae148f257ae6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export storage
export const storage = getStorage(app);
