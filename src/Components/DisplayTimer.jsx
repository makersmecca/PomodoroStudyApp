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

  const calculateProgress = () => {
    return (
      ((timer.defaultDuration - timer.timeLeft) / timer.defaultDuration) * 100
    );
  };

  const calculateStrokeDashoffset = () => {
    const circumference = 2 * Math.PI * 45;
    const progress = calculateProgress();
    return circumference - (progress / 100) * circumference;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-[300px] flex flex-col items-center space-y-8">
        {/* SVG Circle Timer Container */}
        <div className="relative w-[300px] h-[300px]">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="transition-all duration-300"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              className="transition-all duration-300 origin-center"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ff6b6b"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={calculateStrokeDashoffset()}
              strokeLinecap="round"
            />
          </svg>
          {/* Timer text - Absolute positioned in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-800">
            {timer.formatTime(timer.timeLeft)}
          </div>
        </div>

        {/* Time adjustment controls */}
        <div className="flex items-center justify-center space-x-4 w-full">
          <button
            onClick={timer.handleDecrease}
            className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-md hover:opacity-90 active:scale-95 transition-all duration-300 text-xl"
          >
            -
          </button>
          <span className="min-w-[70px] text-center text-lg">
            {timer.formatTime(timer.defaultDuration)}

            <button
              onClick={timer.handleIncrease}
              className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-md hover:opacity-90 active:scale-95 transition-all duration-300 text-xl"
            >
              +
            </button>
          </span>
        </div>

        {/* Breathe state display */}
        {componentName === "Breathe" && timer.isRunning && (
          <div className="text-lg text-gray-800">
            {breatheState ? "Breathe In" : "Breathe Out"}
          </div>
        )}

        {/* Timer controls */}
        <div className="flex justify-center space-x-4 w-full">
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
    </div>
  );
};

export default DisplayTimer;
