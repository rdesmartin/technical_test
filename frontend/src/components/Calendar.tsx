import * as React from "react";
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

type MyCalendarPropType = {
    events: Event[]
};

function MyCalendar(props:MyCalendarPropType) {
    const events = props.events;
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}
export default MyCalendar;
