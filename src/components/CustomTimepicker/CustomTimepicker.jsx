import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import './CustomTimepicker.css';
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale'; // Localização em português, caso deseje

const CustomTimePicker = ({ value, onChange, disabled }) => {
    const handleChange = (date) => {
        onChange(date);  // Passando o valor de volta para o componente pai
    };

    return (
        <div>
            <DatePicker
                selected={value}    // Usando o valor passado para o componente
                onChange={handleChange}
                disabled={disabled}  // Controlando se o TimePicker está desabilitado
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}  // Intervalo de 15 minutos
                timeCaption="Hora"
                dateFormat="HH:mm"  // Formato de 24 horas
                locale={ptBR}  // Localização em português (Brasil)
            />
        </div>
    );
};

export default CustomTimePicker;
