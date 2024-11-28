import { useState, useEffect } from "react";
const NetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [networkChangeCount, setNetworkChangeCount] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMsg, setPromptMsg] = useState(<></>);

  const handleNetworkChange = () => {
    setNetworkStatus(navigator.onLine);
    setNetworkChangeCount((prevstate) => prevstate + 1);
  };

  useEffect(() => {
    if (networkStatus && networkChangeCount > 1) {
      setPromptMsg(
        <div>
          <div className="flex items-center gap-2">
            <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
            You're back online
          </div>
        </div>
      );
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 2000);
    } else if (!networkStatus) {
      setPromptMsg(
        <div>
          <div className="flex items-center gap-3">
            You're offline!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-wifi-off"
              viewBox="0 0 16 16"
            >
              <path d="M10.706 3.294A12.6 12.6 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4q.946 0 1.852.148zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.45 8.45 0 0 1 3.51-1.27zm2.596 1.404.785-.785q.947.362 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.5 8.5 0 0 0-1.98-.932zM8 10l.933-.933a6.5 6.5 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.53.53 0 0 1-.611.09A5.5 5.5 0 0 0 8 10m4.905-4.905.747-.747q.886.451 1.685 1.03a.485.485 0 0 1 .047.737.52.52 0 0 1-.668.05 11.5 11.5 0 0 0-1.811-1.07M9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A2 2 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z" />
            </svg>
          </div>
          Some functionalities might be affected.
        </div>
      );
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [networkChangeCount, networkStatus]);

  useEffect(() => {
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  });

  const handleClose = () => setShowPrompt(false);

  return (
    <div
      className={`fixed bottom-0 md:bottom-4 left-0 md:left-5 right-0 flex justify-center md:justify-start w-full sm:w-[400px] ${
        showPrompt ? "h-auto" : "h-0"
      } transition-transform duration-300 ease-in-out shadow-xl`}
    >
      <div
        className={`${
          showPrompt ? "scale-100 translate-y-0" : "scale-0 translate-y-full"
        } transition-transform ease-in-out duration-500 bg-pastelOrange text-rose-700 rounded-lg shadow-lg ps-4 pe-4 pt-2 pb-2 w-[350px] mb-4`}
      >
        <div className="prompt-content">
          <div className="flex justify-between items-center">
            {promptMsg}{" "}
            <button aria-label="close this popup" onClick={handleClose}>
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
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;
