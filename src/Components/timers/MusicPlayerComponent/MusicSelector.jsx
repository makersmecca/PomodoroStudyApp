import { useState } from "react";
const MusicSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTrackSelection = (trackId) => {
    setSelectedTrack(trackId);
  };

  return (
    <div
      className={`dropdown inline-block transition-all duration-300 ease-in-out`}
    >
      <button
        className="dropdown-button cursor-pointer flex items-center gap-4"
        onClick={toggleDropdown}
      >
        <div className="">Music</div>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className={`${
            isOpen ? "rotate-180" : ""
          } bi bi-caret-down-fill transition-all ease-in-out`}
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>

      <div
        className={`
      overflow-hidden 
      transition-[max-height] 
      duration-300 
      ease-in-out
      ${isOpen ? "max-h-[200px]" : "max-h-0"}`}
      >
        <div className="dropdown-content flex flex-col">
          {["track1", "track2", "track3", "track4"].map((trackId) => (
            <span
              key={trackId}
              className="hover:text-buttonColor text-gray-800 cursor-pointer"
            >
              <input
                type="checkbox"
                className="dropdown-item text-left me-4 cursor-pointer"
                id={trackId}
                checked={selectedTrack === trackId}
                onChange={() => handleTrackSelection(trackId)}
              />
              <label
                className="text-right cursor-pointer"
                htmlFor={trackId}
              >{`Track ${trackId.slice(-1)}`}</label>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;
