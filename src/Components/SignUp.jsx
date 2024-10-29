import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../auth/firebaseAuth";

const provider = new GoogleAuthProvider();

const SignUp = () => {
  const Navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    emailId: "",
    password: "",
  });

  const [showPw, setShowPw] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPW = () => {
    setShowPw(!showPw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("signing up");
    await createUserWithEmailAndPassword(
      auth,
      formInput.emailId,
      formInput.password
    )
      .then((usercredential) => {
        const user = usercredential.user;
        console.log(user);
        Navigate("/Login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //google sign in popup authentication
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
      <p>Sign Up</p>
      <form>
        <label htmlFor="emailId">Email Id</label>
        <input onChange={handleInput} id="uName" type="text" name="emailId" />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleInput}
          id="pw"
          type={showPw ? "text" : "password"}
          name="password"
        />
        <button type="button" onClick={handleShowPW}>
          showPw
        </button>
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      <button onClick={handleGoogleSignIn}>Google</button>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default SignUp;
