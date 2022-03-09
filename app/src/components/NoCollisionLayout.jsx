import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import TimelineGrid from "./TimelineGrid";
const ReactGridLayout = WidthProvider(RGL);

export default class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    rowHeight: 100,
    margin: [2, 2],
    allowOverlap: true,
    preventCollision: false,
    resizeHandles: ['e'],
    compactType: null,
    autoSize: true
  };

  constructor({props, socket, heightLimit, instructorArray, weekInformation, totalWeeks}) {
    super(props);

    this.state = {
      // Loop through the instructor array to get all the courses associated with them
      items: instructorArray.reduce(function(acc, element, index) {
        // console.log(element + index);
        // console.log(element.timeblocks[0]);
        if(element.timeblocks.length === 0 || weekInformation.length === 0){
          return acc;
        }

        // const start = findWeekIndex(weekInformation, element.timeblocks[0].start);
        // const end = findWeekIndex(weekInformation, element.timeblocks[0].end) + 1;
        return acc.concat(
          element.timeblocks.map((info) => {
            const start = findWeekIndex(weekInformation, info.start);
            const end = findWeekIndex(weekInformation, info.end) + 1;
            return(
              {
                text: info.name,
                courseNum: info.courseNum,
                userId: info.userId,
                data: {
                  i: info.name,
                  x: start,
                  y: index * 2,
                  w: end - start,
                  h: 1,
                }
              }
            )
          })
        );
      }, []),
      newCounter: 0,
      heightLimit: heightLimit.get,
      weekInformation: weekInformation
    };

    this.socket = socket;
    this.instructorArray = instructorArray;
    this.heightLimit = heightLimit;
    this.totalWeeks = totalWeeks;

    this.socket.on("itemChanged", (item) => {
      console.log("Item Received: " + JSON.stringify(item));

      console.log("Layout: " + this.state.layout);
      this.replaceItem(item);
    });

    this.socket.on("courseAdded", (item) => {
      console.log("Item Received: " + JSON.stringify(item));

      this.onAddCourse(item, parseInt(item.x), parseInt(item.y), false);
    });

    this.socket.on("courseDeleted", (i) => {
      console.log("Item Received: " + JSON.stringify(i));

      this.onRemoveItem(i, false);
    });
  }

  replaceItem = (item) => {
    for(let i = 0; i < this.state.layout.length; i++) {
      if(this.state.layout[i].i === item.i) {
        const newLayout = this.state.layout.slice();
        newLayout[i] = item;

        //console.log(this.state.layout);
        //console.log(newLayout);
        this.setState({
          layout: newLayout
        });

        break;
      }
    }
  }

  onLayoutChange = (layout, layouts) => {
    /*eslint no-console: 0*/
    //saveToLS("layout", layout);
    this.setState({
      layout: layout
    });
    // this.props.onLayoutChange(layout); // updates status display
    //this.props.onLayoutChange(layout);
    console.log("layout changed");
  }
  
  /*
  // Note: Websockets are used to send a query to update the database
  updateCourse(id, start, end) {
    const body = {start: start, end: end};
    fetch('http://localhost:8000/instructors/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => {
      console.log("Response: " + JSON.stringify(response));
        return response.text();
    })
    .then(data => {
        console.log("Data from updating course: " + data);
    });
  }
  */

  onItemChange = (layout, oldItem, newItem, placeholder, e, element) => {
    /* Information logging
    console.log("Layout:" + JSON.stringify(layout));
    console.log("Old Item: " + JSON.stringify(oldItem));
    console.log("New Item: " + JSON.stringify(newItem));
    console.log("PlaceHolder: " + JSON.stringify(placeholder));
    console.log("MouseEvent: " + e);
    console.log(layout.indexOf(newItem));
    console.log("Layout Index: " + this.layout)*/

    // Update the dates on the postgresql database
    const startDate = findWeekDate(this.state.weekInformation, newItem.x);
    const endDate = findWeekDate(this.state.weekInformation, newItem.w + newItem.x - 1);

    // HTTP request instead of sockets
    //this.updateCourse(newItem.i, startDate.getTime(), endDate.getTime());

    const index = _.findIndex(this.state.items, (element) => {return element.data.i === newItem.i});
    const foundItem = this.state.items[index];
    const yAxisLockedItem = newItem;
    yAxisLockedItem.y = oldItem.y;
    this.replaceItem(yAxisLockedItem);

    const instructor = this.instructorArray[Math.floor(newItem.y / 2)];
    this.socket.emit('itemChanged', yAxisLockedItem, {username: instructor.key, courseNum: foundItem.courseNum, start: startDate.getTime(), end: endDate.getTime()});
  }

  onAddCourse = (course, x=0, y=0, emit=true) => {
    const w = parseInt(course.weeklength);

    const startDate = findWeekDate(this.state.weekInformation, x);
    const endDate = findWeekDate(this.state.weekInformation, w + x - 1);
    const instructor = this.instructorArray[Math.floor(y / 2)];
    console.log("Index: " + Math.floor(y / 2));
    console.log(this.instructorArray);
    console.log(instructor);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        text: course.title + " " + course.number,
        userId: instructor.key,
        courseNum: course.number,
        data:{
          i: course.number,
          x: x,
          y: y, 
          w: w,
          h: 1,
        }
      }),
      // Increment the counter to ensure key is always unique.
    });

    if(emit){
      this.socket.emit('courseAdded', {...course, x: x, y: y, instructorKey: instructor.key,  start: startDate.getTime(), end: endDate.getTime()});
    }
  }

  onRemoveItem(i, emit=true) {
    const index = _.findIndex(this.state.items, (element) => {return element.data.i === i});
    const foundItem = this.state.items[index];
    console.log(foundItem);

    if(emit) {
      this.socket.emit("courseDeleted", foundItem, i);
    }

    this.setState({ items: _.reject(this.state.items, (element) => {return element.data.i === i})});
    console.log(JSON.stringify(this.state.layout));
  }

  onRemoveUser = (key, y) => {
    // Remove elements on the same row
    this.setState({ items: _.reject(this.state.items, (element) => {return element.data.y === y || element.data.y === y + 1}) });

    this.instructorArray = _.reject(this.instructorArray, (element) => {return element.key === key});

    // Move elements down
    this.setState({item: _.reduce(this.state.items, (acc, element) => {
      if (element.data.y > y) {
        console.log(acc);
        console.log(this.state.layout);
        console.log(element);
        const newElement = element;
        newElement.data.y -= 2;
        return [...acc, newElement];
      } else {
        return  [...acc, element];
      }
    }, [])});

    // Reset layout so that the items are shifted up visually
    this.setState({layout: _.reduce(this.state.items, (acc, element) => {
      const itemData = element.data;
      return [...acc, itemData];
    }, [])});
  }

  onAddUser = (user) => {
    console.log(this.instructorArray);
    console.log(user);
    this.instructorArray.push({key:user.username, name: user.firstname + " " + user.lastname, timeblocks: []});
    console.log(this.instructorArray);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
      padding: "5px",
    };

    return (
      <div key={el.data.i} data-grid={el.data} name={el.text + " el"}>
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
      <React.Fragment>
      <TimelineGrid 
      socket={this.socket} 
      heightLimit={this.heightLimit} 
      instructorArray={this.instructorArray} 
      createCourse={this.onAddCourse} 
      totalWeeks={this.totalWeeks}
      onRemoveUser={this.onRemoveUser} 
      onAddUser={this.onAddUser} />
      <div className="grid-item-container" style={{width: this.totalWeeks * 102,position: "absolute"}}>
        <ReactGridLayout
          {...this.props}
          cols={this.totalWeeks}
          maxRows={this.state.heightLimit()}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          onResizeStop = {this.onItemChange}
          onDragStop = {this.onItemChange}
        >
          {this.state.items.map(el => this.createElement(el))}
        </ReactGridLayout>
      </div>
      </React.Fragment>
    );
  }
}

function findWeekIndex(weekInformation, date) {
  // Search for a week in a particular month
  const monthIndex = date.getMonth();
  // console.log("MonthIndex: " + monthIndex);
  // console.log(weekInformation.weekRangesArray);

  // Get the first day of every week in that month
  const weekRanges = weekInformation.weekRangesArray[monthIndex].times;

  for(let i = 0; i < weekRanges.length; i++) {
    if(date <= weekRanges[i].date) {
      return weekRanges[i].index;
    }

  }

  // Return the index of the last week of the month
  return weekRanges[weekRanges.length - 1].index;
}

function findWeekDate(weekInformation, index) {
  return weekInformation.indexMap[index];
}
