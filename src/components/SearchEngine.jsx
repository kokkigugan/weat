import React from "react";

function SearchEngine({ query, setQuery, search }) {
  return (
    <div className="flex items-center bg-white bg-opacity-80 rounded-lg shadow-lg p-4 w-full max-w-md">
      <input
        type="text"
        className="flex-grow p-2 rounded-l-lg focus:outline-none"
        placeholder="Enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-r-lg"
        onClick={search}
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchEngine;
