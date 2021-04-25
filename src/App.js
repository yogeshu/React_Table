import React from 'react'
import Checkbox from './components/Checkbox'
import Search from './components/Search'
import './App.css';

function App() {
  return (
    <div classNameName="responsive-table">
     <Checkbox/>
     <Search/>
     <div className="App">
      
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
          
        </tbody>
      </table>
   

    </div>
    </div>
  );
}

export default App;
