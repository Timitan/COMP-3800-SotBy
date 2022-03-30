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
import { ReactSession } from 'react-client-session';
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import DefaultNav from "./DefaultNav";
import '../navbar.css'

function SelectNav(props) {
    const userStatus = props.userStatus;
    if (userStatus === 1) {
        return <AdminNav />
    } 
    if (userStatus === 0) {
        return <UserNav />
    }
    return <DefaultNav /> 
}

export default function Timeline({ socket, heightLimit, instructorArray }) {

    let dateOffset = new Date(new Date().getFullYear(), 0, 1);

    const weekInformation = { weekNum: 0, weekRangesArray: [], indexMap: {} };
    const initialMonthArray = Array.from(Array(12).keys()).map((item, i) => {
        return ({
            monthIndex: i,
            weeks: getWeeks(dateOffset, i, weekInformation),
        });
    });
    //console.log(initialMonthArray);
    //const weekInformation = new TwoWayMap(weekRangeInformation.weekRanges); 
    //console.log("Week information: " + JSON.stringify(weekInformation.map) + " \n| Week information rev: " + JSON.stringify(weekInformation.reverseMap));

    const monthNameArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // // TODO: Once users and their IDs are established, replace the keys below with the appropriate user ID
    // const initialRowHeaderArray = instructorArray;
    // /*
    // const initialRowHeaderArray = [
    //     {key: "jackson1", name: "Jackson"},
    //     {key: "pete2", name: "Pete"},
    //     {key: "michelle3", name: "Michelle"},
    //     {key: "ken4", name: "Ken"},
    // ];
    // */

    // // 100px height cells + 4 px total margin, change later if needed
    // const rowHeight = 204;

    // const [height, setHeight] = useState(initialRowHeaderArray.length * rowHeight);
    const [monthArray, setMonthArray] = useState(initialMonthArray);
    let totalWeeks = 0;
    for (let i = 0; i < monthArray.length; i++) {
        totalWeeks += monthArray[i].weeks.length;
    }

    const createMonth = (item, i) => {
        return <Month key={monthNameArray[item.monthIndex] + " month"} title={monthNameArray[item.monthIndex]}
            position={{ x: 1, y: i === 0 ? i + 3 : getNumberOfWeeks(initialMonthArray, i) + 3 }} weeks={item.weeks} />
    }

    // socket.on("userAdded", (user) => {
    //     addRowHeader(user, false);
    // });

    // socket.on("userDeleted", (id) => {
    //     removeRowHeader(id, false);
    // });
    

    return (
        <React.Fragment>
            <SelectNav userStatus={ReactSession.get("admin")} />
            <div className="grid-container-months">
                {
                    monthArray.map((item, i) => {
                        return (
                            createMonth(item, i)
                        )
                    })
                }
            </div>
            {/* <div className="grid-container-layout" style={{height:height}}>
                {
                    rowHeaderArray.map((item, i) => {
                        return (
                            createRowHeader(item, i)
                        )
                    })
                }
            </div> */}
            {/* <Popup trigger={<button>Add Row</button>} modal>
                <div className="add-row-modal-bg">
                    <Form text={"Add Row: "} textObject={["Username", "First Name", "Last Name", "Email", "Password"]}callBack={(text) => addRowHeader(text)}/>
                </div>
            </Popup> */}
            {/*this.inputBox
            <button onClick={this.addMonth}>Add Row</button>*/}
            <NoCollisionLayout socket={socket} heightLimit={heightLimit} instructorArray={instructorArray} weekInformation={weekInformation} totalWeeks={totalWeeks} />
        </React.Fragment>
    );
}

function getWeeks(startDate, month, weekInformation) {
    const weeks = [];
    const weekTimes = { month: startDate.getMonth(), times: [] };

    // Retrieve first days of every week in all of the months
    while (startDate.getMonth() == month) {
        // Save the date to an array to position courses in the timeline
        const index = weekInformation.weekNum + weeks.length
        const date = new Date(startDate.getTime());
        weekTimes.times.push({ index: index, date: date });
        weekInformation.indexMap[index] = date;

        // Get the first day of every week
        weeks.push(startDate.getDate());

        // Increment the date by a week
        startDate.setDate(startDate.getDate() + 7);
    }

    weekInformation.weekRangesArray.push(weekTimes);
    weekInformation.weekNum += weeks.length;
    //console.log(weekInformation);
    return weeks;
}

function getNumberOfWeeks(weeks, index) {
    let sum = 0;

    //console.log(weeks)
    //console.log(weeks[0].weeks.length);
    for (let i = index - 1; i >= 0; i--) {
        sum += weeks[i].weeks.length;
    }

    return sum;
}