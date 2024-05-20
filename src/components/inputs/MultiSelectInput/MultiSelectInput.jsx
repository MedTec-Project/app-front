import React, { useState } from "react";
import "./MultiSelectInput.scss";
export default function MultiSelectInput(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(false);

  const toggleOption = (e) => {
    const selectedIndex = selectedOptions.indexOf(e.target.value);

    if (selectedIndex === -1) {
      setSelectedOptions([...selectedOptions, e.target.value]);
    } else {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== e.target.value)
      );
    }
  };

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  return (
    <div className="multi-select-container" style={{ width: props.width }}>
      {props.label && <label>{props.label}</label>}
      <div className="multi-select" onClick={toggleDropdown}>
        <span className="multi-select-content">Selecione as opções</span>
        <div className="multi-select-icon">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      {activeDropdown && (
        <div className="multi-select-dropdown">
          {props.options.map((option) => (
            <button
              key={option.value}
              value={option.value}
              onClick={toggleOption}
              className={
                selectedOptions.indexOf(option.value) !== -1 ? "selected" : ""
              }
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
