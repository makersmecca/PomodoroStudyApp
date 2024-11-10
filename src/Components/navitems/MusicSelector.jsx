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
    <div className="dropdown inline-block text-center">
      <button
        className="dropdown-button cursor-pointer flex items-center mx-auto gap-4"
        onClick={toggleDropdown}
      >
        <div className="self-center ">Music</div>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className={`${
            isOpen ? "rotate-180" : ""
          } bi bi-caret-down-fill mt-0.5 transition-all ease-in-out`}
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-content relative mx-auto flex flex-col">
          {["track1", "track2", "track3", "track4"].map((trackId) => (
            <span key={trackId}>
              <input
                type="checkbox"
                className="dropdown-item text-left hover:bg-gray-100 me-4"
                id={trackId}
                checked={selectedTrack === trackId}
                onChange={() => handleTrackSelection(trackId)}
              />
              <label htmlFor={trackId}>{`Track ${trackId.slice(-1)}`}</label>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicSelector;
