import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const strip = (v) => (v || "").replace(/;+$/, "").trim();

const firebaseConfig = {
  apiKey: strip(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: strip(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: strip(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: strip(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: strip(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: strip(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: strip(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID)
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);