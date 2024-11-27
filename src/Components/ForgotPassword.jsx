import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
const ForgotPassword = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (event) => {
    setEmail(event.target.value || "");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    // console.log(email);
    setEmail("");
    await sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        setErrorMsg("Password reset email sent!");
        Navigate("/LogIn");
      })
      .catch((err) => {
        console.log(err);
        switch (err.message) {
          case "Firebase: Error (auth/invalid-email).":
            setErrorMsg("Invalid Email!");
            break;
          default:
            setErrorMsg("Uh Oh! Something went wrong!");
        }
      });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen">
        <div className="flex justify-between w-full items-center">
          <NavLinks></NavLinks>
        </div>
        <div className="flex flex-col items-center w-full bg-pastelYellow rounded-3xl shadow mt-12 sm:max-w-sm px-5 py-6">
          <div className="flex w-full items-center justify-between mb-6">
            {/*Back button to go to homepage*/}
            <button className="text-buttonColor hover:text-buttonColor/80 transition-colors min-h-7 min-w-7 mt-0.5">
              <Link to="/LogIn">
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
            <div className="font-semibold text-2xl flex-grow text-center ms-5">
              Reset Password.
            </div>
            {/* This empty div helps balance the layout */}
            <div className="w-[52px]"></div>
          </div>
          <form className="flex flex-col items-start w-full gap-3 mt-4">
            <div className="w-full">
              <label
                htmlFor="emailId"
                className="block mb-2 text-lg font-medium"
              >
                Your Email
              </label>
              <input
                onChange={handleInput}
                id="uName"
                type="text"
                name="emailId"
                className="rounded-lg block w-full p-2"
                placeholder="focusing@pomodoro.study"
                value={email}
                required
              />
            </div>
            <span className={errorMsg === "" ? "my-2" : "my-0"}>
              {errorMsg}
            </span>
            <button
              type="submit"
              className="w-full bg-buttonColor text-white rounded-lg p-2 font-semibold"
              onClick={handleSubmit}
            >
              Send Password Reset Link
            </button>
          </form>
          <div className="mt-5">
            Don't have an account?{" "}
            <Link to="/SignUp" className="font-semibold">
              Sign Up.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
