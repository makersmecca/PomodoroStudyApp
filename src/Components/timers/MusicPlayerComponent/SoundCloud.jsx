import { useState } from "react";
const SoundCloud = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="mb-3">
      <div className="text-lg font-semibold mb-2 text-center bg-buttonColor text-white rounded-xl w-full cursor-default">
        SoundCloud
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Music"
          onChange={handleSearchInput}
          value={searchInput}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default SoundCloud;
