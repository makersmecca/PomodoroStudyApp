// import { useEffect, useState } from "react";

// const Timer = () => {
//   const [seconds, setSeconds] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [startTimer, setStartTimer] = useState(false);
//   const [resetTimer, setResetTimer] = useState(false);

//   const timerStatus = () => {
//     setStartTimer(() => !startTimer);
//   };

//   const resetTimerStatus = () => {
//     console.log("reset timer function");
//     setResetTimer(() => !resetTimer);
//   };

//   useEffect(() => {
//     console.log("reset timer use effect");
//     startTimer && setStartTimer(false);
//     setSeconds(0);
//     setMinutes(0);
//     setStartTimer(false);
//   }, [resetTimer]);

//   useEffect(() => {
//     if (startTimer) {
//       if (seconds < 60) {
//         setTimeout(() => {
//           setSeconds(() => seconds + 1);
//         }, 1000);
//       } else {
//         setMinutes(() => minutes + 1);
//         setSeconds(0);
//       }
//     }
//   });

//   return (
//     <div>
//       <div>
//         {minutes < 10 ? `0${minutes}` : minutes}:
//         {seconds < 10 ? `0${seconds}` : seconds}
//       </div>
//       <button onClick={timerStatus}>{startTimer ? "Pause" : "Start"}</button>{" "}
//       <button onClick={resetTimerStatus}>Reset</button>
//     </div>
//   );
// };
// export default Timer;

import React, { useState, useEffect, useCallback } from "react";

const Timer = () => {
  const [timerState, setTimerState] = useState({
    isRunning: false,
    totalSeconds: 0,
  });

  const formatTime = useCallback((totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    let intervalId;
    if (timerState.isRunning) {
      intervalId = setInterval(() => {
        setTimerState((prevState) => ({
          ...prevState,
          totalSeconds: prevState.totalSeconds + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerState.isRunning]);

  const handleStartPause = () => {
    setTimerState((prevState) => ({
      ...prevState,
      isRunning: !prevState.isRunning,
    }));
  };

  const handleReset = () => {
    setTimerState({
      isRunning: false,
      totalSeconds: 0,
    });
  };

  return (
    <div>
      <div>{formatTime(timerState.totalSeconds)}</div>
      <button onClick={handleStartPause}>
        {timerState.isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
