import { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const timerStatus = () => {
    setStartTimer(() => !startTimer);
  };

  const resetTimerStatus = () => {
    setResetTimer(true);
  };

  useEffect(() => {
    setSeconds(0);
    setMinutes(0);
    setStartTimer(false);
    setResetTimer(false);
  }, [resetTimer]);

  useEffect(() => {
    if (startTimer) {
      if (seconds < 60) {
        setTimeout(() => {
          setSeconds(() => seconds + 1);
        }, 1000);
      } else {
        setMinutes(() => minutes + 1);
        setSeconds(0);
      }
    }
  });

  return (
    <>
      {minutes}:{seconds}
      <button onClick={timerStatus}>{startTimer ? "Pause" : "Start"}</button>
      <button onClick={resetTimerStatus}>Reset</button>
    </>
  );
};
export default Timer;
