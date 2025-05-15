import "./MedicineInput.css";
import {useEffect, useState} from "react";
import {getMedicines} from "../../../api/medication.jsx";

export default function MedicineInput({ name, label, required, value }) {
    const [isFocused, setIsFocused] = useState(false);
    const [medications, setMedications] = useState([]);
    const [medicationsFiltered, setMedicationsFiltered] = useState([]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const fetchMedicines = async () => {
        const medicines = await getMedicines();
        setMedications(medicines);
        setMedicationsFiltered(medicines);
    };
                                                      
    const onChange = (e) => {
        const value = e.target.value;
        setMedicationsFiltered(medications.filter((medication) => medication.name.toLowerCase().includes(value.toLowerCase())));
    }

    useEffect(() => {
        if (isFocused) {
            fetchMedicines();
        }
    }, [isFocused]);



    return (
        <div className="medication-input-container">
            <div className="medication-input-label">
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="medication-input">
                <input type="text" name={name} value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} required={required}/>
                { isFocused && (
                    <div className="medication-input-options-container">
                        <div className="medication-input-options">
                        {medicationsFiltered.map((medication) => (
                            <div key={medication.oid} className="medication-input-option">
                                <img src={`data:image/jpeg;base64,${medication.imageBase64}`} alt={medication.name}/>
                                <p>{medication.name}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}