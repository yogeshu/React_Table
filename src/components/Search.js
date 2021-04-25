import React from 'react'

const Search = ({search,handleSearchName}) => {
    return (
        <>
           <input style={{display:'inline-block'}} className="table-search"
        type="text"
        placeholder="search by name"
      
        value={search}
        onChange={handleSearchName}
      />
        </>
    )
}

export default Search
