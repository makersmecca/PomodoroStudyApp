import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../auth/firebaseAuth";
import { useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
const ToDo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "todos", "userid2");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        console.log("nopes");
      }
    }
    fetchData();
  }, []);
  console.log(todos);

  return (
    <>
      <h3>Your Tasks</h3>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default ToDo;
