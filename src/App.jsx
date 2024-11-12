import "./App.css";
import CustomTimer from "./Components/timers/CustomTimer";
import CountdownTimer from "./Components/timers/CountdownTimer";
import RestTimer from "./Components/timers/RestTimer";
import Breathe from "./Components/timers/Breathe";
import ToDo from "./Components/navitems/ToDo";
import Stats from "./Components/navitems/Stats";
import Settings from "./Components/navitems/Settings";
import UserAuthentication from "./Components/UserAuthentication";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./Components/UserContext";
import ForgotPassword from "./Components/ForgotPassword";
import InstallPrompt from "./Components/InstallPrompt";
import { useState } from "react";
function App() {
  //register SW
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("serviceWorker.js")
        .then((regis) => {
          console.log(regis.scope);
        })
        .catch((err) => {
          console.log("SW registration failed", err);
        });
    }
  });

  const [fullScreen, setFullScreen] = useState(false);
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      setFullScreen(false);
      document.exitFullscreen();
    } else {
      setFullScreen(true);
      document.documentElement.requestFullscreen();
    }
  };
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<CountdownTimer />} />
        <Route path="/customtimer" element={<CustomTimer />} />
        <Route path="/rest" element={<RestTimer />} />
        <Route path="/breathe" element={<Breathe />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/SignUp" element={<UserAuthentication />} />
        <Route path="/LogIn" element={<UserAuthentication />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
      <InstallPrompt />
      {/* Fullscreen button */}
      <button
        onClick={handleFullScreen}
        className="hidden md:block fixed bottom-20 right-20 md:right-20 p-2 cursor-pointer border-2 border-buttonColor border-opacity-50 rounded-full hover:scale-125 transition-all ease-in-out shadow-lg"
        data-tooltip-target="tooltip-default"
      >
        {fullScreen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-fullscreen-exit"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-fullscreen"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />
          </svg>
        )}
      </button>
    </UserProvider>
  );
}

export default App;
