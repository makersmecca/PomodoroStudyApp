import React, { useState, useEffect } from "react";
import DisplayTimer from "./DisplayTimer";
import NavLinks from "../NavLinks";

const RestTimer = () => {
  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <NavLinks></NavLinks>
      </div>
      <DisplayTimer
        defaultTime={5}
        increment={5}
        decrement={5}
        componentName="Rest"
      ></DisplayTimer>
    </div>
  );
};

export default RestTimer;
