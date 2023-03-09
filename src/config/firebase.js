import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_mvFjiDQ9Spu5G_8uBFZMmUVcSv4TfxI",
  authDomain: "phamily-recipes.firebaseapp.com",
  projectId: "phamily-recipes",
  storageBucket: "phamily-recipes.appspot.com",
  messagingSenderId: "593357731115",
  appId: "1:593357731115:web:1ef301174f11b631b2c16e",
  measurementId: "G-3GWF8PPW36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
