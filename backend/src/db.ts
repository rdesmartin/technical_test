// @ts-ignore
import sqlite3, {Database} from "sqlite3";
// import md5 from "md5";

const DBSOURCE = "db.sqlite";

function createStaff(): Database {
    return db.run(`CREATE TABLE staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name text,
            last_name text
            )`,
        (error: any) => {
            if (error) {
                // Table already created
            }else{
                console.log("Staff table created");
                // Populating db with a couple entries
                const insert = 'INSERT INTO staff (first_name, last_name) VALUES (?,?)';
                db.run(insert, ["Jane","Doe"]);
                db.run(insert, ["Sam","Test"]);
            }
        });
}

function createCustomer():Database {
    return db.run(`CREATE TABLE customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text
            )`,
        (error: any) => {
            if (error) {
                // Table already created
            }else{
                console.log("Customer table created");
                // Populating db with a couple entries
                const insert = 'INSERT INTO customer (name) VALUES (?)';
                db.run(insert, ["Vandelay Industries"]);
                db.run(insert, ["Capsule Corp."]);
            }
        });
}

function createAppointments():Database {
    return db.run(`CREATE TABLE appointment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            staff_id INTEGER,
            customer_id INTEGER,
            start_time TEXT,
            end_time TEXT
            )`,
        (error: any) => {
            if (error) {
                // Table already created
            }else{
                console.log("Appointment table created");
                const insert = 'INSERT INTO appointment (staff_id, customer_id, start_time, end_time) VALUES (?, ?, ?, ?)';
                db.run(insert, ["1", "1", "2021-11-11T10:00:00.000Z", "2021-11-11T11:00:00.000Z"]);
            }
        });
}

const db = new sqlite3.Database(DBSOURCE, (err:Error|null) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        createStaff();
        createCustomer();
        createAppointments();
    }

});

export default db;
