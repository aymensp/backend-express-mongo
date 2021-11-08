const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "8889",
    database: "esprit_5SIM3"
});

module.exports = connection;