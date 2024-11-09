// import { useEffect, useState } from "react";

// const Timer = () => {
//   const [seconds, setSeconds] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [startTimer, setStartTimer] = useState(false);
//   const [resetTimer, setResetTimer] = useState(false);

//   const timerStatus = () => {
//     setStartTimer(() => !startTimer);
//   };
// ______ _________________ _____ _____   ___ _____ ___________
// |  _  \  ___| ___ \ ___ \  ___/  __ \ / _ \_   _|  ___|  _  \
// | | | | |__ | |_/ / |_/ / |__ | /  \// /_\ \| | | |__ | | | |
// | | | |  __||  __/|    /|  __|| |    |  _  || | |  __|| | | |
// | |/ /| |___| |   | |\ \| |___| \__/\| | | || | | |___| |/ /
// |___/ \____/\_|   \_| \_\____/ \____/\_| |_/\_/ \____/|___/

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

// ______ _________________ _____ _____   ___ _____ ___________
// |  _  \  ___| ___ \ ___ \  ___/  __ \ / _ \_   _|  ___|  _  \
// | | | | |__ | |_/ / |_/ / |__ | /  \// /_\ \| | | |__ | | | |
// | | | |  __||  __/|    /|  __|| |    |  _  || | |  __|| | | |
// | |/ /| |___| |   | |\ \| |___| \__/\| | | || | | |___| |/ /
// |___/ \____/\_|   \_| \_\____/ \____/\_| |_/\_/ \____/|___/

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
