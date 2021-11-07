export type Staff = {
    id?: number,
    firstName: string,
    lastName: string
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
