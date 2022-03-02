const {Client} = require("pg");

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password123",
    database: "sotby-test"
})

client.connect();

client.query(`SELECT * from instructors LIMIT 4`, (err, res) => {
    if(!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end();
})