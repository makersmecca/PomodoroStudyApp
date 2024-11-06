import React, { useState, useEffect, useCallback, useRef } from "react";
import NavLinks from "./NavLinks";

const CustomTimer = () => {
  const [displayTime, setDisplayTime] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const secondsRef = useRef(0);
  const startTimeRef = useRef(0);
  const rafIdRef = useRef(null);

  const handleRotate = () => {
    handleReset();
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  const formatTime = useCallback((totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map((unit) => unit.toString().padStart(2, "0"))
      .join(":");
  }, []);

  const updateTimer = useCallback(
    (timestamp) => {
      if (!isRunning) return;

      const elapsedSeconds = Math.floor(
        (timestamp - startTimeRef.current) / 1000
      );
      secondsRef.current = elapsedSeconds;
      setDisplayTime(formatTime(secondsRef.current));

      rafIdRef.current = requestAnimationFrame(updateTimer);
    },
    [isRunning, formatTime]
  );

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - secondsRef.current * 1000;
      rafIdRef.current = requestAnimationFrame(updateTimer);
    } else {
      cancelAnimationFrame(rafIdRef.current);
    }

    return () => cancelAnimationFrame(rafIdRef.current);
  }, [isRunning, updateTimer]);

  const handleStartPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    secondsRef.current = 0;
    setDisplayTime("00:00:00");
    cancelAnimationFrame(rafIdRef.current);
  };

  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <NavLinks></NavLinks>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center pt-0 sm:pt-20 px-4 sm:mt-10 lg:mt-0">
        <span className="text-lg font-semibold mb-5">HAPPY FOCUSING!</span>
        <div className="relative w-[180px] xs:w-[200px] sm:w-[220px] md:w-[250px] aspect-square">
          {/* Timer circle */}
          <div
            className={`absolute inset-0 bg-pastelWhite border-solid rounded-full shadow-lg flex items-center justify-center border-4 border-buttonColor border-opacity-50 transition-all duration-500`}
          >
            {/* Timer text container */}
            <div className="flex flex-col items-center justify-center">
              <div
                className={`text-4xl xs:text-5xl sm:text-6xl font-semibold text-slate-600 mb-2 `}
              >
                <div>{displayTime}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full justify-center mt-4">
          <button
            onClick={handleStartPause}
            className={`px-4 py-1 ${
              isRunning
                ? "bg-pastelRed hover:bg-opacity-85"
                : "bg-buttonColor hover:bg-opacity-85"
            } ${
              isRunning
                ? "text-slate-600 font-semibold"
                : "text-white font-normal"
            } rounded-3xl active:scale-95 transition-all duration-300 text-xl shadow-md w-[90px]`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <div
            onClick={handleRotate}
            className={`px-4 py-2 mt-1 text-buttonColor rounded-lg active:scale-95 transition-all duration-300 text-lg w-[50px] cursor-pointer`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className={`bi bi-arrow-clockwise stroke-current cursor-pointer ${
                isRotating ? "animate-spinSlow" : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomTimer);
