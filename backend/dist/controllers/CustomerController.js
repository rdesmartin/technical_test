"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var CustomerController = {
    getCustomer: function (req, res, next) {
        var sql = "select * from Customer";
        var params = [];
        db_1.default.all(sql, params, function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows);
        });
    },
    getCustomerById: function (req, res, next) {
        var id = req.params.id;
        var sql = 'select * from Customer where id is ?';
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
    createCustomer: function (req, res, next) {
        var newCustomer = req.body;
        var insert = 'INSERT INTO Customer (name) VALUES (?)';
        var getLast = 'SELECT * FROM Customer ORDER BY id DESC LIMIT 1';
        db_1.default.all(insert, [newCustomer.name], function (err, rows) {
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
    deleteCustomer: function (req, res, next) {
        var id = req.params.id;
        var del = 'DELETE FROM customer WHERE id IS ?';
        db_1.default.run(del, [id], function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).send();
        });
    }
};
exports.default = CustomerController;
