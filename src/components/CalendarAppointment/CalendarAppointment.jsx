import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../CalendarScheduling/calendarScheduling.css';

function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function normalizeDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDate(dateStr) {
    if (!dateStr) return null;
    let parsed = new Date(dateStr);
    if (!isNaN(parsed)) return parsed;

    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    return null;
}

const CalendarAppointment = ({ scheduleDate }) => {
    const [value, setValue] = useState(new Date());
    const today = useMemo(() => normalizeDate(new Date()), []);
    const appointmentDay = useMemo(() => {
        const d = parseDate(scheduleDate);
        return d ? normalizeDate(d) : null;
    }, [scheduleDate]);

    const tileClassName = ({ date, view }) => {
        if (view !== 'month') return null;
        const normalized = normalizeDate(date);

        if (isSameDay(normalized, today)) return 'current-day';
        if (appointmentDay && isSameDay(normalized, appointmentDay)) return 'appointment-day';

        return null;
    };

    return (
        <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
        />
    );
};

export default CalendarAppointment;
