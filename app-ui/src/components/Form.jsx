import React, { useState } from "react";

export default function Form({title, textObject, callBack}) {
    const [input, setInput] = useState({datejoined: new Date().getTime()}); // '' is the initial state value
    return (
      <div key={title + " div"} style={{display: "inline",position: "sticky", zIndex:99}}>
        <label>{title}</label>
        {textObject.map((item, i) => {
          return(
            <React.Fragment key={item + " container"}>
              <label key={item + " label"}>{item}</label>
              <input key={item + " input"} onInput={e => setInput({...input, [item.split(" ").join("").toLowerCase()]: e.target.value})}/>
              <br />
            </React.Fragment>
          )
        })}
        <button key={title + " button"} onClick={() => callBack({...input})}>Submit</button>
      </div>
    );
}