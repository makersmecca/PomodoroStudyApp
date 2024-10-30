import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../auth/firebaseAuth";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import useTimerComp from "./useTimerComp";

const CountdownTimer = () => {
  //countdown timer logic
  const [currentUser, setCurrentUser] = useState(null);
  const timer = useTimerComp({
    initialMinutes: 25,
    incrementMinutes: 5,
    minimumMinutes: 5,
  });

  //firebase auth state check and sign out
  getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.email);
        setCurrentUser(user.email);
      } else {
        console.log("User is signed out");
        setCurrentUser(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
        setCurrentUser(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <div>
      <h3>Pomodoro Timer</h3>
      <div>
        {currentUser != null ? (
          <div>
            {currentUser}
            <button type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <button onClick={timer.handleDecrease}>-</button>
        <span>{timer.formatTime(timer.defaultDuration)}</span>
        <button onClick={timer.handleIncrease}>+</button>
      </div>

      <div>
        <h3>{timer.formatTime(timer.timeLeft)}</h3>
      </div>

      <div>
        {!timer.isRunning ? (
          <button onClick={timer.handleStart}>Start</button>
        ) : (
          <button onClick={timer.handlePause}>Pause</button>
        )}
        <button onClick={timer.handleCancel}>Done</button>
      </div>
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
  );
};

export default CountdownTimer;
