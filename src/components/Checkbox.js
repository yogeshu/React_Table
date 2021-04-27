// import React from 'react'

import React from "react";

function Checkbox({ checkData, checkfilter, handleInputCheck }) {
  return (
    <>
      <div className="ucheckbox-list">
        <span> Type </span> <br />
        {checkData.map((item, index) => (
          <label key={index} className="checkbox">
            <input
              type="checkbox"
              name={item}
              checked={checkfilter[item]}
              onChange={handleInputCheck}
            />{" "}
            {item}
          </label>
        ))}
      </div>
    </>
  );
}

export default Checkbox;
