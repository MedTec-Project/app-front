import React from 'react';
import DatePicker from "react-datepicker";
import './CustomTimepicker.css';
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale';

const CustomTimePicker = ({ value, onChange, disabled }) => {
    return (
        <DatePicker
            selected={value}
            onChange={onChange}
            disabled={disabled}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="HH:mm"
            locale={ptBR}
        />
    );
};

export default CustomTimePicker;
