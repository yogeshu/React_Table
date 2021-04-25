import React from 'react'

const Search = ({search,handleSearchName}) => {
    return (
        <>
           <input
        type="text"
        placeholder="search by name"
      
        value={search}
        onChange={handleSearchName}
      />
        </>
    )
}

export default Search
