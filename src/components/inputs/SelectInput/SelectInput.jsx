import React from "react";
import "./SelectInput.scss";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function SelectInput(props) {
  return (
    <div className="select-input-container">
      {props.label && <label>{props.label}</label>}
      <select
        className={`select-input ${
          props.cor || "dark"
          }`}
        style={{ width: props.width || "100%" , padding: props.padding || "0.5rem"}}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>{option.text}</option>
          
        ))}
    
      </select>
    </div>
    
  );
}