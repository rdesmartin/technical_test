import express from "express";
import StaffController from "../controllers/StaffController";
import CustomerController from "../controllers/CustomerController";
import AppointmentController from "../controllers/AppointmentController";

const router = express.Router();

router.get("/staff", StaffController.getStaff);
router.get("/staff/:id", StaffController.getStaffById);
router.post("/staff", StaffController.createStaff);
router.delete("/staff/:id", StaffController.deleteStaff);

router.get("/customer", CustomerController.getCustomer);
router.get("/customer/:id", CustomerController.getCustomerById);
router.post("/customer", CustomerController.createCustomer);
router.delete("/customer/:id", CustomerController.deleteCustomer);

router.get("/appointment", AppointmentController.getAppointment);
router.get("/appointment/:id", AppointmentController.getAppointmentById);
router.post("/appointment", AppointmentController.createAppointment);
router.delete("/appointment/:id", AppointmentController.deleteAppointment);


export default router;
