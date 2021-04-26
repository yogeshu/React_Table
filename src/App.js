import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
// import Checkbox from "./components/Checkbox";
import Search from "./components/Search";
import "./App.css";
import {
  FormControl,
  
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField
} from "@material-ui/core";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoding] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [search, setSearch] = useState("");
  const [first, setFirst] = useState(true);
  // const [checkfilter, setCheckFilter] = useState({});
  const [check, setCheked] = useState(true);
  const [filterCheck, setFilterCheck] = useState([]);
  const [type, setType] = useState([]);
  
  // const [checkfilter, setCheckFilter] = useState(new Map());
  // const [check ,setCheked] = useState(false)
  //  const Arraryfilter = {

  //    filters: [
  //    "small", "large", "medium" , "fake"
  //    ]
  //  }
  const typeData = [
    { type: "small" },
    { type: "medium" },
    { type: "large" },
    { type: "closed" },
    { type: "heliport" }
    // { type: "in your favorites" }
  ];

  const handleChange = (e) => {
    if (e.target.checked) {
     
      setType([...type, e.target.value]);
    } else {
      setType(type.filter((id) => id !== e.target.value));
    }
    console.log(type)

  };

  useEffect(() => {
    if (type.length === 0) {
      setFilterCheck(data);
    } else {
      setFilterCheck(
        data.filter((typeData) =>
          type.some((category) => [typeData.type].flat().includes(category))
        )
      );
    }
  }, [type,data]);

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
        .indexOf(search.toLocaleLowerCase()) !== -1 ||
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
  }, [search,filterCheck]);

  //  fucntion for pagination
  const PER_PAGE = 4;
  const offset = currentPage * PER_PAGE;
  const currentPageData = filterData.slice(offset, offset + PER_PAGE) && filterCheck.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(filterData.length / PER_PAGE);
  const handleSearchName = (e) => {
    setSearch(e.target.value);
  };

  function handleCheck(e) {
    setFirst(!first);
    console.log(first);
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const paginationOffset = currentPage * PER_PAGE;

  const paginatedEntries = filterData.slice(
    paginationOffset,
    paginationOffset + PER_PAGE
  ) || filterCheck.slice(
    paginationOffset,
    paginationOffset + PER_PAGE
  );

  // const checkData = [
  //   "small",
  //   "large",
  //   "medium",
  //   "heliport",
  //   "closed",
  //   "at your favorite",
  // ];
  // const handleInputCheck = (e) => {
  //   // setCheckFilter({ ...checkfilter, [e.target.name]: e.target.checked });
  //   // console.log(checkfilter);

  //   // const newdata = data.filter((types) => {
  //   //   return types.type.includes(e.target.name);

  //   // });
  //   if (e.target.checked) {
  //     setData(
  //       data.filter((types) => {
  //         return types.type.includes(e.target.name);
  //       })
  //     );
  //   } else {
  //     setData(data);
  //   }

  //   // console.log(checkfilter);
  // };

  return (
    <div className="responsive-table">
      <h1>
        {" "}
        Filter <span className="black"> Airports </span>
      </h1>
      <div className="fake-list">
      <div className="ucheckbox-list">
      <span> Type </span> <br/>
      {typeData.map((typeData) => (
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label={typeData.type} 
              value={typeData.type}
            />
          ))}
         </div> 

        <Search
          search={search}
          handleSearchName={handleSearchName}
          data={data}
        />
      </div>
      
      {/* <label>
        small
        <input type="checkbox"
        onChange={handleCheck} />
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

      <p className="pagination__link">
      
        Showing ({paginationOffset + 1}-
        {paginationOffset + paginatedEntries.length} of {filterData.length && filterCheck.length})
        Results{" "}
      </p>
      <div className="page">
        <ReactPaginate
          previousLabel={"← "}
          nextLabel={"→"}
          // pageCount={pageCount}
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
    </div>
  );
}

export default App;
