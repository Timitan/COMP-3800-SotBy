import React, { Component } from 'react';
import 'react-edit-text/dist/index.css';
import './index.css';

class PopUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
        inputValue: 0
    };
  }

  handleClose = () => {
    this.props.toggle();
  }

  handleSubmit = () => {
    this.props.toggle();

    if (this.state.inputValue > this.props.resInfo.quantityA) {
        alert("Not enough items are available!");
    }
    else {
        this.props.resInfo.quantityA -= this.state.inputValue;
        alert(`Succesfully booked ${this.state.inputValue} ${ this.props.resInfo.name}`);
    }
  };

  updateInputValue = (evt) => {
    this.setState({
        inputValue: evt.target.value
    });
  }

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClose}>
            &times;
          </span>
          <form>
            <label id="popUpLabel">
              Number of Items:
              <input type="text" name="count" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            </label>
            <br />
            <input type="submit" onClick={this.handleSubmit}/>
          </form>
        </div>
      </div>
    );
  }
}

class Item extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        seen: false,
      }
    }

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };
    
    render() {
  
      return (
        <tr>
            <td>
                <p>{this.props.resInfo.name}</p>
            </td>
            <td>
                <p>{this.props.resInfo.quantityT}</p>
            </td>
            <td>
                <p>{this.props.resInfo.quantityA}</p>
            </td>
            <td>
                <p>{this.props.resInfo.location}</p>
            </td>
            <td id="popUpBookBtn">
                {this.state.seen ? null : <button onClick={() => this.togglePop()}>Book</button>}
                {this.state.seen ? <PopUp toggle={this.togglePop} resInfo={this.props.resInfo} /> : null}
            </td>
        </tr>
      );
    }
}

class Resource extends React.Component {

    renderItem(itemInfo) {
      return (
        <Item resInfo={itemInfo}/>
      );
    }
  
    render() {
      const data = generateRandomData();
      const items = data.map((itemInfo, index) => {
        return (
          this.renderItem(itemInfo)
        );
      });
      return (
        <table>
          <caption>Available Resources</caption>
          <thead>
                <tr>
                    <th>Name</th>
                    <th>Total Quantity</th>
                    <th>Available Quantity</th>
                    <th>location</th>
                    <th></th>
                </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
        );
    }
}

const Resources = () => {
    return (
      <Resource></Resource>
    );
}

export default Resources;

function generateRandomData() {
    const res1 = {name: "AC Board", quantityT: 4, quantityA: 3, location: "NE16"};
    const res2 = {name: "Air Bag Trainers", quantityT: 10, quantityA: 10, location: "NE20"};
    const res3 = {name: "2014 Ford Focus GDI 2.0L", quantityT: 2, quantityA: 0, location: "NE16"};
    const res4 = {name: "Lighting Boards", quantityT: 8, quantityA: 4, location: "NE16"};
    return ([res1, res2, res3, res4]);
}