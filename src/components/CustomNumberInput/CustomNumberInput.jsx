import React, { useEffect, useRef, useState } from 'react';
import './CustomNumberInput.css';

const CustomNumberInput = ({
                               value,
                               onChange,
                               min,
                               max,
                               step,
                               label,
                               required,
                               disabled,
                               incrementSvg,
                               decrementSvg
                           }) => {
    const inputRef = useRef(null);

    const handleIncrement = () => {
        if (value < max) {
            onChange(Math.min(parseInt(value) + step, max));
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(Math.max(parseInt(value) - step, min));
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        if (val === '' || /^[0-9]+$/.test(val)) {
            onChange(parseInt(val) || 0);
        }
    };

    const focusInput = () => {
        inputRef.current.focus(); // Foca no input ao clicar no container
    };

    const handleArrowClick = (e) => {
        e.stopPropagation(); // Impede que o clique na seta faça o foco perder
    };

    useEffect(() => {
        if (value) {
            inputRef.current.value = value;
        }
    }, [value]);

    return (
        <div className="custom-input-container" >
            {label && <label>{label}</label>}
            <div className="custom-number-input-container" onClick={focusInput}>
                <input
                    ref={inputRef}
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    step={step}
                    required={required}
                    disabled={disabled}
                    className="custom-number-input"
                />
                <div className="custom-arrow-container">
                    <button
                        type="button"
                        className="custom-arrow-button"
                        onClick={(e) => { handleArrowClick(e); handleIncrement(); }}
                        disabled={disabled || value >= max}
                    >
                        <img src={incrementSvg} alt="Increment" className="custom-arrow-icon"/>
                    </button>
                    <button
                        type="button"
                        className="custom-arrow-button"
                        onClick={(e) => { handleArrowClick(e); handleDecrement(); }}
                        disabled={disabled || value <= min}
                    >
                        <img src={decrementSvg} alt="Decrement" className="custom-arrow-icon"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomNumberInput;
