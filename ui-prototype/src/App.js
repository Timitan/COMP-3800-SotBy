import React from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './index.css';


class Day extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    }
  }

  // handleSave = ({ name, value, previousValue }) => {
  //   alert(name + ' saved as: ' + value + ' (prev: ' + previousValue + ')');
  // };

handleEditSave() {
  this.setState({
    editMode: !this.state.editMode,
  });
  if (this.state.editMode) {
    alert("Saved changes!");
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
            defaultValue={getStringDate(this.props.info.date)}
            readonly
          />
        </td>
        <td>
          <EditText
            name="instructor"
            defaultValue={this.props.info.instructor}
            // onSave={this.handleSave}
            readonly={!this.state.editMode}
          />
        </td>
        <td>
          <EditText
            name="description"
            defaultValue={this.props.info.description ? this.props.info.description : "Weekend!"}
            // onSave={this.handleSave}
            readonly={!this.state.editMode}
          />
        </td>
        <td>
          <EditText
            name="resources"
            defaultValue={this.props.info.resources}
            // onSave={this.handleSave}
            readonly={!this.state.editMode}
          />
        </td>
        <td>
        { this.props.info.description ? (<button onClick={() => this.handleEditSave()}>{descEditSave}</button>) : null }
        </td>
      </tr>
    );
  }
}

class Week extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     editMode: false,
  //   }
  // }

  renderDay(dayInfo) {
    return (
      <Day key={dayInfo.id}
        info={dayInfo}
      />
    );
  }

  render() {
    const days = this.props.info.map((day, index) => {
      return (
        this.renderDay(day)
      );
    });
    return (
      <table>
        <caption>Schedule for week of {getStringDate(this.props.info[0].date)}</caption>
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

  renderWeek(weekInfo) {
    return (
      <Week key={weekInfo[0].id}
        info={weekInfo}
      />
    );

  }

  render() {
    const data = generateRandomData();
    let weeksData = new Array();
    const chunk = 7;
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
}

const App = () => {
    return (
      <Course courseName="ASTO1"></Course>
    );
}

export default App;

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