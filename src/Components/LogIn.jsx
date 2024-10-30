import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../auth/firebaseAuth";
const provider = new GoogleAuthProvider();

const LogIn = () => {
  const Navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    emailId: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);

  const handleFormInput = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleShowPw = (e) => {
    e.preventDefault();
    setShowPw(!showPw);
  };

  const handleLogIn = async (e) => {
    console.log("logging in...");
    e.preventDefault();
    // if (auth.user) {
    //   console.log(auth);
    //   await signOut(auth);
    // }
    await signInWithEmailAndPassword(
      auth,
      formInput.emailId,
      formInput.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    console.log("signing up with google");
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        console.log(token);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <form>
        <label htmlFor="emailId">Email ID</label>
        <input
          type="email"
          placeholder="Email Id"
          name="emailId"
          onChange={handleFormInput}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type={showPw ? "text" : "password"}
          placeholder="Password"
          name="password"
          onChange={handleFormInput}
        ></input>
        <button type="button" onClick={handleShowPw}>
          Show Pw
        </button>
        <button type="submit" onClick={handleLogIn}>
          Log In
        </button>
      </form>
      <button type="button" onClick={handleGoogleSignIn}>
        Continue with Google
      </button>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default LogIn;
