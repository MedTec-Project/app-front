import "./TextInput.css";

export default  function TextInput({label, placeholder, value, onChange}) {
    return (
        <div className="text-input-container">
            { label && <label htmlFor={label}>{label}</label> }
            <input type="text" value={value} onChange={onChange}/>
        </div>
    );
}