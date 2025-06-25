import './styles.css';
import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarComponent = ({events = []}) => {
    const [calendarEvents, setCalendarEvents] = useState(events);
    const handleEventClick = (info) => {
        alert('Evento clicado: ' + info.event.title);
    };

    useEffect(() => {
        setCalendarEvents(events);
    }, [events]);

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                eventClick={handleEventClick}
                editable={true}
                droppable={true}
                headerToolbar={{
                    left: 'dayGridMonth,timeGridDay', //timeGridWeek removido,
                    center: 'title',
                    right: 'prev,next'
                }}
                events={events}
            />
        </div>
    );
};

export default CalendarComponent;
