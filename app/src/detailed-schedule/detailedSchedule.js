import React from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './index.css';
import _ from "lodash";

const END_POINT_ROOT = "http://localhost:8000/";


class Day extends React.Component {

  constructor({ props, info, socket }) {
    super(props);
    this.state = {
      editMode: false,
      instructor: info.username,
      description: info.description,
    }
    this.ds_id = info.ds_id;
    // this.resources = info.resources;  RESSSSSSSS***************************************************************** Q: should users be able to change instructor from this page? (new course_assignment is required!)
    this.date = info.date;
    this.socket = socket;
  }

  handleSave = ({ name, value, previousValue }) => {
    if (name == "instructor") {
      this.setState({ instructor: value });
    } else {
      this.setState({ description: value });
    }
  };

  handleEditSave() {
    this.setState({
      editMode: !this.state.editMode,
    });
    if (this.state.editMode) {
      this.socket.emit("changeDay", { id: this.id, resources: this.resources, instructor: this.state.instructor, description: this.state.description, date: this.date.getTime() });
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
          {this.state.description ? (<button onClick={() => this.handleEditSave()}>{descEditSave}</button>) : null}
        </td>
      </tr>
    );
  }
}

class Week extends React.Component {

  constructor({ props, info, socket }) {

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

      this.setState({
        days: _.reduce(copyDays, (acc, day) => {
          const dayData = day;
          return [...acc, dayData];
        }, [])
      });

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


  constructor({ props, socket }) {
    super(props);
    this.socket = socket;
    this.state = {
      data: null,
      dataLoaded: false,
    }
  }

  renderWeek(weekInfo) {
    return (
      <Week key={weekInfo[0].ds_id}
        info={weekInfo}
        socket={this.socket}
      />
    );

  }

  renderCourse() {
    let weeksData = new Array();
    const chunk = 7; // # days in a week.
    for (let i = 0, j = this.state.data.length; i < j; i += chunk) {
      weeksData.push(this.state.data.slice(i, i + chunk));
    }
    const weeks = weeksData.map((week, index) => {
      return (
        this.renderWeek(week)
      );
    });
    return (
      <div>
        <h1>Detailed Schedule for {`${this.state.data[0].subject} - ${this.state.data[0].course}`}</h1>
        {weeks}
      </div>
    );
  }

  //----
  parseData = (data) => {
    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);

    for (let i = 0; i < parsedData.rows.length; i++) {
      parsedData.rows[i].date = new Date(parsedData.rows[i].date); // Changing date from string-date to date object.
    }


    this.setState({ data: parsedData.rows });
    this.setState({ dataLoaded: true });
  }

  retrieveDailyScheduleDataFromDatabase = (courseNum) => {
    fetch(END_POINT_ROOT + `detailedSchedule?courseNum=${courseNum}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        this.parseData(data)
      });
  }

  componentDidMount() {
    let courseNum = 12345;
    this.retrieveDailyScheduleDataFromDatabase(courseNum);
  }
  //----

  render() {
    return (this.state.dataLoaded ? this.renderCourse() :
      <span>Loading data...</span>
    );
  }

}

const DetailedSchedule = (socket) => {
  return (
    <Course socket={socket.socket}></Course>
  );
}

export default DetailedSchedule;

function getStringDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (months[date.getMonth()] + " " + date.getDate());
}
