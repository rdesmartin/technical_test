export type Staff = {
    id?: number,
    firstname: string,
    lastname: string
}

export type Customer = {
    id?: number,
    name: string
}

export type Appointment = {
    id?: number,
    customerId: number,
    staffId: number,
    startTime: string,
    endTime: string
}
