import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarScheduling.css';

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

const CalendarScheduling = ({ initialDate, finalDate }) => {
  const [value, setValue] = useState(new Date());
  const today = useMemo(() => normalizeDate(new Date()), []);

  const start = useMemo(() => {
    const d = parseDate(initialDate);
    return d ? normalizeDate(d) : null;
  }, [initialDate]);

  const end = useMemo(() => {
    const d = parseDate(finalDate);
    return d ? normalizeDate(d) : null;
  }, [finalDate]);

  console.log('[CalendarScheduling] Parsed Start:', start, 'Parsed End:', end);

  const handleDateChange = (newDate) => {
    setValue(newDate);
  };

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null;
    const normalized = normalizeDate(date);

    if (isSameDay(normalized, today)) {
      return 'current-day';
    }

    if (start && end) {
      if (normalized >= start && normalized <= today) {
        return 'range-start-to-today';
      }
      if (normalized > today && normalized <= end) {
        return 'range-today-to-end';
      }
    }

    return null;
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={value}
      tileClassName={tileClassName}
    />
  );
};

export default CalendarScheduling;
