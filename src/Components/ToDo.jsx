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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebaseAuth";
const ToDo = () => {
  getAuth();
  let userid = "";
  const [userStatus, setUserStatus] = useState(false); //set user sign in status
  const [todos, setTodos] = useState([]); //set todo list from db

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserStatus(true);
        console.log("User is signed in:", user.email);
        userid = user.email;
        fetchData();
      } else {
        console.log("User is signed out");
        userid = "";
      }
    });
  }, []);

  //push data to db
  const pushData = async () => {
    console.log(userid);

    await setDoc(doc(collection(db, "todos"), userid), {
      listitem: false,
      listitem2: true,
    });
    console.log("added data");
  };

  //fetch data from DB
  async function fetchData() {
    if (userid.length == 0) return;
    const docRef = doc(db, "todos", userid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data(); //storing fetched data
      const todoArray = Object.entries(data).map(([task, completed]) => ({
        //used Object.entries to get both keys and values
        task,
        completed,
      }));
      setTodos(todoArray); //setting object fetched from db to state variable todoArray
      // console.log(docSnap.data());
      console.log("data from db", todoArray);
    } else {
      console.log("nopes");
    }
  }

  console.log(todos);
  // console.log(dbData);

  return (
    <>
      <h3>Your Tasks</h3>
      <p>
        {userid.length > 0 ? (
          <Link to="/LogIn">Log in to continue</Link>
        ) : (
          userid
        )}
      </p>

      <div>
        {userStatus ? (
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {todo.task} : {todo.completed ? "Completed" : "Not Completed"}
              </li>
            ))}
          </ul>
        ) : (
          "Loading..."
        )}
      </div>

      <button type="button" onClick={pushData}>
        add data
      </button>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default ToDo;
