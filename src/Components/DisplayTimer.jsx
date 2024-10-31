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
    <>
      <div>
        <button onClick={timer.handleDecrease}>-</button>
        <span>{timer.formatTime(timer.defaultDuration)}</span>
        <button onClick={timer.handleIncrease}>+</button>
      </div>

      <div>
        <h3>{timer.formatTime(timer.timeLeft)}</h3>
      </div>

      {componentName === "Breathe" && (
        <div>
          {timer.isRunning && (
            <div>{breatheState ? "Breathe In" : "Breathe Out"}</div>
          )}
        </div>
      )}

      <div>
        {!timer.isRunning ? (
          <button onClick={timer.handleStart}>Start</button>
        ) : (
          <button onClick={timer.handlePause}>Pause</button>
        )}
        <button onClick={timer.handleCancel}>Done</button>
      </div>
    </>
  );
};
export default DisplayTimer;
