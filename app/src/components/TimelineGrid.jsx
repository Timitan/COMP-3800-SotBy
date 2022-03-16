import React, { useEffect } from "react";
import _ from "lodash";
import RowHeader from './RowHeader';
import Form from "./Form";
import Popup from "reactjs-popup";
import { useState } from "react";

export default function TimelineGrid({socket, heightLimit, instructorArray, createCourse, totalWeeks, onRemoveUser, onAddUser}) {
    // let dateOffset = new Date(new Date().getFullYear(), 0, 1);

    // TODO: Once users and their IDs are established, replace the keys below with the appropriate user ID
    const initialRowHeaderArray = instructorArray;

    // 100px height cells + 4 px total margin, change later if needed
    const rowHeight = 204; 

    const [height, setHeight] = useState(initialRowHeaderArray.length * rowHeight);
    const [rowHeaderArray, setRowHeaderArray] = useState(initialRowHeaderArray);

    // TODO: Change row headers to take in a key and a text
    const addRowHeader = (user, emit=true) => {
        const length = rowHeaderArray.length;
        setRowHeaderArray(rowHeaderArray => [...rowHeaderArray, {key: user.username, name: user.firstname + " " + user.lastname}]);
        heightLimit.set((rowHeaderArray.length + 1) * 2);
        setHeight(height => height + rowHeight);
        onAddUser(user);
        console.log("Length in Timeline: " + rowHeaderArray.length);
        
        if(emit)
            socket.emit('userAdded', user, length);
    }

    const removeRowHeader = (key, x, emit=true) => {
        console.log("Key: " + key);
        console.log("X: " + x);

        let modifiedArray = rowHeaderArray;
        const initialLength = modifiedArray.length;
        console.log(modifiedArray);
        modifiedArray = _.reject(rowHeaderArray, (element) => {return element.key === key})
        console.log(modifiedArray);

        if(modifiedArray.length !== initialLength) {
            setRowHeaderArray(modifiedArray);
            setHeight(height => height - rowHeight);
            heightLimit.set((rowHeaderArray.length - 1) * 2);
            onRemoveUser(key, x - 1);

            if(emit)
                socket.emit('userDeleted', key, x); 
        }
    }
    
    const createRowHeader = (item, i) => {
        const x = i * 2 + 1;
        return <RowHeader key={item.key + "rowHeader" + i} socket={socket} text={item.name} 
                position={{x: x, y: 1}} width={totalWeeks} height={2}
                removeFunction={() => {
                    removeRowHeader(item.key, x)}} 
                    createCourse={createCourse}/>
    }

    socket.once("userAdded", (user) => {
        console.log("Added: " + JSON.stringify(user));
        addRowHeader(user, false);
    });

    socket.once("userDeleted", (id, x) => {
        console.log(x);
        console.log(id);
        removeRowHeader(id, x, false);
    });

    // useEffect(() => {
    //     socket.once("userAdded", (user) => {
    //         console.log("Added: " + JSON.stringify(user));
    //         addRowHeader(user, false);
    //     });

    //     socket.once("userDeleted", (id, x) => {
    //         console.log(x);
    //         console.log(id);
    //         removeRowHeader(id, x, false);
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

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
            <Popup trigger={<button id="addRowBtn" name="addRowBtn">Add Row</button>} modal>
                <div className="add-row-modal-bg">
                    <Form text={"Add Row: "} title={"user"} textObject={["Username", "First Name", "Last Name", "Email", "Password"]}callBack={(user) => {addRowHeader(user)}}/>
                </div>
            </Popup>
        </React.Fragment>
    );
}