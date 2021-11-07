"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var sqlite3_1 = __importDefault(require("sqlite3"));
// import md5 from "md5";
var DBSOURCE = "db.sqlite";
function createStaff() {
    return db.run("CREATE TABLE staff (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            firstname text,\n            lastname text\n            )", function (error) {
        if (error) {
            // Table already created
        }
        else {
            console.log("Staff table created");
            // Populating db with a couple entries
            var insert = 'INSERT INTO staff (firstname, lastname) VALUES (?,?)';
            db.run(insert, ["Jane", "Doe"]);
            db.run(insert, ["Sam", "Test"]);
        }
    });
}
function createCustomer() {
    return db.run("CREATE TABLE customer (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            name text\n            )", function (error) {
        if (error) {
            // Table already created
        }
        else {
            console.log("Customer table created");
            // Populating db with a couple entries
            var insert = 'INSERT INTO customer (name) VALUES (?)';
            db.run(insert, ["FooBar"]);
            db.run(insert, ["BarFoo"]);
        }
    });
}
function createAppointments() {
    return db.run("CREATE TABLE appointment (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            staff_id INTEGER,\n            customer_id INTEGER,\n            start_time TEXT,\n            end_time TEXT\n            )", function (error) {
        if (error) {
            // Table already created
        }
        else {
            console.log("Appointment table created");
            var insert = 'INSERT INTO appointment (staff_id, customer_id, start_time, end_time) VALUES (?, ?, ?, ?)';
            db.run(insert, ["1", "1", "1970-01-01T00:00:00.000Z", "1970-01-02T00:00:00.000Z"]);
        }
    });
}
var db = new sqlite3_1.default.Database(DBSOURCE, function (err) {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    }
    else {
        console.log('Connected to the SQLite database.');
        createStaff();
        createCustomer();
        createAppointments();
    }
});
exports.default = db;
