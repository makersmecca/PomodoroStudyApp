import { useState, useEffect } from "react";
import logoImage from "/Icons/512x512.png";

const GettingStartedPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const hasVisited = localStorage.getItem("userVisit");

  useEffect(() => {
    if (hasVisited === null) {
      //if the user had visited this application previously then don't show the prompt
      setShowPrompt(true);
      localStorage.setItem("userVisit", true);
    } else {
      setShowPrompt(false);
    }
  }, []);

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <div
      className={`fixed bottom-0 md:bottom-4 left-0 md:left-5 right-0 flex justify-center md:justify-start w-full sm:w-[400px] ${
        showPrompt ? "h-auto" : "h-0"
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className={`${
          showPrompt ? "scale-100 translate-y-0" : "scale-0 translate-y-full"
        } transition-transform ease-in-out duration-500 bg-pastelOrange text-rose-700 rounded-lg shadow-lg ps-4 pe-4 pt-2 pb-2 w-[350px] mb-4`}
      >
        <div className="prompt-content">
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center text-xl font-semibold">
              Welcome to{" "}
              <div className={`relative inline-flex items-center ms-2 me-2`}>
                <div className="absolute translate-x-1.5 translate-y-1 w-full h-full bg-yellow-300 rounded-full blur-[5px]"></div>
                <img src={logoImage} className="h-[22px] w-[22px] relative" />
              </div>
              HaloFocus!
            </div>
            <button onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="5%"
                className="bi bi-x-lg font-bold hover:scale-110 transition-all ease-in-out"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>
          <div className="pt-1 ms-2">
            <div className="text-[17px]">
              <span>
                <a
                  href="https://todoist.com/productivity-methods/pomodoro-technique#:~:text=The%20Pomodoro%20Technique%20is%20a,Improves%20focus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Learn more
                </a>{" "}
                about Pomodoro
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GettingStartedPrompt;
