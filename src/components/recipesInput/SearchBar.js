import React from 'react';

const SearchBar = ({ handleSort, handleSearch }) => {

  return (
    <div>
      <div className="select">
        <select onChange={handleSort}>
          <option value="">None</option>
          <option value="title|asc">Title (A - Z)</option>
          <option value="title|desc">Title (Z - A)</option>
          <option value="vegan">Diet (Vegan)</option>
          <option value="vegetarian">Diet (Vegetarian)</option>
          <option value="pescetarian">Diet (Pescetarian)</option>
          <option value="paleo">Diet (Paleo)</option>
        </select>
      </div>
      <input
        className="input"
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
