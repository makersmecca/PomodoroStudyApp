// InstallPrompt.jsx
import React, { useState, useEffect } from "react";

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // console.log(`User response to the install prompt: ${outcome}`);
    console.log(outcome);

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  //   if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 md:bottom-4 left-0 md:left-5 right-0 flex justify-center md:justify-start w-full">
      <div
        className={`${
          showPrompt ? "scale-100 translate-y-0" : "scale-0 translate-y-full"
        } transition-transform ease-in-out duration-500 bg-pastelYellow rounded-lg shadow-lg ps-4 pe-4 pt-2 pb-2 w-[350px] mb-4`}
      >
        <div className="prompt-content">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Install Pomodoro Timer!</div>
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
            Install Pomodoro Timer for easier access from your homescreen.
          </div>
          <div className="flex justify-around pt-3">
            <button
              onClick={handleInstallClick}
              className="bg-buttonColor text-white rounded-lg px-2 py-1 hover:scale-105 transition-all ease-in-out"
            >
              Install
            </button>
            <button
              onClick={handleClose}
              className="bg-buttonColor text-white rounded-lg px-2 py-1 hover:scale-105 transition-all ease-in-out"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
