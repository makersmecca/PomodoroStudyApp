import React, { useState, useRef } from "react";

const YTMusic = ({ status }) => {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [playerState, setPlayerState] = useState(false);

  const handleFormInput = (e) => {
    setYoutubeURL(e.target.value);
  };

  const handleYoutubePlayer = (e) => {
    e.preventDefault();
    console.log(youtubeURL);
    setYoutubeURL("");
  };

  const handlePlayPause = () => {
    setPlayerState((prevState) => !prevState);
  };

  const trackTime = "20px"; //need to calculate this vlaue and assign it depending upon the track time

  return (
    <>
      <form className="flex flex-col">
        <input
          placeholder="Youtube URL"
          className="px-2 py-0.5 rounded-lg mb-3"
          onChange={handleFormInput}
        />
        <button
          type="submit"
          className="px-2 py-1 rounded-lg bg-buttonColor text-white w-[80px] self-end"
          onClick={handleYoutubePlayer}
        >
          Submit
        </button>
      </form>
      <div className="mt-8">
        <div className="mb-2">Track Name</div>
        <div className={`bg-buttonColor pt-0.5 w-[${trackTime}]`}></div>
        <div className="flex justify-center h-[40pxpx] w-full items-center">
          <button onClick={handlePlayPause} className="self-center">
            {playerState ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-pause-circle-fill ps-1 md:ps-0 md:pe-0.5"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-play-circle-fill ps-1 md:ps-0 md:pe-0.5"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default YTMusic;
