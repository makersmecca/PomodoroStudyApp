import { useState } from "react";
const DisplayDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  function updateTime() {
    setCurrentTime((c) => new Date());
  }

  //console.log(currentTime);

  setInterval(updateTime, 1000);

  return (
    <div className={`px-2 md:text-xl font-semibold self-center`}>
      {currentTime.getHours() < 10 ? (
        <span>0{currentTime.getHours()}</span>
      ) : (
        <span>{currentTime.getHours()}</span>
      )}{" "}
      <span>:</span>{" "}
      {currentTime.getMinutes() < 10 ? (
        <span>0{currentTime.getMinutes()}</span>
      ) : (
        <span>{currentTime.getMinutes()} ,</span>
      )}
      <span className="px-2">
        {currentTime.toDateString().substring(0, 3)},{" "}
        {currentTime.toDateString().substring(8, 10)}{" "}
        {currentTime.toDateString().substring(4, 7)}
      </span>
    </div>
  );
};

export default DisplayDateTime;
