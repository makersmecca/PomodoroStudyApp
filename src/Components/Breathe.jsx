import { useState } from "react";
import useTimerComp from "./useTimerComp";
import { Link } from "react-router-dom";
// import Timer from "./Timer";
const Breathe = () => {
  const [breatheState, setBreatheState] = useState(true);

  const timer = useTimerComp({
    initialMinutes: 1,
    incrementMinutes: 1,
    minimumMinutes: 1,
    onTick: (newTime) => {
      if (newTime % 5 === 0) {
        setBreatheState((prev) => !prev);
      }
    },
    onComplete: () => {
      setBreatheState(true);
    },
  });

  return (
    <>
      <div>
        <div>
          <button onClick={timer.handleDecrease}>-</button>
          <span>{timer.formatTime(timer.defaultDuration)}</span>
          <button onClick={timer.handleIncrease}>+</button>
        </div>

        <div>
          <h3>{timer.formatTime(timer.timeLeft)}</h3>
          {timer.isRunning && (
            <div>{breatheState ? "Breathe In" : "Breathe Out"}</div>
          )}
        </div>

        <div>
          {!timer.isRunning ? (
            <button onClick={timer.handleStart}>Start</button>
          ) : (
            <button onClick={timer.handlePause}>Pause</button>
          )}
          <button onClick={timer.handleCancel}>Done</button>
        </div>
      </div>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default Breathe;
