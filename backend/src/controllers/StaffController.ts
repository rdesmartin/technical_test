import db from "../db";
import {RequestHandler} from "express";
import {Staff} from "../types/types";

type TStaffController = {
    getStaff: RequestHandler,
    getStaffById: RequestHandler,
    createStaff: RequestHandler,
    deleteStaff: RequestHandler
}

// convert from snake-case (db) to camel case (json response)
const rowToStaff = (row:any):Staff => ({
    firstName: row.first_name,
    lastName: row.last_name,
    id: row.id
});

const StaffController: TStaffController = {
    // return all staff
    getStaff: (req, res, next) => {
        const sql = "select * from staff";
        const params: string[] = [];
        db.all(sql, params, (err: any, rows: any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.json(rows.map(rowToStaff));
        });
    },
    // return one staff
    getStaffById: (req, res, next) => {
        const id = req.params.id;
        const sql = 'select * from staff where id is ?';
        const params: string[] = [id];
        db.all(sql, params, (err: any, rows: any[]) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            if (!rows.length) {
                res.status(400).json({"error": "Not found"})
            } else {
                res.status(200).json(rows.map(rowToStaff))
            }
        });
    },
    // create staff
    createStaff: (req, res, next) => {
        const newStaff:Staff = req.body;
        const insert = 'INSERT INTO staff (first_name, last_name) VALUES (?,?)';
        const getLast = 'SELECT * FROM staff ORDER BY id DESC LIMIT 1';
        db.all(insert, [newStaff.firstName, newStaff.lastName], (err: any, rows: any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
        }).all(getLast, (err: any, rows:any) => {
            // we return the staff member with its id
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).json(rowToStaff(rows[0]));
        })
    },
    // delete staff
    deleteStaff: (req,res, next) => {
        const id = req.params.id;
        const del = 'DELETE FROM staff WHERE id IS ?';
        db.run(del, [id], (err:any, rows:any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).send();
        });
    }
};

export default StaffController;
