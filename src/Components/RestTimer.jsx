import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RestTimer = () => {
  const [defaultDuration, setDefaultDuration] = useState(5 * 60); // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleCancel = () => {
    setIsRunning(false);
    setTimeLeft(5 * 60);
    setDefaultDuration(5 * 60);
  };

  const handleIncrease = () => {
    const newDuration = defaultDuration + 5 * 60;
    setDefaultDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration);
    }
  };

  const handleDecrease = () => {
    const newDuration = Math.max(defaultDuration - 5 * 60, 0);
    setDefaultDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleDecrease}>-5 min</button>
        <span>{formatTime(defaultDuration)} </span>
        <button onClick={handleIncrease}>+5 min</button>
      </div>
      <div>
        <h3>{formatTime(timeLeft)}</h3>
      </div>
      <div>
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        {isRunning || timeLeft != defaultDuration ? (
          <button onClick={handleCancel}>Cancel</button>
        ) : (
          ""
        )}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default RestTimer;