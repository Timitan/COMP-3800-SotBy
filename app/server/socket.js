const socket = require("socket.io");
const { createAdapter } = require("@socket.io/postgres-adapter");

console.log("Socket Script started");

// Socket.io code
const socketStart = (server, pool, instructorModel) => {
    const io = socket(server);
    io.adapter(createAdapter(pool));

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('itemChanged', (item, itemInfo) => {
            // Update posgresql database with the changed item
            //console.log(itemInfo);
            instructorModel.putCourse(itemInfo.username, itemInfo.courseNum, itemInfo.start, itemInfo.end)
            .then(response => {
            console.log("Update Success");
                //console.log("Response: " + JSON.stringify(response));
                // Broadcast to everyone except sender
                console.log(itemInfo);
                console.log(item);
                socket.broadcast.emit('itemChanged', item);
            })
            .catch(error => {
            console.log(error);
            })
        });

        socket.on('courseDeleted', (course, i) => {
            // Update posgresql database with the changed item
            //console.log(itemInfo);
            instructorModel.deleteCourse(course.courseNum, course.userId)
            .then(response => {
                console.log("Update Success");
                //console.log("Response: " + JSON.stringify(response));
                // Broadcast to everyone except sender
                console.log(course);
                socket.broadcast.emit('courseDeleted', i);
            })
            .catch(error => {
            console.log(error);
            })
        });

        socket.on('userAdded', (user, rownum) => {
            // Update posgresql database
            console.log(user);
            instructorModel.postUser(user, rownum)
            .then(response => {
                console.log("Add Success");
                //console.log("Response: " + JSON.stringify(response));
                // Broadcast to everyone except sender
                //console.log(item);
                socket.broadcast.emit('userAdded', user);
            })
            .catch(error => {
                console.log(error);
            })
        });

        socket.on('userDeleted', (key, x) => {
            // Update posgresql database
            console.log(key);
            instructorModel.deleteUser(key)
            .then(response => {
                console.log("Delete Success");
                //console.log("Response: " + JSON.stringify(response));
                // Broadcast to everyone except sender
                //console.log(item);
                socket.broadcast.emit('userDeleted', key, x);
            })
            .catch(error => {
            console.log(error);
            })
        });

        socket.on('courseAdded', (course) => {
            // Update posgresql database
            console.log(course);
            instructorModel.postCourse(course)
            .then(response => {
                console.log("Course Post Success");
                //console.log("Response: " + JSON.stringify(response));
                // Broadcast to everyone except sender
                socket.broadcast.emit('courseAdded', course);
            })
            .catch(error => {
            console.log(error);
            })
        });


        // Sam 

        socket.on('changeDay', (rowInfo) => {
            instructorModel.updateCourseDetailDay(rowInfo)
            .then(response => {
                console.log("Updated Course Detail Day");
                socket.broadcast.emit('changeDay', rowInfo);
            })
            .catch(error => {
            console.log(error);
            })
        })

        socket.on('bookResource', (bookingInfo) => {
            instructorModel.bookResource(bookingInfo)
            .then(response => {
                console.log("Added to resource_allocation");
                io.emit('bookResource', {
                    model_num: bookingInfo.model_num,
                    model_name: bookingInfo.model_name,
                    quantity_total: bookingInfo.quantity_total,
                    model_location: bookingInfo.model_location,
                    q_left: bookingInfo.q_left
                });
            })
            .catch(error => {
            console.log(error);
            })
        })
    });
}

module.exports = {
    socketStart
}