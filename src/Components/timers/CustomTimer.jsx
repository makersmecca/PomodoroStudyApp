import React, { useState, useEffect, useCallback, useRef } from "react";
import NavLinks from "../NavLinks";
import useStoreStat from "../hooks/useStoreStat";
import { useLocation } from "react-router-dom";
import MusicButton from "./MusicPlayerComponent/MusicButton";

const CustomTimer = () => {
  const [displayTime, setDisplayTime] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const location = useLocation().pathname;
  const { addTime } = useStoreStat(location);

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
      document.body.style.backgroundColor = "#3c3d37";
    } else {
      cancelAnimationFrame(rafIdRef.current);
      document.body.style.backgroundColor = "#fff4ea";
    }
    document.body.style.transition = "background-color 0.4s ease-in-out";

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.body.style.backgroundColor = "";
      document.body.style.transition = "";
    };
  }, [isRunning, updateTimer]);

  const handleStartPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    setIsPaused(isRunning);
  };

  const handleReset = async () => {
    try {
      await addTime(secondsRef.current);
      // console.log(typeof secondsRef.current);
      setIsRunning(false);
      setIsPaused(false);
      secondsRef.current = 0;
      setDisplayTime("00:00:00");
      cancelAnimationFrame(rafIdRef.current);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full">
        <NavLinks timerState={isRunning}></NavLinks>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <div className="text-3xl md:text-4xl font-semibold h-[40px] w-full text-center mb-[25px] md:mt-20">
          <div
            className={`${
              isRunning ? "scale-0" : "scale-100 "
            } transition-all ease-in-out duration-200`}
          >
            Halo Focus
          </div>
        </div>
        <span
          className={`${
            isRunning && "bg-opacity-50"
          } bg-buttonColor cursor-none rounded-3xl py-2 text-white text-center text-2xl w-[250px] mb-6 shadow-xl items-center mt-6`}
        >
          Focus Timer
        </span>
        <div className="relative w-[180px] xs:w-[200px] sm:w-[220px] md:w-[250px] aspect-square">
          {/* Timer circle */}
          <div className="absolute inset-0 bg-pastelWhite border-solid rounded-full shadow-lg flex items-center justify-center border-4 border-buttonColor border-opacity-50 transition-all duration-500">
            {/* Timer text container */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-5xl font-semibold text-slate-600">
                <div>{displayTime}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center mt-6 h-12">
          <button
            onClick={handleStartPause}
            className={`px-4 py-1 ${
              isRunning
                ? "bg-pastelRed hover:bg-opacity-85 text-slate-600 font-semibold h-14 translate-x-[60%]"
                : "bg-buttonColor hover:bg-opacity-85 text-white font-normal h-12"
            } rounded-3xl active:scale-95 transition-all ease-in-out duration-300 text-lg shadow-md w-[100px]`}
          >
            {isRunning ? "Pause" : `${isPaused ? "Resume" : "Start"}`}
          </button>

          <div
            onClick={handleRotate}
            className={`${
              isRunning
                ? "scale-0 cursor-none transition-all ease-in-out duration-300"
                : "scale-100 cursor-pointer transition-all ease-in-out duration-300"
            } text-buttonColor rounded-lg text-lg w-[50px]`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              onClick={handleRotate}
              className={`bi bi-arrow-clockwise stroke-current cursor-pointer pb-1 mt-1 ${
                isRotating ? "animate-spinSlow" : ""
              } ${isRunning ? "cursor-none" : ""}`}
              viewBox="0 -1 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </div>

          <div
            className={`${
              isRunning
                ? "scale-0 cursor-none transition-all ease-in-out duration-300"
                : "scale-100 cursor-pointer transition-all ease-in-out duration-300"
            } text-buttonColor rounded-lg text-lg w-[50px]`}
          >
            <MusicButton
              status={isRunning ? "play" : isPaused ? "pause" : "stop"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomTimer);
