import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5WQLLG43nzfF0OlXhDLGoT_7_6PuoYIY",
  authDomain: "pomodoro-83eb9.firebaseapp.com",
  projectId: "pomodoro-83eb9",
  storageBucket: "pomodoro-83eb9.appspot.com",
  messagingSenderId: "704281354541",
  appId: "1:704281354541:web:477b38bbea5422d1d4b3a4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
