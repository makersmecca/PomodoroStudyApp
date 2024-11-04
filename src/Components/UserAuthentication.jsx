import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../auth/firebaseAuth";

const provider = new GoogleAuthProvider();

const UserAuthentication = () => {
  const Navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    emailId: "",
    password: "",
  });

  const location = useLocation().pathname;
  console.log(location);

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

  const handleSignUp = async (e) => {
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

  const handleLogIn = async (e) => {
    console.log("logging in...");
    e.preventDefault();

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
  //google sign in popup authentication
  const handleGoogleSignIn = () => {
    // console.log("continuing with google");
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div class="flex flex-col items-center justify-center px-6  mx-auto h-screen">
      <div className="flex flex-col items-center gap-6 w-full bg-pastelYellow rounded-lg shadow  md:mt-0 sm:max-w-md px-5 py-10">
        <div className="font-semibold text-xl">
          {location === "/LogIn" ? "Welcome Back!" : "Welcome"}
        </div>
        <form className="flex flex-col items-start w-full gap-4">
          <div className="w-full">
            <label htmlFor="emailId" className="block mb-2 text-md font-medium">
              Email Id
            </label>
            <input
              onChange={handleInput}
              id="uName"
              type="text"
              name="emailId"
              className="rounded-lg block w-full p-2"
              placeholder="focusing@pomodoro.study"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium"
            >
              Password
            </label>

            <span className="flex flex-row items-center gap-3">
              <input
                onChange={handleInput}
                id="pw"
                type={showPw ? "text" : "password"}
                name="password"
                className="rounded-lg p-2 w-5/6"
                placeholder="shh.. secret"
              />

              <button type="button" onClick={handleShowPW} className="">
                {showPw ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                  </svg>
                )}
              </button>
            </span>
          </div>
          <div className="flex self-center">
            {location === "/LogIn" ? (
              <button type="submit" onClick={handleLogIn}>
                LOGIN
              </button>
            ) : (
              <button type="submit" onClick={handleSignUp}>
                SIGNUP
              </button>
            )}
          </div>
        </form>
        <button onClick={handleGoogleSignIn}>Continue With Google</button>
        <button>
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
};

export default UserAuthentication;
