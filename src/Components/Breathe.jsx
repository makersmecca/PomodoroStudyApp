import { useState } from "react";
import useTimerComp from "./useTimerComp";
import { Link } from "react-router-dom";
import DisplayTimer from "./DisplayTimer";
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
      <DisplayTimer
        defaultTime={1}
        increment={1}
        decrement={1}
        componentName={"Breathe"}
      ></DisplayTimer>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default Breathe;
