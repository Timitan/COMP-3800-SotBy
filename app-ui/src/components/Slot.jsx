import React from "react";
import { useDrop } from 'react-dnd'

export default function Slot({socket, position, createCourse}) {

    return(
        <React.Fragment>
          <div className="grid-slot" style={{gridArea: position.x + " / " + position.y + " / span 1 / span 1"}}>
            <button 
            style={{opacity:0, height:'100%', width: '100%', position: "relative", zIndex:99}} 
            onClick={() => {console.log("clicked")}}>
              
            </button>
          </div>
        </React.Fragment>
    );
}