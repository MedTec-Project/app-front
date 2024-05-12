import React from "react";
import "./TextInput.scss";

export default function TextInput(props) {
  return (
    <div className="text-input-container">
      {props.label && <label>{props.label}</label>}
      <input
        type={props.type || "text"}
        className={`text-input ${
          props.cor || "dark"
          }`}
        style={{ width: props.width || "100%" , padding: props.padding || "0.5rem 1rem", border: `${props.border || "4"}px solid ${props.borderColor || "var(--normal)"}`}}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={props.onChange}
        name={props.name || ""}
      />
    </div>
  );
}