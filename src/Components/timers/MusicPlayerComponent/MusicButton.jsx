import { useState, useEffect, useRef, useMemo } from "react";
import MusicPlayer from "./MusicPlayer";
import YTMusic from "./YTMusic";
import AmbientMusic from "./AmbientMusic.jsx";

const MusicButton = ({ status }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [timerStatus, setTimerStatus] = useState("stop");
  const [activeTab, setActiveTab] = useState("ambient");
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case "ambient":
        return (
          <>
            <AmbientMusic
              trackId={trackId}
              selectedTrack={selectedTrack}
              handleTrackName={handleTrackName}
            />
          </>
        );

      case "youtube":
        return (
          <>
            <YTMusic status={status} />
          </>
        );

      default:
        return null;
    }
  };

  const trackId = useMemo(
    () => ["River", "Rain", "Library", "Bonfire", "Binaural", "Mute"],
    []
  );

  useEffect(() => {
    status != timerStatus && setTimerStatus(status);
  }, [status]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isPopupOpen &&
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  const handleMusic = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleTrackName = (selectedTrackId) => {
    // console.log(selectedTrackId);
    if (selectedTrackId === "Mute") {
      setSelectedTrack("");
    } else {
      setSelectedTrack(selectedTrackId);
    }
  };

  return (
    <div className="relative cursor-default">
      <button
        aria-label="choose music to play during your focus sessions"
        ref={buttonRef}
        onClick={() => handleMusic()}
        className="hover:scale-110 w-[40px] transition-all ease-in-out duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="47"
          height="47"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2%"
          className={`bi bi-soundwave mt-2 ${
            isPopupOpen &&
            "bg-pastelYellow bg-opacity-80 rounded-full transition-all ease-in-out duration-200"
          }`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5m12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"
          />
        </svg>
      </button>

      <div
        ref={popupRef}
        className={`${
          isPopupOpen
            ? "scale-100 -translate-y-5 z-50 visible"
            : "scale-0 invisible"
        } transition-all ease-in-out duration-200 absolute bg-pastelYellow rounded-lg shadow-lg ps-4 pe-4 pt-2.5 pb-1.5 w-[250px] h-[270px] -right-[14px] bottom-[100%] mb-2`}
      >
        {/* change to justify-evenly when adding more buttons */}
        <div className="w-full flex justify-around">
          <button
            className={`px-2 mb-2 text-xl hover:scale-95 ${
              activeTab === "ambient"
                ? "border-b-2 border-buttonColor"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("ambient")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-music-note-list pb-0.5"
              viewBox="0 0 16 16"
            >
              <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2" />
              <path fillRule="evenodd" d="M12 3v10h-1V3z" />
              <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z" />
              <path
                fillRule="evenodd"
                d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <button
            className={`px-2 mb-2 text-xl hover:scale-95 ${
              activeTab === "youtube"
                ? "border-b-2 border-buttonColor"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("youtube")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-youtube"
              viewBox="0 0 16 16"
            >
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
            </svg>
          </button>
        </div>
        {renderTabContent()}
      </div>
      <MusicPlayer selectedTrack={selectedTrack} timerStatus={timerStatus} />
    </div>
  );
};

export default MusicButton;
