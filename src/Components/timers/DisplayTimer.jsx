import { useState, useMemo, useEffect } from "react";
import useTimerComp from "../hooks/useTimerComp";
import { Link, useLocation } from "react-router-dom";
import NavButtons from "../NavButtons";
import useStoreStat from "../hooks/useStoreStat";
import MusicButton from "./MusicPlayerComponent/MusicButton";
import logoImage from "/Icons/512x512.png";

const DisplayTimer = ({
  defaultTime,
  increment,
  decrement,
  componentName = "",
  toggleTimerState = null,
}) => {
  const [breatheState, setBreatheState] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  const location = useLocation().pathname;
  const { addTime } = useStoreStat(location);

  const chime = new Audio("/Sounds/notifications/OneEternityLater.mp3");

  const timer =
    componentName === "Breathe"
      ? useTimerComp({
          initialMinutes: defaultTime,
          incrementMinutes: increment,
          minimumMinutes: decrement,
          onTick: (newTime) => {
            if (
              !timer.isPaused &&
              newTime % 5 === 0 &&
              newTime !== defaultTime * 60
            ) {
              setBreatheState((prev) => !prev);
            }
          },
          onComplete: () => {
            setBreatheState(true);
          },
        })
      : useTimerComp({
          initialMinutes: defaultTime,
          incrementMinutes: increment,
          minimumMinutes: decrement,
          onComplete: async () => {
            try {
              if (componentName === "Rest") {
                chime.volume = 0.2;
                chime.play();
              }
              setBreatheState(true);
              await handleTimerComplete();
            } catch (err) {
              console.log(err);
            }
          },
        });

  const handleTimerComplete = async () => {
    console.log("timer completed");
    try {
      await addTime(defaultTime * 60);
      timer.handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
    if (!timer.isRunning) {
      timer.handleCancel();
      setBreatheState(true);
    }
  };

  const handlePlayPause = async () => {
    console.log("play pause");
    try {
      if (timer.isRunning) {
        timer.handlePause();
        await addTime(defaultTime * 60 - timer.timeLeft);
      } else {
        timer.handleStart();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const glowClasses = useMemo(() => {
    if (componentName === "Breathe" && timer.isRunning) {
      return "animate-breatheGlow shadow-buttonColor/80"; // Using the glow color with 10% opacity for background
    }
    return "";
  }, [componentName, timer.isRunning]);

  const handleMusicBtn = () => {
    // console.log("music!!!");
  };

  useEffect(() => {
    location === "/" && toggleTimerState(timer.isRunning);
    timer.isRunning && location === "/"
      ? (document.body.style.backgroundColor = "#3c3d37")
      : (document.body.style.backgroundColor = "#fff4ea");
    document.body.style.transition = "background-color 0.4s ease-in-out";
    return () => {
      document.body.style.transition = "";
      document.body.style.backgroundColor = "";
    };
  }, [timer.isRunning, toggleTimerState]);
  useEffect(() => {
    // Set breatheState to true only when starting a new session
    if (componentName === "Breathe" && timer.isRunning && !timer.isPaused) {
      setBreatheState(true);
    }
  }, [componentName, timer.isRunning, timer.isPaused]);

  return (
    <>
      <div className="main-content min-h-screen flex flex-col items-center justify-center pt-0 sm:pt-20 px-4 mt-0 lg:mt-0">
        {/* Main container */}
        <div className="w-full text-4xl font-semibold h-[40px] mb-[40px] mt-0">
          <div
            className={`${
              timer.isRunning ? "scale-0" : "scale-100 "
            } transition-all ease-in-out duration-200`}
          >
            <div
              className={`${
                timer.isRunning ? "scale-0" : "scale-100 "
              } transition-all ease-in-out duration-200 flex justify-center items-baseline`}
            >
              <div className={`relative inline-flex items-center`}>
                <div className="absolute translate-x-2 translate-y-1.5 w-full h-full bg-yellow-300 rounded-full blur-[10px] animate-pulse transition-all duration-1000"></div>
                <Link to="/">
                  <img
                    src={logoImage}
                    className="h-[35px] md:h-[40px] w-[35px] md:w-[40px] relative transition-transform duration-300"
                  />
                </Link>
              </div>
              <div className="ms-2">
                <Link to="/">Halo Focus</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-[300px] flex flex-col items-center gap-8">
          <div className="flex gap-4">
            <Link to="/">
              <NavButtons
                timerState={timer.isRunning}
                componentName={"Pomodoro"}
                currentPage={location === "/"}
              ></NavButtons>
            </Link>
            <Link to="/rest">
              <NavButtons
                timerState={timer.isRunning}
                componentName={"Rest"}
                currentPage={location === "/rest"}
              ></NavButtons>
            </Link>
            <Link to="/breathe">
              <NavButtons
                timerState={timer.isRunning}
                componentName={"Breathe"}
                currentPage={location === "/breathe"}
              ></NavButtons>
            </Link>
          </div>

          {/* Circular timer container */}
          <div className="relative w-[180px] xs:w-[200px] sm:w-[220px] md:w-[250px] aspect-square">
            {/* Timer circle */}
            <div
              className={`absolute inset-0 bg-pastelWhite border-solid rounded-full shadow-lg flex items-center justify-center border-4 border-buttonColor border-opacity-50 transition-all duration-500 ${glowClasses}`}
            >
              {/* Timer text container */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`text-4xl xs:text-5xl sm:text-6xl font-semibold text-slate-600 mb-2 ${
                    componentName === "Breathe" && "mt-8 sm:mt-9"
                  }`}
                >
                  {timer.formatTime(timer.timeLeft)}
                </div>
                {componentName === "Breathe" ? (
                  <div>
                    {timer.isRunning ? (
                      <div className="text-base xs:text-lg sm:text-xl mt-2">
                        {breatheState ? "Breathe In" : "Breathe Out"}
                      </div>
                    ) : (
                      <div className="text-base xs:text-lg sm:text-xl mt-2 font-semibold">
                        {" "}
                        Breathe{" "}
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Control buttons */}
            <button
              disabled={timer.isRunning}
              onClick={timer.handleDecrease}
              className={`${
                timer.isRunning && "cursor-not-allowed opacity-50"
              } absolute md:left-[-20%] left-[-30%] top-1/2 -translate-y-1/2 flex items-center justify-center active:scale-95 transition-all duration-300 text-3xl xs:text-2xl pb-1`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-dash-circle-fill shadow-md rounded-full hover:opacity-90"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
              </svg>
            </button>

            <button
              disabled={timer.isRunning}
              onClick={timer.handleIncrease}
              className={`${
                timer.isRunning && "cursor-not-allowed opacity-50"
              } absolute md:right-[-20%] right-[-30%] top-1/2 -translate-y-1/2 flex items-center justify-center active:scale-95 transition-all duration-300 text-3xl xs:text-2xl pb-1`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-plus-circle-fill shadow-md rounded-full hover:opacity-90"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
            </button>
          </div>

          {/* Timer controls */}
          <div className="flex gap-4 w-full justify-center items-center h-[60px] md:h-14">
            {/*Start Pause Button */}
            <button
              onClick={handlePlayPause}
              className={`px-4 py-1 ${
                timer.isRunning
                  ? "bg-pastelRed hover:bg-opacity-85 text-slate-600 font-semibold h-14 translate-x-[60%]"
                  : "bg-buttonColor hover:bg-opacity-85 text-white font-normal h-12"
              } rounded-3xl active:scale-95 transition-all ease-in-out duration-300 text-lg shadow-md w-[100px]`}
            >
              {timer.isRunning
                ? "Pause"
                : `${timer.isPaused ? "Resume" : "Start"}`}
            </button>

            {/*Reset Button */}
            <div
              className={`${
                timer.isRunning
                  ? "scale-0 cursor-none transition-all ease-in-out duration-300"
                  : "scale-100 cursor-pointer transition-all ease-in-out duration-300"
              } text-buttonColor rounded-lg text-lg w-[40px]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="currentColor"
                onClick={handleRotate}
                className={`bi bi-arrow-clockwise stroke-current cursor-pointer mt-1 ${
                  isRotating ? "animate-spinSlow" : ""
                } ${timer.isRunning ? "cursor-none" : ""}`}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg>
            </div>
            <div
              onClick={handleMusicBtn}
              className={`${
                timer.isRunning
                  ? "scale-0 cursor-none transition-all ease-in-out duration-300"
                  : "scale-100 cursor-pointer transition-all ease-in-out duration-300"
              } text-buttonColor rounded-lg text-lg w-[50px]`}
            >
              <MusicButton
                status={
                  timer.isRunning ? "play" : timer.isPaused ? "pause" : "stop"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayTimer;
