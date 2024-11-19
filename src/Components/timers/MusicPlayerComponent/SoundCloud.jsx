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
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-between"
      >
        <input
          type="text"
          placeholder="Search Music"
          onChange={handleSearchInput}
          value={searchInput}
          className="rounded-lg px-2 py-0.5 border-2 border-buttonColor focus:border-pastelPink focus:ring-0 focus:outline-none w-[180px]"
        />
        <button
          type="submit"
          className="w-[32px] px-1 py-1.5 bg-buttonColor rounded-lg text-white hover:opacity-95 flex justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2%"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </form>
    </div>
  );
};
export default SoundCloud;
