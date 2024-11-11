import React from "react";
import DisplayTimer from "./DisplayTimer";
import NavLinks from "../NavLinks";
import { useState } from "react";

const CountdownTimer = () => {
  const [timerState, setTimerState] = useState(false);
  const handleTimerState = (timerState) => {
    setTimerState(timerState);
  };
  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <NavLinks timerState={timerState}></NavLinks>
      </div>
      <DisplayTimer
        defaultTime={25}
        increment={5}
        decrement={5}
        componentName="Pomodoro"
        toggleTimerState={handleTimerState}
      ></DisplayTimer>
    </div>
  );
};

export default CountdownTimer;
