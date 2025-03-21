import React, { useState } from 'react';
import VoiceSearch from './VoiceSearch';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query); // Call onSearch with the query
    }
  };

  return (
    <div className="search-bar flex">
      <div style={{width:"16rem"}}  className="combined-search">
        <input
          type="text"
          className="news-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <button className="search-button" onClick={handleSearch}>
          <img src="./search_button.png" alt="Search" className="search-icon" />
        </button>
      </div>
      <VoiceSearch setQuery={setQuery} />
    </div>
  );
};

export default SearchBar;
