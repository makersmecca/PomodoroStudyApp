import { useState } from "react";
import useTimerComp from "./useTimerComp";
import { Link } from "react-router-dom";

const DisplayTimer = ({
  defaultTime,
  increment,
  decrement,
  componentName = "",
}) => {
  const [breatheState, setBreatheState] = useState(true);

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Main container */}
      <div className="relative w-full max-w-[300px] flex flex-col items-center gap-8">
        {/* Circular timer container */}
        <div className="relative w-[180px] xs:w-[200px] sm:w-[220px] md:w-[250px] aspect-square">
          {/* Timer circle */}
          <div className="absolute inset-0 bg-gray-200 rounded-full shadow-lg flex items-center justify-center">
            {/* Timer text container */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl xs:text-5xl sm:text-6xl font-semibold text-gray-800">
                {timer.formatTime(timer.timeLeft)}
              </span>

              {/* Breathe text */}
              {/* {componentName === "Breathe" && timer.isRunning ? (
                <div className="text-base xs:text-lg sm:text-xl mt-2">
                  {breatheState ? "Breathe In" : "Breathe Out"}
                </div>
              ) : (
                <div className="text-base xs:text-lg sm:text-xl mt-2">
                  {" "}
                  Breathe
                </div>
              )} */}

              {componentName === "Breathe" ? (
                <div>
                  {timer.isRunning ? (
                    <div className="text-base xs:text-lg sm:text-xl mt-2">
                      {breatheState ? "Breathe In" : "Breathe Out"}
                    </div>
                  ) : (
                    <div className="text-base xs:text-lg sm:text-xl mt-2">
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
            className="absolute left-[-15%] top-1/2 -translate-y-1/2 w-10 h-10 xs:w-12 xs:h-12 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 active:scale-95 transition-all duration-300 text-xl xs:text-2xl shadow-md"
          >
            -
          </button>

          <button
            onClick={timer.handleIncrease}
            className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-10 h-10 xs:w-12 xs:h-12 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 active:scale-95 transition-all duration-300 text-xl xs:text-2xl shadow-md"
          >
            +
          </button>
        </div>

        {/* Timer controls */}
        <div className="flex gap-4 w-full justify-center mt-4">
          <button
            onClick={timer.isRunning ? timer.handlePause : timer.handleStart}
            className={`px-6 py-3 ${
              timer.isRunning
                ? "bg-orange-400 hover:bg-orange-500"
                : "bg-green-500 hover:bg-green-600"
            } text-white rounded-lg active:scale-95 transition-all duration-300 text-lg shadow-md w-[100px]`}
          >
            {timer.isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={timer.handleCancel}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg active:scale-95 transition-all duration-300 text-lg shadow-md w-[100px]"
          >
            Done
          </button>
        </div>
      </div>
      {componentName !== "CountdownTimer" && <Link to="/">Home</Link>}
    </div>
  );
};

export default DisplayTimer;
