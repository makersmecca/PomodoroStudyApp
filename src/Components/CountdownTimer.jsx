import React from "react";
import DisplayTimer from "./DisplayTimer";
import NavLinks from "./NavLinks";

const CountdownTimer = () => {
  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <NavLinks></NavLinks>
      </div>
      <DisplayTimer
        defaultTime={25}
        increment={5}
        decrement={5}
        componentName="Pomodoro"
      ></DisplayTimer>
    </div>
  );
};

export default CountdownTimer;
