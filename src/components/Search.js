import React from 'react'

const Search = ({search,handleSearchName}) => {
    return (
        <div>
           <input
        type="text"
        placeholder="search by name"
      
        value={search}
        onChange={handleSearchName}
      />
        </div>
    )
}

export default Search
