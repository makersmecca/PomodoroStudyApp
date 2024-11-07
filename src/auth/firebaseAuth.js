import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let app, auth, db;
const initializeFirebase = async () => {
  if (!app) {
    const response = await fetch("./netlify/functions/firebaseConfig.js");
    const firebaseConfig = await response.json();
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    auth.useDeviceLanguage();
    db = getFirestore(app);
  }
};

const getAuthInstance = async () => {
  await initializeFirebase();
  return auth;
};

const getDbInstance = async () => {
  await initializeFirebase();
  return db;
};

export { getAuthInstance, getDbInstance, initializeFirebase };
// const firebaseConfig = {
//   apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
//   authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
//   projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
//   storageBucket: `${import.   .env.VITE_FIREBASE_STORAGE_BUCKET}`,
//   messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
//   appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
// };
// // Object.entries(firebaseConfig).forEach((value) => {
// //   console.log(value);
// // });

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// auth.useDeviceLanguage();
// export const db = getFirestore(app);
// export default app;
