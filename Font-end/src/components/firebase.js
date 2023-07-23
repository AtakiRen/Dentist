import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMUWUz2JB7344TwgVrMAFNMe-6O2eroVA",
  authDomain: "fir-1772003.firebaseapp.com",
  projectId: "fir-1772003",
  storageBucket: "fir-1772003.appspot.com",
  messagingSenderId: "720891464841",
  appId: "1:720891464841:web:ad30e90f04bd4e1f404a58",
  measurementId: "G-XB16YEYR2L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// export const auth = getAuth();
