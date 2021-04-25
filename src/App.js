import React,{useState,useEffect} from 'react'
import Checkbox from './components/Checkbox'
import Search from './components/Search'
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoding] = useState(false);

   


  const getData = () => {
    fetch("./airports.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function (response) {
        setLoding(true);
        return response.json();
      })
      .then((data) => setData(data), setLoding(false));
       console.log(data);
     
  };
useEffect(()=>{

getData();
},[])









 



  return ( 
    
    <div className="responsive-table">
     <Checkbox/>
     <Search/>
      
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
        {data.length === 0 ? "Nodata" : null}
          {data.length > 0 &&
            data.map((d) => (
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
