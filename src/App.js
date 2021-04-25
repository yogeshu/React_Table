import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.min.css'
import Checkbox from "./components/Checkbox";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoding] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  const [search, setSearch] = useState("");

  const [checkfilter, setCheckFilter] = useState(new Map());
  const [check ,setCheked] = useState(false)


  // using filter data on top for avoid rendring issue due to null varible 
  const filterData = data.filter((types) => {
    return (
      types.name
        .toString()
        .toLowerCase()
        .indexOf(search.toLocaleLowerCase()) !== -1 ||
      types.icao.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ||
      types.elevation
        .toString()
        .toLowerCase()
        .indexOf(search.toLocaleLowerCase()) !== -1 ||
      types.latitude
        .toString()
        .toLowerCase()
        .indexOf(search.toLocaleLowerCase()) !== -1 ||
      types.longitude
        .toString()
        .toLowerCase()
        .indexOf(search.toLocaleLowerCase()) !== -1||
        types.type
        .toString()
        .toLowerCase()
        .indexOf(search.toLocaleLowerCase()) !== -1
    );
  });

  // fitelr data 

  // fetching of data from json file 
  const getData = () => {
    fetch("./airports.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        setLoding(true);
        return response.json();
      })
      .then((data) => setData(data), setLoding(false));
    //  console.log(data);
  };
// using useEffect for updating data 
  useEffect(() => {
    getData();
  }, []);




//  fucntion for pagination
  const PER_PAGE = 4;
  const offset = currentPage * PER_PAGE;
  const currentPageData = filterData.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(filterData.length / PER_PAGE);
  const handleSearchName = (e) => {
    setSearch(e.target.value);
  };


  
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const paginationOffset = currentPage * PER_PAGE;

  const paginatedEntries = filterData.slice(
    paginationOffset,
    paginationOffset + PER_PAGE
  );

  const checkData = ["small", "large"];
  const handleInputCheck = (e,checked=false) => {
    setCheckFilter({ ...checkfilter, [e.target.name]: e.target.checked });

    const newdata = data.filter((types) => {
      return types.type.includes("small");
  
    });
    if (newdata) {
      setData(
        data.filter((types) => {
          return types.type.includes("small");
        })
      );
    } else {
      setData(data);
    }

    console.log(checkfilter);
  };



  return (
    <div className="responsive-table">
      <Checkbox checkData={checkData} handleInputCheck={handleInputCheck} checkfilter={checkfilter} check={check} />
      <Search search={search} handleSearchName={handleSearchName} data={data}  />
      
      {/* <label>
        small
        <input type="checkbox"
       checked={} onChange=} />
      </label> */}
      {/* <label>
        medium
        <input type="checkbox" />
      </label>
      <label>
        large
        <input type="checkbox" />
      </label> */}

      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> ICA </th>
            <th> IATA </th>
            <th> ELe. </th>
            <th> Lat. </th>
            <th> Long. </th>
            <th> type </th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.length === 0 ? "nodata" : null}
          {currentPageData.length > 0 &&
            currentPageData.map((d) => (
              <tr key={d.id}>
                <td> {d.name} </td>
                <td> {d.icao} </td>
                <td> {d.iata} </td>
                <td> {d.elevation}ft</td>
                <td> {(Math.round(d.latitude * 100) / 100).toFixed(2)}</td>
                <td> {(Math.round(d.longitude * 100) / 100).toFixed(2)}</td>
                <td> {d.type} </td>
              </tr>
            ))}
        </tbody>
      </table>
      Entries ({paginationOffset + 1}-
        {paginationOffset + paginatedEntries.length} of {filterData.length})
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        // pageRangeDisplayed={2}
        pageLinkClassName={"pageCount"}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
}

export default App;
