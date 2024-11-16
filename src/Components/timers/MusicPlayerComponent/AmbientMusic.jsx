const AmbientMusic = ({
  trackId = [],
  selectedTrack = "",
  handleTrackName = () => {},
}) => {
  return (
    <>
      <div className="text-lg font-semibold mb-2 text-center bg-buttonColor text-white rounded-xl w-full cursor-default">
        Ambient Sounds
      </div>
      <ul>
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
    </>
  );
};

export default AmbientMusic;
