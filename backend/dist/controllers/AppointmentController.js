"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var AppointmentController = {
    getAppointment: function (req, res, next) {
        var sql = "select * from appointment";
        var params = [];
        db_1.default.all(sql, params, function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows);
        });
    },
    getAppointmentById: function (req, res, next) {
        var id = req.params.id;
        var sql = 'select * from appointment where id is ?';
        var params = [id];
        db_1.default.all(sql, params, function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!rows.length) {
                res.status(400).json({ "error": "Not found" });
            }
            else {
                res.status(200).json(rows);
            }
        });
    },
    createAppointment: function (req, res, next) {
        var newApmt = req.body;
        // check that the given times are valid
        var startTime;
        var endTime;
        try {
            startTime = new Date(newApmt.startTime);
            endTime = new Date(newApmt.endTime);
            if (endTime < startTime) {
                throw new Error('Invalid date.');
            }
        }
        catch (e) {
            res.status(500).json({ "error": "Invalid date." });
            return;
        }
        var insert = 'INSERT INTO appointment (staff_id, customer_id, start_time, end_time) VALUES (?, ?, ?, ?)';
        var getLast = 'SELECT * FROM Appointment ORDER BY id DESC LIMIT 1';
        db_1.default.all(insert, [newApmt.staffId, newApmt.customerId, startTime.toISOString(), endTime.toISOString()], function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
        }).all(getLast, function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            console.log(rows);
            res.status(200).json(rows);
        });
    },
    deleteAppointment: function (req, res, next) {
        var id = req.params.id;
        var del = 'DELETE FROM appointment WHERE id IS ?';
        db_1.default.run(del, [id], function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).send();
        });
    }
};
exports.default = AppointmentController;
