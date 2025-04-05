import "./TextInput.css";

export default function TextInput({ label, placeholder, value, onChange, required }) {
    return (
        <div className="text-input-container">
            {label && (
                <label htmlFor={label}>
                    {label}
                    {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
                </label>
            )}
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                id={label}
            />
        </div>
    );
}
