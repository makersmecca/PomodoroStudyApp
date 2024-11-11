import { useState, useEffect, useRef } from "react";
import MusicPlayer from "./MusicPlayer";

const MusicButton = ({ status }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [timerStatus, setTimerStatus] = useState("stop");
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const trackId = ["River", "Rain", "Library", "Bonfire", "Binaural", "Mute"];

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
          width="45"
          height="45"
          fill="currentColor"
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
          isPopupOpen ? "scale-100 -translate-y-5 z-50" : "scale-0"
        } transition-all ease-in-out duration-200 absolute bg-pastelYellow rounded-lg shadow-lg ps-4 pe-4 pt-2 w-[220px] right-0 bottom-[100%] mb-2`}
      >
        <h3 className="text-lg font-semibold mb-2 text-center bg-buttonColor text-white rounded-xl w-full">
          Ambient Sounds
        </h3>
        <ul className="">
          {trackId.map((trackId, index) => {
            return (
              <li
                key={index}
                className={`cursor-pointer flex justify-between items-center ${
                  trackId === selectedTrack ? "bg-gray-100 rounded" : ""
                } ${
                  selectedTrack === "" && trackId === "Mute"
                    ? "bg-gray-100 rounded"
                    : ""
                } hover:bg-gray-100 w-full text-left border-b border-buttonColor last:border-b-0 last:mb-1`}
                onClick={() => handleTrackName(trackId)}
              >
                <div className="ps-1">{trackId}</div>{" "}
                <div className="pe-1">
                  {trackId === selectedTrack && trackId !== "Mute" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-volume-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11M12.025 8a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8" />
                    </svg>
                  ) : (
                    ""
                  )}
                  {selectedTrack === "" && trackId === "Mute" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-volume-mute"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0" />
                    </svg>
                  ) : (
                    ""
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <MusicPlayer selectedTrack={selectedTrack} timerStatus={timerStatus} />
    </div>
  );
};

export default MusicButton;
