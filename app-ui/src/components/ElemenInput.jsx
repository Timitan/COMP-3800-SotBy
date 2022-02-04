import { useState } from "react";

export default function ElementInput({text, callBack}) {
    const [input, setInput] = useState(''); // '' is the initial state value
    return (
      <div style={{display: "inline",position: "sticky", zIndex:99}}>
      <label>{text}</label>
      <input value={input} onInput={e => setInput(e.target.value)}/>
      <button onClick={() => callBack(input === '' ? "None" : input)}>Submit</button>
      </div>
    );
}