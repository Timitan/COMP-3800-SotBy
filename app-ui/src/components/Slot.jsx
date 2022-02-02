import React from "react";

export default class Slot extends React.PureComponent {
    constructor({props, socket, position}) {
        super(props);

        this.socket = socket;
        this.item = null;
        this.position = position;
    }

    render() {
        return(
            <React.Fragment>
                <div className="grid-slot" style={{gridArea: this.position.x + " / " + this.position.y + " / span 1 / span 1"}}>
                </div>
            </React.Fragment>
        );
    }
}