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

getStringDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (months[date.getMonth()] + " " + date.getDate());
}

  render() {
    const descEditSave = this.state.editMode ? "Save" : "Edit";

    return (
      <tr>
        <td>
          <EditText
            name="date"
            defaultValue={this.getStringDate(this.props.info.date)}
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
  renderDay(info) {
    return (
      <Day key={info.id}
        info={info}
      />
    );
  }

  render() {
    const daysList = generateRandomData();
    const days = daysList.map((day, index) => {
      return (
        this.renderDay(day)
      );
    });
    return (
      <table>
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

const App = () => {
    return (
      <Week></Week>
    );
}

export default App;

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
  
  return ([day1, day2, day3, day4, day5, day6, day7, day8]);
}