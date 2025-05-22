import { useState } from "react";
import "./Select.css";
import arrow from "../../assets/icons/arrow-down.png";

export default function Select({ options, placeholder, onSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    return (
        <div className="select-container" style={{width: "100%", height: "100%"}}>
            <div
                className="select-box"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption ? selectedOption.label : (placeholder ? placeholder : options[0].label)}</span>
                <img
                    src={arrow}
                    alt="Seta"
                    className={`select-arrow ${isOpen ? "rotate" : ""}`}
                />
            </div>

            {isOpen && (
                <ul className="select-options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="select-option"
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
