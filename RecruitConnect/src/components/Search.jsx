import React, { useState } from 'react';
import "../Searchbar.css";

function SearchBar({ onSearch }) {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ keywords, location, jobTitle });
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Keywords"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Job Title"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;