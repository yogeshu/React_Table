// import React from 'react'

import React from 'react'

function Checkbox({checkData,check,checkfilter,handleInputCheck}) {
    return (
        <div>
            {checkData.map((item, id) => (
        <label key={id}>
          {item}
          <input
            type="checkbox"
            defaultChecked={check}
            name={item}
            checked={checkfilter[item]}
            onChange={handleInputCheck}
          />
        </label>
      ))}
        </div>
    )
}

export default Checkbox
