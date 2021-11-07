import React, {useEffect, useState} from 'react';
import API from '../utils/API';
import {Appointment, Customer, Staff} from "../types/types";
import CreateForm from "../components/Form";
import MyCalendar from "../components/Calendar";
import {Alert} from "react-bootstrap";

function Main() {
    const [staff, setStaff] = useState<Staff[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await API.get('/staff');
                setStaff(res.data);
                res = await API.get('/customer');
                setCustomers(res.data);
                res = await API.get('/appointment');
                setAppointments(res.data);
            } catch (e: any) {
                setError("Error: could not fetch data.");
            }
        };
        fetchData();
    }, []);

    const formatEvent = (apmt:Appointment) => {
        const staffMember = staff.find((el:Staff) => apmt.staffId === el.id);
        const customer = customers.find((el:Customer) => apmt.customerId === el.id);

        return ({
            allDay: false,
            title: `${staffMember?.firstName} ${staffMember?.lastName}'s appointment with ${customer?.name}`,
            start: new Date(Date.parse(apmt.startTime)),
            end: new Date(Date.parse(apmt.endTime))
        });
    };

    const onSubmitForm = async (formData:Appointment) => {
        try {
            console.log(formData);
            const res = await API.post('/appointment', formData);
            setAppointments([...appointments, res.data]);
        } catch (e:any) {
            setError("Error: could not create Appointment");
        }
    };

    return (
        <div className="container p-4">
            <h1>Welcome to your calendar</h1>
            { error.length > 0 && <Alert variant="danger">{error}</Alert> }
            <div className="mt-4">
                <MyCalendar events={appointments.map(formatEvent)}/>
            </div>
            <CreateForm
                onSubmit={onSubmitForm}
                staff={staff}
                customers={customers}
            />
        </div>
    );
}

export default Main;
