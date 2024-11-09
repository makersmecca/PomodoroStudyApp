import { useState, useMemo, useEffect } from "react";
import useTimerComp from "./useTimerComp";
import { Link, useLocation } from "react-router-dom";
import NavButtons from "./NavButtons";
import useStoreStat from "./useStoreStat";

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

  // const storeStat = (timeSpent) => {
  //   const existingTime = "00:04:20";
  //   try {
  //     // Convert existingTime to seconds
  //     const [existingHours, existingMinutes, existingSeconds] = existingTime
  //       .split(":")
  //       .map(Number);
  //     const existingTotalSeconds =
  //       existingHours * 3600 + existingMinutes * 60 + existingSeconds;

  //     // Add existingTime (in seconds) to timeSpent
  //     const totalSeconds = existingTotalSeconds + timeSpent;

  //     // Convert total seconds to HH:MM:SS format
  //     const hours = Math.floor(totalSeconds / 3600);
  //     const minutes = Math.floor((totalSeconds % 3600) / 60);
  //     const seconds = totalSeconds % 60;

  //     // Format each component to ensure two digits
  //     const formattedHours = hours.toString().padStart(2, "0");
  //     const formattedMinutes = minutes.toString().padStart(2, "0");
  //     const formattedSeconds = seconds.toString().padStart(2, "0");

  //     // Combine into HH:MM:SS format
  //     const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  //     console.log(`${formattedTime} -- ${new Date().toLocaleDateString()}`);

  //     // Here you could add code to actually store the stat
  //     // For example: localStorage.setItem('totalTime', formattedTime);

  //     return formattedTime;
  //   } catch (error) {
  //     console.error("Error in storeStat:", error);
  //     return null;
  //   }
  // };

  const handleRotate = async () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
    try {
      if (!timer.isRunning) {
        timer.handleCancel();
        // storeStat(defaultTime * 60 - timer.timeLeft);
        await addTime(defaultTime * 60 - timer.timeLeft); //function from custom hook useStoreStat
        setBreatheState(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const timer =
    componentName === "Breathe"
      ? useTimerComp({
          initialMinutes: defaultTime,
          incrementMinutes: increment,
          minimumMinutes: decrement,
          onTick: (newTime) => {
            if (newTime % 5 === 0) {
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
        });

  // ${
  //   breatheState
  //     ? "bg-green-100 shadow-green-500"
  //     : "bg-blue-100 shadow-blue-500"
  // }

  const glowClasses = useMemo(() => {
    if (componentName === "Breathe" && timer.isRunning) {
      return "animate-breatheGlow shadow-buttonColor/80"; // Using the glow color with 10% opacity for background
    }
    return "";
  }, [componentName, timer.isRunning]);

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
  }, [timer.isRunning]);

  return (
    <>
      <div className="main-content min-h-screen flex flex-col items-center justify-center pt-0 sm:pt-20 px-4 sm:mt-10 lg:mt-0">
        {/* Main container */}
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
          <div className="flex gap-4 w-full justify-center items-center h-12 md:h-14">
            {/*Start Pause Button */}
            <button
              onClick={timer.isRunning ? timer.handlePause : timer.handleStart}
              className={`px-4 py-1 ${
                timer.isRunning
                  ? "bg-pastelRed hover:bg-opacity-85 text-slate-600 font-semibold h-14 translate-x-1/3"
                  : "bg-buttonColor hover:bg-opacity-85 text-white font-normal h-12"
              } rounded-3xl active:scale-95 transition-all ease-in-out duration-300 text-lg shadow-md w-[95px]`}
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
                } ${timer.isRunning ? "cursor-none" : ""}`}
                viewBox="0 -1 16 16"
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
    </>
  );
};

export default DisplayTimer;
