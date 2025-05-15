import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomDatePicker.css';
import { ptBR } from 'date-fns/locale';
import InputMask from 'react-input-mask'; // Importando a biblioteca para máscara

const CustomDatepicker = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
            showYearDropdown={false}
            showWeekNumbers={false}
            scrollableYearDropdown
            isClearable
            todayButton="Hoje"
            locale={ptBR}
            customInput={
                <InputMask
                    mask="99/99/9999" // Máscara para data (dd/MM/yyyy)
                    value={startDate ? startDate.toLocaleDateString('pt-BR') : ''}
                    onChange={(e) => setStartDate(e.target.value)}
                >
                    {(inputProps) => <input {...inputProps} />}
                </InputMask>
            }
        />
    );
};

export default CustomDatepicker;
