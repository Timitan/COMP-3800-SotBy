import React from "react";
import Month from './Month';
import _ from "lodash";
import RowHeader from './RowHeader';
import ElementInput from "./ElemenInput";
import { useState } from "react";

export default function Timeline({socket, heightLimit}) {
    let dateOffset = new Date(new Date().getFullYear(), 0, 1);

    const initialMonthArray = Array.from(Array(11).keys()).map((item, i) => {
        return({
            monthIndex: i,
            weeks: getWeeks(dateOffset, i),
        });
    });
    //console.log(initialMonthArray);

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
        "December"
    ];

    // TODO: Once users and their IDs are established, replace the keys below with the appropriate user ID
    const initialRowHeaderArray = [
        {key: "jackson1", name: "Jackson"},
        {key: "pete2", name: "Pete"},
        {key: "michelle3", name: "Michelle"},
        {key: "ken4", name: "Ken"},
    ];

    // 100px height cells + 4 px total margin, change later if needed
    const rowHeight = 204;

    const [height, setHeight] = useState(initialRowHeaderArray.length * rowHeight);
    const [monthArray, setMonthArray] = useState(initialMonthArray);
    const [rowHeaderArray, setRowHeaderArray] = useState(initialRowHeaderArray);

    const parseInstructors = (data) => {
        const parsedData = JSON.parse(data);
        const instructorArray = [];
        for(let i = 0; i < parsedData.length; i++) {
            const instructor = {};
            instructor.key = parsedData[i].id;
            instructor.name = parsedData[i].first_name + " " + parsedData[i].last_name;
            instructorArray.push(instructor);
        }
        setRowHeaderArray(instructorArray);
    }

    const retrieveNamesFromDatabase = () => {
        fetch('http://localhost:8000/instructors')
        .then(response => {
            return response.text();
        })
        .then(data => {
            parseInstructors(data)
        });
    }
    retrieveNamesFromDatabase();

    // TODO: Change row headers to take in a key and a text
    const addRowHeader = (text) => {
        heightLimit.set((rowHeaderArray.length + 1) * 2);
        setRowHeaderArray([...rowHeaderArray, {key: text + rowHeaderArray.length, name: text}]);
        setHeight(height + rowHeight);
        console.log("Length in Timeline: " + rowHeaderArray.length);
    }

    // TODO: Find a key in the row header array and remove that instead of the name
    const removeRowHeader = (key) => {
        heightLimit.set((rowHeaderArray.length - 1) * 2);
        setRowHeaderArray(_.reject(rowHeaderArray, (element) => {return element.key == key}))
        setHeight(height - rowHeight);
    }
    
    const createRowHeader = (item, i) => {
        return <RowHeader key={item.key + "rowHeader" + i} socket={socket} text={item.name} 
                position={{x: i*2+1, y: 1}} width={monthArray.length * 5} height={2}
                removeFunction={() => removeRowHeader(item.key)}/>
    }

    const createMonth = (item, i) => {
        return <Month key={monthNameArray[item.monthIndex] + " month"} title={monthNameArray[item.monthIndex]} 
            position={{x: 1, y: i === 0 ? i+3 : getNumberOfWeeks(initialMonthArray, i)+3/*(i) * (item.weeks.length) + 3}*/}} weeks={item.weeks} />
    }

    return(
        <React.Fragment>
            <div className="grid-container-months">
                {
                    monthArray.map((item, i) => {
                        return (
                            createMonth(item, i)
                        )
                    })
                }
            </div>
            <div className="grid-container-layout" style={{height:height}}>
                {
                    //createInitialSlotArray()
                }
                {
                    rowHeaderArray.map((item, i) => {
                        return (
                            createRowHeader(item, i)
                        )
                    })
                }
            </div>
            <ElementInput text={"Add Row: "} callBack={(text) => addRowHeader(text)}/>
            {/*this.inputBox
            <button onClick={this.addMonth}>Add Row</button>*/}
        </React.Fragment>
    );
}

function getWeeks(startDate, month) {
    const weeks = [];
    
    while(startDate.getMonth() == month) {
        weeks.push(startDate.getDate());
        startDate.setDate(startDate.getDate() + 7);
    }
    return weeks;
}

function getNumberOfWeeks(weeks, index) {
    let sum = 0;
    //console.log(weeks[0].weeks.length);
    for(let i = index-1; i >= 0; i--) {
        sum += weeks[i].weeks.length;
    }
    return sum;
}