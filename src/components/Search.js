import React from "react";

const Search = ({ search, handleSearchName }) => {
  return (
    <>
      <div className="ulist">
        <label className="input-label">
          Filter By Search
          <br />
          <input
            className="input-search"
            type="text"
            placeholder="search by name"
            value={search}
            onChange={handleSearchName}
          />
        </label>
      </div>
    </>
  );
};

export default Search;
