import './styles.css';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    { title: 'Evento 1', date: '2025-03-28' },
    { title: 'Evento 2', date: '2025-03-29' }
  ]);

  const handleEventClick = (info) => {
    alert('Evento clicado: ' + info.event.title);
  };

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