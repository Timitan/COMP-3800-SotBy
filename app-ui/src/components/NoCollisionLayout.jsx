import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import ElementInput from "./ElementInput";
const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];

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
    autoSize: true
    // isBounded: true,
  };

  constructor({props, socket, heightLimit, instructorArray, weekRangesArray}) {
    super(props);

    console.log(instructorArray);

    this.state = {
      items: ["MATH", "ENGLISH", "STATS", "HISTORY", "PHYSICS"].map(function(i, key, list) {
        // console.log(i + key);
        return {
          text: i,
          data: {
            i: i + key,
            x: key * 2,
            y: 0,
            w: 2,
            h: 1,
          }
        };
      }),
      //layout: JSON.parse(JSON.stringify(originalLayout)),
      newCounter: 0,
      heightLimit: heightLimit
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.socket = socket;

    //this.onAddItem = this.onAddItem.bind(this);

    this.socket.on("itemChanged", (item) => {
      console.log("Item Received: " + JSON.stringify(item));

      for(let i = 0; i < this.state.layout.length; i++) {
        if(this.state.layout[i].i == item.i) {
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
      layout: [],
    });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
    console.log("layout changed");
  }

  onItemChange = (layout, oldItem, newItem, placeholder, e, element) => {
    /*
    console.log("Layout:" + JSON.stringify(layout));
    console.log("Old Item: " + JSON.stringify(oldItem));
    console.log("New Item: " + JSON.stringify(newItem));
    console.log("PlaceHolder: " + JSON.stringify(placeholder));
    console.log("MouseEvent: " + e);
    console.log(layout.indexOf(newItem));
    console.log("Layout Index: " + this.layout)*/

    this.socket.emit('itemChanged', newItem);

    // console.log("item Changed");
    // console.log("New Item: " + JSON.stringify(newItem));
    const index = _.findIndex(this.state.items, (element) => {return element.data.i == newItem.i});
    const newItems = this.state.items.slice();
    const foundItem = this.state.items[index];
    foundItem.data.h = newItem.h;
    foundItem.data.w = newItem.w;
    foundItem.data.x = newItem.x;
    foundItem.data.y = newItem.y;
    newItems.splice(index, 1, foundItem);
    //console.log("Found Item: " + JSON.stringify(this.state.items[index]));
    //console.log("NewItems: " +JSON.stringify(newItems));
    this.setState({items: newItems});
    //console.log("New Items State: " + JSON.stringify(this.state.items));
  }

  onAddItem(text, x=0, y=0, w=3) {
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        text: text,
        data:{
          i: text + this.state.newCounter,
          x: x,
          y: y, 
          w: w,
          h: 1,
        }
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  onRemoveItem(i) {
    // console.log("removing", i);
    // console.log(JSON.stringify(this.state.layout));
    //this.setState({ layout: this.state.layout.filter((element) => element.i != i) });
    this.setState({ items: _.reject(this.state.items, (element) => {return element.data.i == i}) });
    console.log(JSON.stringify(this.state.layout));
    
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
      padding: "5px",
    };
    const i = el.i;
    // console.log("Added " + el.text);

    // TODO: Figure out how to programmatically reset elements that are over the height limit, solution needs setState to update the DOM
    // const currentHeightLimit = this.state.heightLimit();
    // console.log("el.data.y: " + JSON.stringify(el.data.y) + ", Height: " + currentHeightLimit);

    // if(el.data.y > currentHeightLimit) {
    //   el.data.y = currentHeightLimit;
    //   console.log("el.data.y after: " + el.data.y);
    // } 

    return (
      <div key={el.data.i} data-grid={el.data}>
        <span className="text">{el.text}</span>
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, el.data.i)}
        >
          x
        </span>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout} style={{position: "sticky", zIndex: 99}}>Reset Layout</button>
        <ElementInput text={"Add Element: "} callBack={(text) => this.onAddItem(text)}/>
        <ReactGridLayout
          {...this.props}
          maxRows={this.state.heightLimit()}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          onDragStop= {this.onItemChange}
          onResizeStop = {this.onItemChange}
        >
          {this.state.items.map(el => this.createElement(el))}

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