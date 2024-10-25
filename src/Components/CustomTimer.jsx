import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const CustomTimer = () => {
  const [timerState, setTimerState] = useState({
    isRunning: false,
    totalSeconds: 0,
  });

  const formatTime = useCallback((totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    let intervalId;
    if (timerState.isRunning) {
      intervalId = setInterval(() => {
        setTimerState((prevState) => ({
          ...prevState,
          totalSeconds: prevState.totalSeconds + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerState.isRunning]);

  const handleStartPause = () => {
    setTimerState((prevState) => ({
      ...prevState,
      isRunning: !prevState.isRunning,
    }));
  };

  const handleReset = () => {
    setTimerState({
      isRunning: false,
      totalSeconds: 0,
    });
  };

  return (
    <div>
      <div>{formatTime(timerState.totalSeconds)}</div>
      <button onClick={handleStartPause}>
        {timerState.isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>

      <Link to="/">Countdown Timer</Link>
    </div>
  );
};

export default CustomTimer;
