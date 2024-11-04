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
        // const user = usercredential.user;
        // console.log(user);
        Navigate("/LogIn");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    location === "/LogIn" ? handleLogIn(e) : handleSignUp(e);
  };
  const handleLogIn = async (e) => {
    console.log("logging in...");
    e.preventDefault(e);

    await signInWithEmailAndPassword(
      auth,
      formInput.emailId,
      formInput.password
    )
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
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
    <div className="flex flex-col items-center justify-center px-6  mx-auto h-screen">
      <div className="flex flex-col items-center w-full bg-pastelYellow rounded-3xl shadow md:mt-0 sm:max-w-sm px-5 py-6">
        <div className="flex w-full items-center justify-between mb-6">
          <button className="text-buttonColor hover:text-buttonColor/80 transition-colors min-h-7 min-w-7 mt-0.5">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </Link>
          </button>
          <div className="font-semibold text-2xl flex-grow text-center">
            {location === "/LogIn" ? "Welcome Back!" : "Welcome"}
          </div>
          {/* This empty div helps balance the layout */}
          <div className="w-[52px]"></div>
        </div>

        <form className="flex flex-col items-start w-full gap-4 mt-4">
          <div className="w-full">
            <label htmlFor="emailId" className="block mb-2 text-lg font-medium">
              Your Email
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
              className="block mb-2 text-lg font-medium"
            >
              Password
            </label>

            <span className="flex flex-row items-center gap-3">
              <input
                onChange={handleInput}
                id="pw"
                type={showPw ? "text" : "password"}
                name="password"
                className="rounded-lg p-2 w-11/12"
                placeholder="shh.. secret"
              />

              <button type="button" onClick={handleShowPW} className="ms-1">
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
          <div className="flex self-center w-full">
            <button
              type="submit"
              className="w-full bg-buttonColor text-white rounded-lg p-2 mt-5 font-semibold"
              onClick={handleSubmit}
            >
              {location === "/LogIn" ? "Log In" : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="flex flex-row items-center mt-4">
          <hr className="w-28 h-px mx-auto mt-1 me-3 bg-buttonColor border-0 rounded" />{" "}
          or{" "}
          <hr className="w-28 h-px mx-auto mt-1 ms-3 bg-buttonColor border-0 rounded" />
        </div>
        <div className="flex flex-col self-center w-full mt-4">
          <button
            className="w-full bg-softOrange text-white font-semibold rounded-lg p-2"
            onClick={handleGoogleSignIn}
          >
            Continue With Google
          </button>
        </div>
        <div className="mt-4">
          {location === "/LogIn" ? (
            <span>
              Don't have an account?{" "}
              <span className="font-semibold text-buttonColor">
                <Link to="/SignUp">Sign Up.</Link>
              </span>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <span className="font-semibold text-buttonColor">
                <Link to="/LogIn">Log In.</Link>
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;
