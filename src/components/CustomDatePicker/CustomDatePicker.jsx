import React, { forwardRef } from 'react';
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

const CustomDatepicker = ({ value, onChange }) => {
    const formattedValue = value ? value.toLocaleDateString('pt-BR') : '';

    const handleInputChange = (e) => {
        const input = e.target.value;
        const [day, month, year] = input.split('/');
        if (day && month && year && input.length === 10) {
            const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
            if (!isNaN(parsedDate)) {
                onChange(parsedDate);
            }
        }
    };

    return (
        <DatePicker
            selected={value}
            onChange={(date) => onChange(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            todayButton="Hoje"
            locale={ptBR}
            customInput={
                <MaskedInput value={formattedValue} onChange={handleInputChange} />
            }
        />
    );
};

export default CustomDatepicker;
