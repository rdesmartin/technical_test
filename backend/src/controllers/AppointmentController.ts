import db from "../db";
import {RequestHandler} from "express";
import {Appointment} from "../types/types";

type TAppointmentController = {
    getAppointment: RequestHandler,
    getAppointmentById: RequestHandler,
    createAppointment: RequestHandler,
    deleteAppointment: RequestHandler
}

// convert from snake-case (db) to camel case (json response)
const rowToAppointment = (row:any):Appointment => ({
    staffId: row.staff_id,
    customerId: row.customer_id,
    startTime: row.start_time,
    endTime: row.end_time,
    id: row.id
});

const AppointmentController: TAppointmentController = {
    getAppointment: (req, res, next) => {
        const sql = "select * from appointment";
        const params: string[] = [];
        db.all(sql, params, (err: any, rows: any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.json(rows.map(rowToAppointment))
        });
    },
    getAppointmentById: (req, res, next) => {
        const id = req.params.id;
        const sql = 'select * from appointment where id is ?';
        const params: string[] = [id];
        db.all(sql, params, (err: any, rows: any[]) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            if (!rows.length) {
                res.status(400).json({"error": "Not found"})
            } else {
                res.status(200).json(rows.map(rowToAppointment))
            }
        });
    },
    createAppointment: (req, res, next) => {
        const newApmt:Appointment = req.body;

        // check that the given times are valid
        let startTime: Date;
        let endTime: Date;
        try {
            startTime = new Date(newApmt.startTime);
            endTime = new Date(newApmt.endTime);
            if (endTime < startTime) {
                throw new Error('Invalid date.');
            }
        } catch(e) {
            res.status(500).json({"error": "Invalid date."});
            return;
        }

        const insert = 'INSERT INTO appointment (staff_id, customer_id, start_time, end_time) VALUES (?, ?, ?, ?)';
        const getLast = 'SELECT * FROM Appointment ORDER BY id DESC LIMIT 1';
        db.all(insert, [newApmt.staffId, newApmt.customerId, startTime.toISOString(), endTime.toISOString()], (err: any, rows: any) => {
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
            res.status(200).json(rowToAppointment(rows[0]));
        })
    },
    deleteAppointment: (req,res, next) => {
        const id = req.params.id;
        const del = 'DELETE FROM appointment WHERE id IS ?';
        db.run(del, [id], (err:any, rows:any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).send();
        });
    }
};

export default AppointmentController;
