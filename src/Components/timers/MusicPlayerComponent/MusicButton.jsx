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
            <YTMusic onTrackSelect={handleTrackName} />;
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
    <div className="relative">
      <button
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
        <div className="w-full flex justify-evenly">
          <button
            className={`px-2 mb-2 text-xl ${
              activeTab === "ambient"
                ? "border-b-2 border-buttonColor"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("ambient")}
          >
            Ambient
          </button>
          <button
            className={`px-2 mb-2 text-xl ${
              activeTab === "youtube"
                ? "border-b-2 border-buttonColor"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("youtube")}
          >
            YTMusic
          </button>
        </div>
        {renderTabContent()}
      </div>
      <MusicPlayer selectedTrack={selectedTrack} timerStatus={timerStatus} />
    </div>
  );
};

export default MusicButton;
