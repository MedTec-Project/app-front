import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';
import { ptBR } from 'date-fns/locale';
import InputMask from 'react-input-mask';

const MaskedInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <InputMask
        mask="99/99/9999"
        value={value}
        onChange={onChange}
        maskChar={null}
    >
        {(inputProps) => (
            <input
                {...inputProps}
                ref={ref}
                onClick={onClick}
                placeholder="dd/mm/aaaa"
            />
        )}
    </InputMask>
));

const CustomDatepicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const [day, month, year] = value.split('/');
        if (day && month && year && value.length === 10) {
            const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
            if (!isNaN(parsedDate.getTime())) {
                setStartDate(parsedDate);
            } else {
                setStartDate(null);
            }
        } else {
            setStartDate(null);
        }
    };

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => {
                setStartDate(date);
                if (date) {
                    setInputValue(date.toLocaleDateString('pt-BR'));
                } else {
                    setInputValue('');
                }
            }}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            todayButton="Hoje"
            locale={ptBR}
            showYearDropdown={false}
            scrollableYearDropdown
            showWeekNumbers={false}
            customInput={
                <MaskedInput value={inputValue} onChange={handleInputChange} />
            }
        />
    );
};

export default CustomDatepicker;
