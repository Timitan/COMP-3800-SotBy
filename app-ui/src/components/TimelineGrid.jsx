import React, { useEffect } from "react";
import Month from './Month';
import _ from "lodash";
import RowHeader from './RowHeader';
import Form from "./Form";
import Popup from "reactjs-popup";
import { useState } from "react";
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import CourseElement from "./CourseElement";
import NoCollisionLayout from './NoCollisionLayout';
// import DragFromOutsideLayout from "./DragFromOutside";

export default function TimelineGrid({socket, heightLimit, instructorArray}) {

    let dateOffset = new Date(new Date().getFullYear(), 0, 1);

    // TODO: Once users and their IDs are established, replace the keys below with the appropriate user ID
    const initialRowHeaderArray = instructorArray;

    // 100px height cells + 4 px total margin, change later if needed
    const rowHeight = 204;

    const [height, setHeight] = useState(initialRowHeaderArray.length * rowHeight);
    const [rowHeaderArray, setRowHeaderArray] = useState(initialRowHeaderArray);

    // TODO: Change row headers to take in a key and a text
    const addRowHeader = (user, emit=true) => {
        heightLimit.set((rowHeaderArray.length + 1) * 2);
        setRowHeaderArray([...rowHeaderArray, {key: user.username, name: user.firstname + " " + user.lastname}]);
        setHeight(height + rowHeight);
        console.log("Length in Timeline: " + rowHeaderArray.length);

        if(emit) {
            socket.emit('userAdded', user);
        }
    }

    // TODO: Find a key in the row header array and remove that instead of the name
    const removeRowHeader = (key, emit=true) => {
        heightLimit.set((rowHeaderArray.length - 1) * 2);
        setRowHeaderArray(_.reject(rowHeaderArray, (element) => {return element.key == key}))
        setHeight(height - rowHeight);
        if(emit) {
            socket.emit('userDeleted', key);
        }
    }
    
    const createRowHeader = (item, i) => {
        return <RowHeader key={item.key + "rowHeader" + i} socket={socket} text={item.name} 
                position={{x: i*2+1, y: 1}} width={12 * 5} height={2}
                removeFunction={() => removeRowHeader(item.key)}/>
    }

    socket.on("userAdded", (user) => {
        addRowHeader(user, false);
    });

    socket.on("userDeleted", (id) => {
        removeRowHeader(id, false);
    });

    return(
        <React.Fragment>
            <div className="grid-container-layout" style={{height:height}}>
                {
                    rowHeaderArray.map((item, i) => {
                        return (
                            createRowHeader(item, i)
                        )
                    })
                }
            </div>
            <Popup trigger={<button>Add Row</button>} modal>
                <div className="add-row-modal-bg">
                    <Form text={"Add Row: "} textObject={["Username", "First Name", "Last Name", "Email", "Password"]}callBack={(text) => addRowHeader(text)}/>
                </div>
            </Popup>
            {/*this.inputBox
            <button onClick={this.addMonth}>Add Row</button>*/}
        </React.Fragment>
    );
}