import { useState } from "react";

const SoundCloud = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // You'll need to add your SoundCloud API client ID
      const response = await fetch(
        `https://api.soundcloud.com/tracks?q=${searchInput}&client_id=${process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="mb-3">
      <div className="text-lg font-semibold mb-2 text-center bg-buttonColor text-white rounded-xl w-full cursor-default">
        SoundCloud
      </div>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search Music"
          onChange={handleSearchInput}
          value={searchInput}
          className="flex-1 p-2 border rounded"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-buttonColor text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {/* Add results display section */}
      <div className="mt-4">
        {searchResults.map((track) => (
          <div key={track.id} className="p-2 border-b">
            {track.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoundCloud;
