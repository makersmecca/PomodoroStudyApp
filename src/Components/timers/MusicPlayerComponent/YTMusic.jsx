import { useState } from "react";

const YTMusic = ({ onTrackSelect }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        setError("Invalid YouTube URL. Please check the URL and try again.");
        return;
      }

      // Notify parent component with the video ID
      onTrackSelect(videoId);
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
