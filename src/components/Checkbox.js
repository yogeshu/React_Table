// import React from 'react'

import React from "react";

function Checkbox({ checkData, check, checkfilter, handleInputCheck }) {
  return (
    <>
      <div className="ucheckbox-list">
        <span> TYPE</span>
        <br />
        {checkData.map((item, id) => (
          <label key={id} className="checkbox">
            <input
              type="checkbox"
              defaultChecked={check}
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
