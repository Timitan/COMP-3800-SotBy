import React from "react";
import { useDrop } from 'react-dnd'
import Form from "./Form";
import Popup from "reactjs-popup";

export default function Slot({socket, position, createCourse}) {

    return(
        <React.Fragment>
          <div className="grid-slot" style={{gridArea: position.x + " / " + position.y + " / span 1 / span 1"}}>
            <Popup trigger={
              <button 
              style={{opacity: 0, height:'100%', width: '100%', position: "relative", zIndex:99}} 
              onClick={() => {console.log("clicked")}}>
                
              </button>
            } modal>
                <div className="add-row-modal-bg">
                    <Form text={"Add Row: "} 
                    textObject={["Number", "Subject", "Course", "Title", "Divs", "Dept Num", "Sect Num", "Ptrm", "Camp", "Week Length", "Color"]}
                    callBack={(course) => createCourse(course, position.y - 3, position.x - 1)}/> {/*Coordinates are based on CSS grid, needs to be offset*/}
                </div>
            </Popup>
          </div>
        </React.Fragment>
    );
}