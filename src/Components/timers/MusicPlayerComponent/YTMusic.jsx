import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";

const YTMusic = ({ status }) => {
  //state for react-youtube lib
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const [videoTitle, setVideoTitle] = useState("No Media");

  //state for form handling and play pause button
  const [youtubeURL, setYoutubeURL] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0, // Prevents related videos from showing
      modestbranding: 1, // Removes YouTube branding
      disablekb: 1, // Disables the keyboard controls (optional)
      origin: window.location.origin, // Required to prevent CORS errors
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const handleFormInput = (e) => {
    setYoutubeURL(e.target.value);
  };
  const handleYoutubePlayer = (e) => {
    e.preventDefault();
    console.log(youtubeURL);

    const { videoId, playlistId } = extractYoutubeId(youtubeURL);
    setVideoId(videoId);
    setPlaylistId(playlistId);
    setYoutubeURL("");
  };

  // const updateVideoTitle = (playerInstance) => {
  //   const videoData = playerInstance.getVideoData();
  //   setVideoTitle(videoData.title);
  // };

  const handleNext = () => {
    player?.nextVideo();
    setTimeout(() => {
      // updateVideoTitle(player);
    }, 500);
  };

  const handlePrev = () => {
    player?.previousVideo();
    setTimeout(() => {
      // updateVideoTitle(player);
    }, 500);
  };

  const handlePlay = () => {
    console.log("playing");
    player?.playVideo();
    // updateVideoTitle(player);
    setIsPlaying(true);
  };

  const handlePause = () => {
    console.log("paused");
    player?.pauseVideo();
    setIsPlaying(false);
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

      {videoId || playlistId ? <YouTube opts={opts} onReady={onReady} /> : null}

      <div className="mt-8">
        <div className="mb-2">Media not playing</div>
        <div className={`bg-buttonColor pt-0.5 w-[${trackTime}]`}></div>
        <div className="flex justify-center h-[40pxpx] w-full items-center mt-4 gap-2">
          <button onClick={handlePrev} className="hover:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-skip-start-circle-fill ps-1 md:ps-0 md:pe-0.5"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.71 5.093 7 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407v-5a.5.5 0 0 0-.79-.407" />
            </svg>
          </button>
          {isPlaying ? (
            <button onClick={handlePause} className="hover:scale-95">
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
            </button>
          ) : (
            <button onClick={handlePlay} className="hover:scale-95">
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
            </button>
          )}
          <button onClick={handleNext} className="hover:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-skip-end-circle-fill ps-1 md:ps-0 md:pe-0.5"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407L9.5 8.972V10.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-1 0v1.528z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
const extractYoutubeId = (url) => {
  const videoIdMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
  );
  const playlistIdMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/playlist\?list=([^&]+)/
  );

  // console.log(videoId);
  // console.log(playlistId);

  if (videoIdMatch) return { videoId: videoIdMatch[1], playlistId: null };
  if (playlistIdMatch) return { videoId: null, playlistId: playlistIdMatch[1] };
  return { videoId: null, playlistId: null };
};

export default YTMusic;
