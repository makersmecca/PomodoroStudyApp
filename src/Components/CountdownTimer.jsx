import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { auth } from "../auth/firebaseAuth";
// import { onAuthStateChanged, getAuth } from "firebase/auth";
import DisplayTimer from "./DisplayTimer";
import CurrentUser from "./CurrentUser";

const CountdownTimer = () => {
  //countdown timer logic
  // const [currentUser, setCurrentUser] = useState(null);
  // const timer = useTimerComp({
  //   initialMinutes: 25,
  //   incrementMinutes: 5,
  //   minimumMinutes: 5,
  // });

  //firebase auth state check and sign out
  // getAuth();
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("User is signed in:", user.email);
  //       setCurrentUser(user.email);
  //     } else {
  //       console.log("User is signed out");
  //       setCurrentUser(null);
  //     }
  //   });
  // }, []);

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       console.log("User signed out successfully");
  //       setCurrentUser(null);
  //     })
  //     .catch((error) => {
  //       console.error("Error signing out:", error);
  //     });
  // };
  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-4">
          <h3>Pomodoro Timer</h3>
          <CurrentUser></CurrentUser>
        </div>
        <div className="flex gap-4">
          <div>
            <Link to="/customtimer">Custom Timer</Link>
          </div>
          <div>
            <Link to="/rest">Rest</Link>
          </div>
          <div>
            <Link to="/breathe">Breathe</Link>
          </div>
          <div>
            <Link to="/todo">ToDo</Link>
          </div>
          <div>
            <Link to="/stats">Stats</Link>
          </div>
          <div>
            <Link to="/settings">Settings</Link>
          </div>
          <div>
            <Link to="/SignUp">SignUp</Link>
          </div>
          <div>
            <Link to="/LogIn">LogIn</Link>
          </div>
        </div>
      </div>
      <DisplayTimer
        defaultTime={25}
        increment={5}
        decrement={5}
        componentName="CountdownTimer"
      ></DisplayTimer>
    </div>
  );
};

export default CountdownTimer;
