// import React from 'react'

import React from 'react'

function Checkbox({checkData,check,checkfilter,handleInputCheck}) {
    return (
        <>
            {checkData.map((item, id) => (
        <label key={id}>
          {item}
          <input style={{display:'inline-block'}} 
            type="checkbox"
            defaultChecked={check}
            name={item}
            checked={checkfilter[item]}
            onChange={handleInputCheck}
          />
        </label>
      ))}
        </>
    )
}

export default Checkbox
