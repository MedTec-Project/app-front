import './styles.css';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // Importando o componente FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin para a visualização do calendário em grid
import interactionPlugin from '@fullcalendar/interaction'; // Plugin para interações como arrastar eventos
import timeGridPlugin from '@fullcalendar/timegrid'; // Plugin para visualização semanal e diária

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    { title: 'Evento 1', date: '2025-03-28' },
    { title: 'Evento 2', date: '2025-03-29' }
  ]);

  // Função para quando um evento for clicado
  const handleEventClick = (info) => {
    alert('Evento clicado: ' + info.event.title);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Plugins para visualizações em grid, semanal e diária
        initialView="dayGridMonth" // Visualização inicial como "Mês"
        eventClick={handleEventClick} // Função para lidar com o clique em eventos
        editable={true} // Permite arrastar e soltar eventos
        droppable={true} // Permite adicionar eventos por arrastar
        headerToolbar={{
          left: 'prev,next today',  // Botões de navegação (anterior, próximo, hoje)
          center: 'title',          // Título centralizado
          right: 'dayGridMonth,timeGridWeek,timeGridDay' // Botões para alternar entre visualizações de Mês, Semana e Dia
        }}
        events={events}  // Passando os eventos (Apenas uma instância agora)
      />
    </div>
  );
};

export default CalendarComponent;