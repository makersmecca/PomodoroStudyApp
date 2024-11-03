import { useState } from "react";
import useTimerComp from "./useTimerComp";
import { Link, useLocation } from "react-router-dom";
import NavButtons from "./NavButtons";

const DisplayTimer = ({
  defaultTime,
  increment,
  decrement,
  componentName = "",
}) => {
  const [breatheState, setBreatheState] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const handleRotate = () => {
    timer.handleCancel();
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  const location = useLocation().pathname;

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-40 lg:mt-0">
      {/* Main container */}
      <div className="relative w-full max-w-[300px] flex flex-col items-center gap-8">
        <div className="flex gap-4">
          <Link to="/">
            <NavButtons
              componentName={"Pomodoro"}
              currentPage={location === "/"}
            ></NavButtons>
          </Link>
          <Link to="/rest">
            <NavButtons
              componentName={"Rest"}
              currentPage={location === "/rest"}
            ></NavButtons>
          </Link>
          <Link to="/breathe">
            <NavButtons
              componentName={"Breathe"}
              currentPage={location === "/breathe"}
            ></NavButtons>
          </Link>
        </div>

        {/* Circular timer container */}
        <div className="relative w-[180px] xs:w-[200px] sm:w-[220px] md:w-[250px] aspect-square ">
          {/* Timer circle */}
          <div className="absolute inset-0 bg-pastelYellow border-solid rounded-full shadow-lg flex items-center justify-center border-4 border-pastelOrange">
            {/* Timer text container */}
            <div className="flex flex-col items-center justify-center">
              <div
                className={`text-4xl xs:text-5xl sm:text-6xl font-semibold text-gray-800 mb-2 ${
                  componentName === "Breathe" && "mt-9"
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
            onClick={timer.handleDecrease}
            className="absolute md:left-[-20%] left-[-30%] top-1/2 -translate-y-1/2 w-10 h-10 xs:w-12 xs:h-12 flex items-center justify-center bg-buttonColor text-white rounded-2xl hover:bg-opacity-80 active:scale-95 transition-all duration-300 text-3xl xs:text-2xl pb-1.5 shadow-md"
          >
            -
          </button>

          <button
            onClick={timer.handleIncrease}
            className="absolute md:right-[-20%] right-[-30%] top-1/2 -translate-y-1/2 w-10 h-10 xs:w-12 xs:h-12 flex items-center justify-center bg-buttonColor text-white rounded-2xl hover:bg-opacity-80 active:scale-95 transition-all duration-300 text-3xl xs:text-2xl pb-1 shadow-md"
          >
            +
          </button>
        </div>

        {/* Timer controls */}
        <div className="flex gap-4 w-full justify-center mt-4">
          <button
            onClick={timer.isRunning ? timer.handlePause : timer.handleStart}
            className={`px-4 py-1 ${
              timer.isRunning
                ? "bg-orange-400 hover:bg-opacity-85"
                : "bg-buttonColor hover:bg-opacity-85"
            } text-white rounded-3xl active:scale-95 transition-all duration-300 text-xl shadow-md w-[90px]`}
          >
            {timer.isRunning ? "Pause" : "Start"}
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

export default DisplayTimer;
