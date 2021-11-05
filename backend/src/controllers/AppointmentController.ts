import db from "../db";
import {RequestHandler} from "express";
import {Appointment} from "../types/types";

type TAppointmentController = {
    getAppointment: RequestHandler,
    getAppointmentById: RequestHandler,
    createAppointment: RequestHandler,
    deleteAppointment: RequestHandler
}


const AppointmentController: TAppointmentController = {
    getAppointment: (req, res, next) => {
        const sql = "select * from appointment";
        const params: string[] = [];
        db.all(sql, params, (err: any, rows: any) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.json({
                "data": rows
            })
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
                res.status(200).json({
                    "data": rows
                })
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
            console.log(`start: ${startTime.toISOString()}`);
            endTime = new Date(newApmt.endTime);
            console.log(`end: ${endTime.toISOString()}`);
            if (endTime < startTime) {
                throw;
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
            res.status(200).json(rows);
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
