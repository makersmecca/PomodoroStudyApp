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
  const [userStatus, setUserStatus] = useState(false);

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
  const [todos, setTodos] = useState([]);

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
  const [dbData, setDbData] = useState({});
  async function fetchData() {
    if (userid.length == 0) return;
    const docRef = doc(db, "todos", userid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDbData(docSnap.data());
      console.log(docSnap.data());
    } else {
      console.log("nopes");
    }
  }

  console.log(todos);
  console.log(dbData);

  return (
    <>
      <h3>Your Tasks</h3>
      <p>
        {userid.length > 0 ? <Link to="/LogIn">Log in to continue</Link> : "hi"}
      </p>
      {/* <ul>
        {userStatus
          ? dbData.map((item) => {
              <li key={item.index}>{item}</li>;
            })
          : "Loading..."}
      </ul> */}
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
