import { PlayerState, useYoutube } from "react-youtube-music-player";
import { useEffect } from "react";

const YTMusic = () => {
  const { playerDetails, actions } = useYoutube({
    id: "RDLbqzhXWl33U",
    type: "playlist",
  });

  const renderVolumeIcon = () => {
    if (playerDetails.volume === 0) {
      return "mute";
    }
    if (playerDetails.volume <= 30) {
      return "lowvol";
    }
    if (playerDetails.volume <= 60) {
      return "medvol";
    }
    return "highvol";
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

  return (
    <div className="App">
      <h1>react-youtube-music-player</h1>
      <div className="video-title">
        {playerDetails.title ? playerDetails.title : "loading"}
      </div>
      <div className="player-controls flex gap-4">
        <button onClick={actions.previousVideo}>Previous</button>
        {playerDetails.state === PlayerState.PLAYING ? (
          <button className="emphasised" onClick={actions.pauseVideo}>
            Pause
          </button>
        ) : (
          <button className="emphasised" onClick={actions.playVideo}>
            Play
          </button>
        )}
        <button onClick={actions.stopVideo}>Stop</button>
        <button onClick={actions.nextVideo}>Next</button>
      </div>
      <div className="volume-control">
        {renderVolumeIcon()}
        <input
          type="range"
          value={playerDetails.volume ?? 0}
          min={0}
          max={100}
          onChange={(event) => actions.setVolume(event.target.valueAsNumber)}
        />
      </div>
    </div>
  );
};

export default YTMusic;
