import db from "../db";
import {RequestHandler} from "express";
import {Customer} from "../types/types";

type TCustomerController = {
    getCustomer: RequestHandler,
    getCustomerById: RequestHandler,
    createCustomer: RequestHandler,
    deleteCustomer: RequestHandler
}


const CustomerController: TCustomerController = {
    getCustomer: (req, res, next) => {
        const sql = "select * from Customer";
        const params: string[] = [];
        db.all(sql, params, (err: any, rows: any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.json(rows)
        });
    },
    getCustomerById: (req, res, next) => {
        const id = req.params.id;
        const sql = 'select * from Customer where id is ?';
        const params: string[] = [id];
        db.all(sql, params, (err: any, rows: any[]) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            if (!rows.length) {
                res.status(400).json({"error": "Not found"})
            } else {
                res.status(200).json(rows)
            }
        });
    },
    createCustomer: (req, res, next) => {
        const newCustomer:Customer = req.body;
        const insert = 'INSERT INTO Customer (name) VALUES (?)';
        const getLast = 'SELECT * FROM Customer ORDER BY id DESC LIMIT 1';
        db.all(insert, [newCustomer.name], (err: any, rows: any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
        }).all(getLast, (err: any, rows:any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            console.log(rows);
            res.status(200).json(rows);
        })
    },
    deleteCustomer: (req,res, next) => {
        const id = req.params.id;
        const del = 'DELETE FROM customer WHERE id IS ?';
        db.run(del, [id], (err:any, rows:any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).send();
        });
    }
};

export default CustomerController;
