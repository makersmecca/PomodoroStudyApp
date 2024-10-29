import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../auth/firebaseAuth";

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

      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default LogIn;
