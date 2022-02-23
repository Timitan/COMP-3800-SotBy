import React from "react";
import Slot from "./Slot";
import { useState } from "react";
import CourseElement from "./CourseElement";

export default function RowHeader({socket, position, text, width, height, removeFunction}) {
    //const item = null;

    const createRowSlots = () => {
        let slots = [];
        for(let y = 0; y < width; y++) {
            for(let x = 0; x < height; x++) {
                slots.push({
                    key: text + "x:" + (position.x + x) + "y:" + (position.y + y),
                    pos: {x: position.x + x, y: position.y + y + 2},
                });
            }
        }
        return slots;
    }

    const createSlot= (item, i) => {
        return(
            <Slot key={item.key} socket={socket} position={{x: item.pos.x, y: item.pos.y}}/>
        );
    }

    const [slotArray, setSlotArray] = useState(createRowSlots());

    return(
        <React.Fragment>
            <div className="grid-row-header" style={{gridArea: position.x + " / " + position.y + " / span 2 / span 2"}}>
                <button className="grid-row-header-close" onClick={removeFunction}>
                    <p>Remove</p>
                </button>
                <p>{text}</p>
            </div>
            {slotArray.map((item, i) => {
                return (
                    createSlot(item, i)
                )
            })}
        </React.Fragment>
    );
}