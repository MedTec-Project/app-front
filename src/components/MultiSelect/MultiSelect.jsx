import { useState } from "react";
import "./MultiSelect.css";
import arrow from "../../assets/icons/arrow-down.png";

export default function MultiSelect({ options, placeholder, onSelect }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        // Verifica se a opção já foi selecionada
        const newSelectedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter((item) => item !== option) // Remove se já estiver selecionada
            : [...selectedOptions, option]; // Adiciona se não estiver selecionada

        setSelectedOptions(newSelectedOptions);

        // Passa as opções selecionadas para o callback onSelect, se fornecido
        if (onSelect) onSelect(newSelectedOptions);
    };

    return (
        <div className="multi-select-container">
            <div
                className="multi-select-box"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>
                    {selectedOptions.length > 0
                        ? selectedOptions.map((option) => option.label).join(", ")
                        : placeholder || "Selecione..."}
                </span>
                <img
                    src={arrow}
                    alt="Seta"
                    className={`multi-select-arrow ${isOpen ? "rotate" : ""}`}
                />
            </div>

            {isOpen && (
                <ul className="multi-select-options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`multi-select-option ${selectedOptions.includes(option) ? "selected" : ""}`}
                            onClick={() => handleSelect(option)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                readOnly
                            />
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
