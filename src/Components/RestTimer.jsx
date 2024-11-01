import React, { useState, useEffect } from "react";
import CurrentUser from "./CurrentUser";
import DisplayTimer from "./DisplayTimer";

const RestTimer = () => {
  return (
    <div>
      <CurrentUser></CurrentUser>
      <h3>Rest</h3>
      <DisplayTimer defaultTime={5} increment={5} decrement={5}></DisplayTimer>
    </div>
  );
};

export default RestTimer;
