import React from "react";
import Month from './Month';
import Slot from './Slot';
import RowHeader from './RowHeader';

export default class Timeline extends React.PureComponent {
    constructor({props, socket}) {
        super(props);

        this.state = {
            inputValue: ''
        };

        this.socket = socket;
        this.monthArray = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ];
        this.rowHeaderArray = [
            "Jackson",
            "Pete",
            "Michelle",
            "Ken",
            "Abigail",
            "Sam",
            "Ross",
        ];

        this.monthItems =                         
            this.monthArray.map((item, i) => {
                return(
                        this.createMonth(item, i)
                    )
            });

        this.rowHeaderItems =
            this.rowHeaderArray.map((item, i) => {
                return (
                    this.createRowHeader(item, i)
                )
            });

        this.inputBox = <input id="nameInput" type="text" onChange={(evt) => this.updateInputValue(evt)}/>;
    }

    updateInputValue(evt) {
        const val = evt.target.value;
        this.setState({
          inputValue: val
        });
      }

    createRowHeader(item, i) {
        return <RowHeader key={item + "rowHeader" + i} text={item} socket={this.socket} position={{x: i*2+1, y: 1}}/>
    }

    createMonth(item, i) {
        return <Month key={item + " month"} title={item} position={{x: 1, y: i === 0 ? i+3 : (i) * 5 + 3}} />
    }

    addMonth = () => {
        console.log(this.state.inputValue);
        let row = this.createRowHeader(this.state.inputValue, this.rowHeaderItems.length);
        this.rowHeaderItems.push(row);
    }

    fillSpaces() {
        let slotArray = [];
        for(let x = 1; x < 50; x++) {
            for(let y = 3; y < 40; y++) {
                slotArray.push(<Slot key={"slot x:" + x + "y:" + y} socket={this.socket} position={{x: x, y: y}} />);
            }
        }
        return slotArray;
    }

    render() {
        return(
            <React.Fragment>
                <div className="grid-container-months">
                    {
                        this.monthItems
                    }
                </div>
                <div className="grid-container-layout">
                    {
                        this.fillSpaces()
                    }
                    {
                        this.rowHeaderItems
                    }
                </div>
                {this.inputBox}
                <button onClick={this.addMonth}>Add Row</button>
            </React.Fragment>
        );
    }
}