import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebaseAuth";

const LogIn = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const handleClicks = () => {
    console.log("clicked");
  };
  return (
    <>
      <p>Log In</p>
      <button onClick={handleClicks}>CLick</button>
    </>
  );
};

export default LogIn;
