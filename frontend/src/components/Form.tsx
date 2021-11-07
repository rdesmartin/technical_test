import React, {FormEvent, useState} from "react";
import {Appointment} from "../types/types";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";

type CreateFormProps = {
    onSubmit: (a:Appointment) => Promise<any>,
    customers: any[],
    staff: any[]
};

function CreateForm(props: CreateFormProps) {
    const handleSubmit = (event:any) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formValues = {
            staffId: event.target[0].value,
            customerId: event.target[1].value,
            startDate: event.target[2].value,
            startTime: event.target[3].value,
            duration: event.target[4].value
        };
        const startTime = new Date(Date.parse(`${formValues.startDate} ${formValues.startTime}`));
        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + parseInt(formValues.duration));

        const apmt: Appointment = {
            staffId: formValues.staffId,
            customerId: formValues.customerId,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString()
        };

        props.onSubmit(apmt);
    };

    return (
        <div className="mt-4">
            <h3>Add appointment</h3>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formStaffPick" key="staffPick">
                            <Form.Label>Staff member</Form.Label>
                            <Form.Select required>
                                {props.staff.map(el =>
                                    <option value={el.id} key={el.id}>
                                        {`${el.firstName} ${el.lastName}`}
                                    </option>
                                  )}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="customerPick">
                            <Form.Label>Customer</Form.Label>
                            <Form.Select required>
                                {
                                    props.customers.map(el =>
                                        <option value={el.id} key={el.id}>
                                            {el.name}
                                        </option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="Date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control required type="date">
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="Time">
                            <Form.Label>Time</Form.Label>
                            <Form.Control required type="time">
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="Duration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control required type="number" placeholder="Duration (in hours)">
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default CreateForm;

