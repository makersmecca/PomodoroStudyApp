import { useState, useEffect, useRef } from "react";

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
  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let lastUpdateTime = 0;

    const updateTimer = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        lastUpdateTime = timestamp;
      }

      const elapsedTime = timestamp - startTimeRef.current;
      const newTimeLeft = Math.max(
        0,
        defaultDuration - Math.floor(elapsedTime / 1000)
      );

      if (newTimeLeft !== timeLeft) {
        setTimeLeft(newTimeLeft);
        onTick?.(newTimeLeft);
        lastUpdateTime = timestamp;
      }

      if (newTimeLeft > 0 && isRunning) {
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      } else if (newTimeLeft === 0) {
        setIsRunning(false);
        onComplete?.();
      }
    };

    if (isRunning && timeLeft > 0) {
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, timeLeft, defaultDuration, onTick, onComplete]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    startTimeRef.current = 0;
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleCancel = () => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
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
