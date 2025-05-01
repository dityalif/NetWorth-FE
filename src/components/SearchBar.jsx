import React, { useState } from "react";

export default function SearchBar({ placeholder, onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSearch = () => onSearch && onSearch(query);

  return (
    <div className="flex justify-center items-center py-6 lg:w-1/3 sm:w-3/4">
      <div className="flex items-center w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-3 border 
      border-gray-400 transition-all duration-300 hover:shadow-lg hover:shadow-[#4682B4]  hover:bg-white/35"> 
        <input
          className="w-full p-2 text-sm lg:text-base font-bold bg-transparent text-white placeholder-gray-300 focus:outline-none"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        <button
          className="p-3 mx-2 bg-[#4682B4] transition-all duration-200 hover:bg-[#3B6E98] active:scale-95 text-white rounded-2xl"
          onClick={handleSearch}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}