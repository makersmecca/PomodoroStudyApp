// InstallPrompt.jsx
import React, { useState, useEffect } from "react";

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  const isIos = () => {
    const deviceType = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(deviceType);
  };

  window.addEventListener("load", () => {
    // console.log(isIos());
    setIsIOS(isIos());
    if (window.navigator.standalone) {
      setShowPrompt(false);
    } else {
      setShowPrompt(true);
    }
  });

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
    <div
      className={`fixed bottom-0 md:bottom-4 left-0 md:left-5 right-0 flex justify-center md:justify-start w-full sm:w-[400px] ${
        showPrompt ? "h-auto" : "h-0"
      } transition-transform duration-300 ease-in-out`}
    >
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
            {isIOS ? (
              <div className="text-[17px]">
                <span className="whitespace-nowrap">
                  For easier access, <br /> Tap the share
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2%"
                    className="bi bi-box-arrow-up inline-block align-text-bottom ml-1 mb-0.5"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708z"
                    />
                  </svg>
                </span>{" "}
                button and then click
                <br /> "Add to Homescreen".
              </div>
            ) : (
              <>
                Install Pomodoro Timer for easier access from your homescreen.
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
