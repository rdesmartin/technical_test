# Technical test

The application is made of a back-end in Typescript/Node.js and a 
separate front-end in Typescript/React.js.

## Backend
default port: `8000`

start:
```
npm install && npm run start
```

The sqlite database is populated with 2 staff, 2 customers and an appointment when first started.

The following endpoints are implemented:

### Staff
* `GET /staff`: returns all staff
* `GET /staff/:id`: get staff by id
* `POST /staff`: create new staff
* `DELETE /staff/:id` delete staff by id

Staff example:
```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "id": 1
}
```

### Customer
* `GET /customer`: returns all customer
* `POST /customer`: create new customer
* `GET /customer/:id`: get customer by id
* `DELETE /customer/:id` delete customer by id

Customer example: 

```json
{
    "id": 1,
    "name": "Vandelay Industries"
}
```


### Appointment
* `GET /appointment`: returns all appointment
* `POST /appointment`: create new appointment
* `GET /appointment/:id`: get appointment by id
* `DELETE /appointment/:id` delete appointment by id

Appointment example:

```json
{
    "staffId": 1,
    "customerId": 1,
    "startTime": "2021-11-11T10:00:00.000Z",
    "endTime": "2021-11-11T11:00:00.000Z",
    "id": 1
}
```

## Frontend

default port: `3000`
start:
```
npm install && npm run start
```
