"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var StaffController = {
    // return all staff
    getStaff: function (req, res, next) {
        var sql = "select * from staff";
        var params = [];
        db_1.default.all(sql, params, function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows);
        });
    },
    // return one staff
    getStaffById: function (req, res, next) {
        var id = req.params.id;
        var sql = 'select * from staff where id is ?';
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
    // create staff
    createStaff: function (req, res, next) {
        var newStaff = req.body;
        var insert = 'INSERT INTO staff (firstname, lastname) VALUES (?,?)';
        var getLast = 'SELECT * FROM staff ORDER BY id DESC LIMIT 1';
        db_1.default.all(insert, [newStaff.firstname, newStaff.lastname], function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
        }).all(getLast, function (err, rows) {
            // we return the staff member with its id
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json(rows[0]);
        });
    },
    // delete staff
    deleteStaff: function (req, res, next) {
        var id = req.params.id;
        var del = 'DELETE FROM staff WHERE id IS ?';
        db_1.default.run(del, [id], function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).send();
        });
    }
};
exports.default = StaffController;
