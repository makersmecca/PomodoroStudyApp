import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DisplayTimer from "./DisplayTimer";

const RestTimer = () => {
  return (
    <div>
      <h3>Rest</h3>
      <DisplayTimer defaultTime={5} increment={5} decrement={5}></DisplayTimer>
    </div>
  );
};

export default RestTimer;
