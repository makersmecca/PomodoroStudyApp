import { useState, useEffect } from "react";

const YTMusic = ({ onTrackSelect }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Initialize AudioContext only when needed
    const initAudioContext = () => {
      try {
        const context = new (window.AudioContext ||
          window.webkitAudioContext)();
        setAudioContext(context);
        return context;
      } catch (err) {
        console.error("Failed to create AudioContext:", err);
        setError("Your browser doesn't support audio playback");
        return null;
      }
    };

    if (!audioContext) {
      initAudioContext();
    }

    // Cleanup
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const handleAudioProcessing = async (audioData) => {
    if (!audioContext) {
      setError("Audio context not available");
      return;
    }

    try {
      // Create a copy of the audio data
      const audioBuffer = audioData.slice(0);

      // Attempt to decode the audio
      const decodedData = await new Promise((resolve, reject) => {
        audioContext.decodeAudioData(
          audioBuffer,
          (decoded) => resolve(decoded),
          (err) => reject(err)
        );
      });

      return decodedData;
    } catch (err) {
      console.error("Audio decoding error:", err);
      setError(
        "Failed to decode audio. Please try a different format or source."
      );
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        setError("Invalid YouTube URL. Please check the URL and try again.");
        return;
      }

      // Resume AudioContext if it was suspended
      if (audioContext?.state === "suspended") {
        await audioContext.resume();
      }

      // Pass both the videoId and audioContext to parent
      onTrackSelect(videoId, audioContext);
    } catch (err) {
      setError("Failed to process the YouTube URL. Please try again.");
      console.error("Error processing YouTube URL:", err);
    }
  };

  const extractVideoId = (url) => {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-center bg-buttonColor text-white rounded-xl w-full">
        Youtube Music
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="w-full p-2 rounded border border-gray-300"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-pastelPurple text-white py-2 rounded hover:bg-opacity-90"
          disabled={!audioContext}
        >
          Play
        </button>
      </form>
      {error && (
        <div className="mt-2 text-red-500 text-sm text-center">{error}</div>
      )}
    </div>
  );
};

export default YTMusic;
