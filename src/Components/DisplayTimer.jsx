import { useState } from "react";
import useTimerComp from "./useTimerComp";

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
    <div className="flex items-center justify-center min-h-screen">
      {/* Circular timer container */}
      <div className="relative w-full max-w-[250px] md:max-w-[300px] lg:max-w-[400px] aspect-square flex items-center justify-center bg-gray-200 rounded-full shadow-lg">
        {/* Timer text */}
        <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
          {timer.formatTime(timer.timeLeft)}
        </div>

        {/* Decrement button on the left */}
        <button
          onClick={timer.handleDecrease}
          className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-green-500 text-white rounded-md hover:opacity-90 active:scale-95 transition-all duration-300 text-lg md:text-xl"
        >
          -
        </button>

        {/* Increment button on the right */}
        <button
          onClick={timer.handleIncrease}
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-green-500 text-white rounded-md hover:opacity-90 active:scale-95 transition-all duration-300 text-lg md:text-xl"
        >
          +
        </button>
      </div>

      {/* Timer controls below the timer */}
      <div className="absolute bottom-12 flex space-x-4">
        {!timer.isRunning ? (
          <button
            onClick={timer.handleStart}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:opacity-90 active:scale-95 transition-all duration-300"
          >
            Start
          </button>
        ) : (
          <button
            onClick={timer.handlePause}
            className="px-4 py-2 bg-orange-400 text-white rounded-md hover:opacity-90 active:scale-95 transition-all duration-300"
          >
            Pause
          </button>
        )}
        <button
          onClick={timer.handleCancel}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:opacity-90 active:scale-95 transition-all duration-300"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DisplayTimer;
