import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breathe = ({ duration }) => {
  const handleBreathingComplete = useCallback(() => {
    console.log("Breathing exercise completed");
    // Add any logic for when the breathing exercise is complete
  }, []);

  const [defaultDuration, setDefaultDuration] = useState(1 * 60); // 25 minutes in seconds
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
    setTimeLeft(1 * 60);
    setDefaultDuration(1 * 60);
  };

  const handleIncrease = () => {
    const newDuration = defaultDuration + 1 * 60;
    setDefaultDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration);
    }
  };

  const handleDecrease = () => {
    const newDuration = Math.max(defaultDuration - 1 * 60, 60);
    setDefaultDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration);
    }
  };
  return (
    <div>
      <h2>Breathe</h2>
      <div>
        <button onClick={handleDecrease}>{"<"}</button>
        <span>{formatTime(defaultDuration)} </span>
        <button onClick={handleIncrease}>{">"}</button>
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
      <p>Duration: {duration} seconds</p>
      {/* Add your breathing exercise content here */}
      <button onClick={handleBreathingComplete}>Complete</button>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

// Breathe.propTypes = {
//   duration: PropTypes.number.isRequired,
// };

export default React.memo(Breathe);
