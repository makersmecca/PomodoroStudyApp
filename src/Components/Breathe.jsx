import { useState } from "react";
import useTimerComp from "./useTimerComp";
import DisplayTimer from "./DisplayTimer";
import CurrentUser from "./CurrentUser";
import NavLinks from "./NavLinks";
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
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-4">
          <CurrentUser></CurrentUser>
        </div>

        <NavLinks></NavLinks>
      </div>
      <DisplayTimer
        defaultTime={1}
        increment={1}
        decrement={1}
        componentName={"Breathe"}
      ></DisplayTimer>
    </div>
  );
};

export default Breathe;
