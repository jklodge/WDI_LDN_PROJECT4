import React from 'react';

const SearchBar = ({ handleSort, handleSearch }) => {

  return (
    <div>
      <select onChange={handleSort}>
        {/* <option value="price|desc">Price (High - Low)</option>
        <option value="price|asc">Price (Low - High)</option>
        <option value="brand|asc">Brand (A - Z)</option>
        <option value="brand|desc">Brand (Z - A)</option> */}
        <option value="">None</option>
        <option value="title|asc">Title (A - Z)</option>
        <option value="title|desc">Title (Z - A)</option>
        <option value="vegan">Diet (Vegan)</option>
      </select>
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
