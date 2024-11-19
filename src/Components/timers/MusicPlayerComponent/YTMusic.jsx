import { PlayerState, useYoutube } from "react-youtube-music-player";
import { useEffect, useState } from "react";

const YTMusic = () => {
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState("No Media");
  const [youtubeObject, setYoutubeObject] = useState({
    id: "",
    type: "",
  });
  // const { playerDetails, actions } = useYoutube({
  //   id: "7LX6VhNKebQ",
  //   type: "video",
  // });
  const { playerDetails, actions } = useYoutube(youtubeObject);

  const handleMediaStop = () => {
    setIsLoading("No Media");
    setYoutubeObject({ id: "", type: "" });
    actions.stopVideo();
  };

  const handleInputChange = (e) => {
    setUrlInput(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { playlistId, videoId } = extractYoutubeId(urlInput);

    if (playlistId !== null || videoId !== null) {
      setYoutubeObject({
        id: playlistId !== null ? playlistId : videoId,
        type: playlistId !== null ? "playlist" : "video",
      });
      setIsLoading("Loading...");
    } else {
      console.log("unknown url");
      setIsLoading("No Media");
    }
  };
  const extractYoutubeId = (url) => {
    const videoRegex = /(?:youtube\.com\/watch\?v=|youtu.be\/)([^&]+)/;
    const playlistRegex = /[&?]list=([^&]+)/;

    const videoMatch = url.match(videoRegex);
    const playlistMatch = url.match(playlistRegex);

    return {
      videoId: videoMatch ? videoMatch[1] : null,
      playlistId: playlistMatch ? playlistMatch[1] : null,
    };
  };

  const renderVolumeIcon = () => {
    if (playerDetails.volume === 0) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-volume-mute-fill"
          viewBox="0 0 16 16"
        >
          <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0" />
        </svg>
      );
    }
    if (playerDetails.volume <= 30) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-volume-off-fill"
          viewBox="0 0 16 16"
        >
          <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
        </svg>
      );
    }
    if (playerDetails.volume <= 60) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-volume-down-fill"
          viewBox="0 0 16 16"
        >
          <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zm3.025 4a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8" />
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-volume-up-fill"
        viewBox="0 0 16 16"
      >
        <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
        <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
      </svg>
    );
  };

  //effect to keep playing audio when minimized or moved from visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        playerDetails.state === PlayerState.PLAYING && actions.playVideo();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [actions]);

  //effect to suppress browser adblock error
  // useEffect(() => {
  //   window.addEventListener(
  //     "error",
  //     (e) => {
  //       if (e.target.src && e.target.src.includes("doubleclick.net")) {
  //         e.preventDefault();
  //       }
  //     },
  //     true
  //   );
  // }, []);
  // Suppress console errors caused by adblockers when using YouTube IFrame API
  // This prevents error logging but doesn't affect video playback functionality

  useEffect(() => {
    const adDomains = [
      ".doubleclick.net",
      ".googlesyndication.com",
      ".google-analytics.com",
      ".youtube.com/api/stats/",
      ".youtube.com/pagead/",
      ".youtube.com/ads",
    ];

    const handleError = (e) => {
      if (e.target.src) {
        try {
          const url = new URL(e.target.src);
          // Check if the URL matches any of the ad-related domains
          if (
            adDomains.some((domain) =>
              domain.endsWith("/")
                ? url.pathname.startsWith(domain.slice(0, -1))
                : url.hostname.endsWith(domain)
            )
          ) {
            e.preventDefault();
          }
        } catch (error) {}
      }
    };

    window.addEventListener("error", handleError, true);

    return () => {
      window.removeEventListener("error", handleError, true);
    };
  }, []);

  return (
    <div className="mb-3">
      <div className="text-lg font-semibold mb-2 text-center bg-buttonColor text-white rounded-xl w-full cursor-default">
        YouTube Music
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="YouTube URL"
          onChange={handleInputChange}
          className="rounded-lg px-2 border-2 border-buttonColor focus:border-pastelPink focus:ring-0 focus:outline-none"
        />
        <button
          type="submit"
          className="self-end  mt-2 bg-buttonColor rounded-lg px-2 w-full text-white hover:opacity-95"
        >
          Load Media
        </button>
      </form>
      <div className="mt-2 text-center">
        <div className="w-[220px] overflow-hidden relative">
          <span
            className={`inline-block  whitespace-nowrap ${
              playerDetails.title.length > 20 && "animate-scrollText"
            }`}
          >
            {playerDetails.title ? playerDetails.title : isLoading}
          </span>
        </div>
      </div>
      <div className="player-controls flex gap-4 justify-center mt-2">
        <button
          onClick={actions.previousVideo}
          className={`${
            isLoading === "No Media" && "opacity-50 cursor-not-allowed"
          }`}
          disabled={youtubeObject.type === "video" ? true : false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-skip-start-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.71 5.093 7 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407v-5a.5.5 0 0 0-.79-.407" />
          </svg>
        </button>
        {playerDetails.state === PlayerState.PLAYING ? (
          <button
            onClick={actions.pauseVideo}
            className={`emphasised ${
              isLoading === "No Media" && "opacity-50 cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-pause-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
            </svg>
          </button>
        ) : (
          <button
            onClick={actions.playVideo}
            className={`emphasised ${
              isLoading === "No Media" && "opacity-50 cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
            </svg>
          </button>
        )}

        <button
          onClick={actions.nextVideo}
          className={`emphasised ${
            isLoading === "No Media" && "opacity-50 cursor-not-allowed"
          }`}
          disabled={youtubeObject.type === "video" ? true : false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-skip-end-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407L9.5 8.972V10.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-1 0v1.528z" />
          </svg>
        </button>
        <button
          onClick={handleMediaStop}
          className={`emphasised ${
            isLoading === "No Media" && "opacity-50 cursor-not-allowed"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-stop-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5z" />
          </svg>
        </button>
      </div>

      <div className="flex gap-4 mt-3 justify-center">
        <input
          type="range"
          value={playerDetails.volume ?? 0}
          className={`emphasised accent-buttonColor ${
            isLoading === "No Media" && "opacity-50 cursor-not-allowed"
          }`}
          min={0}
          max={100}
          onChange={(event) => actions.setVolume(event.target.valueAsNumber)}
          disabled={isLoading === "No Media" ? true : false}
        />
        <span className="cursor-default">{renderVolumeIcon()}</span>
      </div>
    </div>
  );
};

export default YTMusic;
