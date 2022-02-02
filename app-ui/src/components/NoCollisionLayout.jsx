import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];
/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 25,
    rowHeight: 100,
    margin: [2, 2],
    onLayoutChange: function() {},
    preventCollision: true,
    resizeHandles: ['e'],
    compactType: null,
    isBounded: true,
  };

  constructor({props, socket}) {
    super(props);

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout))
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.socket = socket;

    this.socket.on("itemChanged", (item) => {
      console.log("Item Received: " + JSON.stringify(item));

      for(let i = 0; i < this.state.layout.length; i++) {
        if(this.state.layout[i].i == item.i) {
          //const newLayout = JSON.parse(JSON.stringify(this.state.layout));
          const newLayout = this.state.layout.slice();
          newLayout[i] = item;

          console.log(this.state.layout);
          console.log(newLayout);
          this.setState({
            layout: newLayout
          });
  
          saveToLS("layout", this.state.layout);
          break;
        }
      }
    });
  }

  resetLayout() {
    this.setState({
      layout: []
    });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }

  onItemChange(layout, oldItem, newItem, placeholder, e, element) {
    /*
    console.log("Layout:" + JSON.stringify(layout));
    console.log("Old Item: " + JSON.stringify(oldItem));
    console.log("New Item: " + JSON.stringify(newItem));
    console.log("PlaceHolder: " + JSON.stringify(placeholder));
    console.log("MouseEvent: " + e);
    console.log(layout.indexOf(newItem));
    console.log("Layout Index: " + this.layout)*/

    this.socket.emit('itemChanged', newItem);
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout} style={{position: "sticky", zIndex: 99}}>Reset Layout</button>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          onDragStop= {this.onItemChange}
          onResizeStop = {this.onItemChange}
        >
          <div key="1" data-grid={{ w: 1, h: 1, x: 0, y: 0 }}>
            <span className="text">PROJECTS</span>
          </div>
          <div key="2" data-grid={{ w: 1, h: 1, x: 2, y: 0 }}>
            <span className="text">MATH</span>
          </div>
          <div key="3" data-grid={{ w: 1, h: 1, x: 4, y: 0 }}>
            <span className="text">STATS</span>
          </div>
          <div key="4" data-grid={{ w: 1, h: 1, x: 6, y: 0 }}>
            <span className="text">ENGLISH</span>
          </div>
          <div key="5" data-grid={{ w: 1, h: 1, x: 8, y: 0 }}>
            <span className="text">ART</span>
          </div>
          <div key="6" data-grid={{ w: 1, h: 1, x: 8, y: 20, static:true}}>
            <span className="text">PLACEHOLDER</span>
          </div>
        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}