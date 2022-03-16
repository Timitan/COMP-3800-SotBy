import React from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './index.css';
import _ from "lodash";


class Day extends React.Component {

  constructor({props, info, socket}) {
    super(props);
    this.state = {
      editMode: false,
      instructor: info.instructor,
      description: info.description,
    }
    this.id = info.id;
    this.resources = info.resources;
    this.date = info.date;
    this.socket = socket;
  }

  handleSave = ({ name, value, previousValue }) => {
    if (name == "instructor") {
        this.setState({instructor: value});
    } else {
        this.setState({description: value});
    }
  };

handleEditSave() {
  this.setState({
    editMode: !this.state.editMode,
  });
  if (this.state.editMode) {
    this.socket.emit("changeDay", {id: this.id, resources: this.resources, instructor: this.state.instructor, description: this.state.description, date: this.date.getTime()});
  }
  return;
}

  render() {
    const descEditSave = this.state.editMode ? "Save" : "Edit";

    return (
      <tr>
        <td>
          <EditText
            name="date"
            defaultValue={getStringDate(this.date)}
            readonly
          />
        </td>
        <td>
          <EditText
            name="instructor"
            defaultValue={this.state.instructor}
            onSave={this.handleSave}
            readonly={!this.state.editMode}
          />
        </td>
        <td>
          <EditText
            name="description"
            defaultValue={this.state.description ? this.state.description : "Weekend!"}
            onSave={this.handleSave}
            readonly={!this.state.editMode}
          />
        </td>
        <td>
        {/* <Router>
          <Link to="/resources"> Book Resources </Link>
        </Router> */}
          <EditText
            name="resources"
            defaultValue={this.resources}
            // onSave={this.handleSave}
            readonly={!this.state.editMode}
          />
        </td>
        <td>
        { this.state.description ? (<button onClick={() => this.handleEditSave()}>{descEditSave}</button>) : null }
        </td>
      </tr>
    );
  }
}

class Week extends React.Component {

  constructor({props, info, socket}) {
      
    super(props);
    this.state = {
        days: info,
    }
    this.socket = socket;

    this.socket.on('changeDay', (rowInfo) => {

        rowInfo.date = new Date(rowInfo.date);

        let index;
        
        for (let i = 0; i < this.state.days.length; i++) {
            if (this.state.days[i].id == rowInfo.id) {
                index = i;
                break;
            }
        }

        let copyDays = this.state.days.slice();
        copyDays[index] = rowInfo;

        this.setState({days: _.reduce(copyDays, (acc, day) => {
            const dayData = day;
            return [...acc, dayData];
        }, [])});

    })
  }

  renderDay(dayInfo) {
    return (
      <Day key={dayInfo.id + dayInfo.instructor + dayInfo.description}
        info={dayInfo}
        socket={this.socket}
      />
    );
  }

  render() {
    const days = this.state.days.map((day, index) => {
        return (
            this.renderDay(day)
        );
      });
    return (
      <table>
        <caption>Schedule for week of {getStringDate(this.state.days[0].date)}</caption>
        <thead>
          <tr>
            <th>Date</th>       
            <th>Instructor</th>
            <th>Description</th>
            <th>Resources</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {days}
        </tbody>
      </table>
    );
  }
}

class Course extends React.Component {


    constructor({props, socket}) {
        super(props);
        this.socket = socket;
    }

  renderWeek(weekInfo) {
    return (
      <Week key={weekInfo[0].id}
        info={weekInfo}
        socket={this.socket}
      />
    );

  }

  render() {
    let data = generateRandomData();

    let weeksData = new Array();
    const chunk = 7; // # days in a week.
    for (let i = 0, j = data.length; i < j; i += chunk) {
        weeksData.push(data.slice(i, i + chunk));
    }
    const weeks = weeksData.map((week, index) => {
      return (
        this.renderWeek(week)
      );
    });
    return (
      <div>
        <h1>Detailed Schedule for {this.props.courseName}</h1>
        {weeks}
      </div>
    );
  }

  getCourseDetail(ca_id, emit = true) {


    if(emit) {
        this.socket.emit("getCourseDetail", ca_id);
      }
  }
}

const DetailedSchedule = (socket) => {
    return (
      <Course courseName="ASTO1" socket={socket.socket}></Course>
    );
}

export default DetailedSchedule;

function getStringDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (months[date.getMonth()] + " " + date.getDate());
}


function generateRandomData() {
  
    const day1 = {
      id: "id1",
      date: new Date(2022, 0, 3),
      instructor: "Sam",
      description: "Workplace Safety",
      resources: null,
    };
    const day2 = {
      id: "id2",
      date: new Date(2022, 0, 4),
      instructor: "Daniel",
      description: "Workplace Safety",
      resources: null,
    };
    const day3 = {
      id: "id3",
      date: new Date(2022, 0, 5),
      instructor: "Tim",
      description: "Workplace Safety",
      resources: null,
    };
    const day4 = {
      id: "id4",
      date: new Date(2022, 0, 6),
      instructor: "Max",
      description: "Tools & Equipment",
      resources: null,
    };
    const day5 = {
      id: "id5",
      date: new Date(2022, 0, 7),
      instructor: "Sam",
      description: "Tools & Equipment",
      resources: "ExampleRes",
    };
    const day6 = {
      id: "id6",
      date: new Date(2022, 0, 8),
      instructor: null,
      description: null,
      resources: null,
    };
    const day7 = {
      id: "id7",
      date: new Date(2022, 0, 9),
      instructor: null,
      description: null,
      resources: null,
    };
    const day8 = {
      id: "id8",
      date: new Date(2022, 0, 10),
      instructor: "Sam",
      description: "Tools & Equipment",
      resources: null,
    };
    const day9 = {
      id: "id9",
      date: new Date(2022, 0, 11),
      instructor: "Daniel",
      description: "Tools & Equipment",
      resources: null,
    };
    const day10 = {
      id: "id10",
      date: new Date(2022, 0, 12),
      instructor: "Tim",
      description: "Tools & Equipment",
      resources: null,
    };
    const day11 = {
      id: "id11",
      date: new Date(2022, 0, 13),
      instructor: "Max",
      description: "Tools & Equipment",
      resources: "NE16-Tire Room",
    };
    const day12 = {
      id: "id12",
      date: new Date(2022, 0, 14),
      instructor: "Sam",
      description: "Tools & Equipment",
      resources: "NE16-Tire Room",
    };
    const day13 = {
      id: "id13",
      date: new Date(2022, 0, 15),
      instructor: null,
      description: null,
      resources: null,
    };
    const day14 = {
      id: "id14",
      date: new Date(2022, 0, 16),
      instructor: null,
      description: null,
      resources: null,
    };
    const day15 = {
      id: "id15",
      date: new Date(2022, 0, 17),
      instructor: "Sam",
      description: "Welding",
      resources: null,
    };
    const day16 = {
      id: "id16",
      date: new Date(2022, 0, 18),
      instructor: "Welding",
      description: "Tools & Equipment",
      resources: null,
    };
    
    return ([day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16]);
  }
