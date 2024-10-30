//a common timer component is to be written here
import { useState, useEffect } from "react";
const useTimerComp = ({
  initialMinutes = 25,
  incrementMinutes = 5,
  minimumMinutes = 1,
  onTick,
  onComplete,
}) => {
  const [defaultDuration, setDefaultDuration] = useState(initialMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          onTick?.(newTime);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      onComplete?.();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTick, onComplete]);

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
    setTimeLeft(initialMinutes * 60);
    setDefaultDuration(initialMinutes * 60);
  };

  const handleIncrease = () => {
    const newDuration = defaultDuration + incrementMinutes * 60;
    setDefaultDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration);
    }
  };

  const handleDecrease = () => {
    const newDuration = Math.max(
      defaultDuration - incrementMinutes * 60,
      minimumMinutes * 60
    );
    setDefaultDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration);
    }
  };

  return {
    timeLeft,
    isRunning,
    defaultDuration,
    formatTime,
    handleStart,
    handlePause,
    handleCancel,
    handleIncrease,
    handleDecrease,
  };
};

export default useTimerComp;
