import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import Checkbox from "./components/Checkbox";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoding] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
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
  const currentPageData = data.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(data.length / PER_PAGE);
 

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const paginationOffset = currentPage * PER_PAGE;

  const paginatedEntries = data.slice(
    paginationOffset,
    paginationOffset + PER_PAGE
  );





  return (
    <div className="responsive-table">
      <Checkbox />
      <Search />

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
    </div>
  );
}

export default App;
