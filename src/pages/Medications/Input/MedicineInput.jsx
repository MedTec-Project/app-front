import "./MedicineInput.css";
import {useEffect, useState} from "react";
import {getMedicines} from "../../../api/medication.jsx";

export default function MedicineInput({name, label, required, value, setValue}) {
    const [isFocused, setIsFocused] = useState(false);
    const [medications, setMedications] = useState([]);
    const [medicationsFiltered, setMedicationsFiltered] = useState([]);
    const [medication, setMedication] = useState(null);
    const [nameMedication, setNameMedication] = useState("");

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        if (e.target.value !== "" && medication === null) {
            setMedication(null);
            setNameMedication("");
        }
        if (medication !== null && e.target.value !== medication.name) {
            setMedication(null);
            setNameMedication("");
        }
        setIsFocused(false);
    };

    const fetchMedicines = async () => {
        const medicines = await getMedicines();
        setMedications(medicines);
        setMedicationsFiltered(medicines);
    };

    const onChange = (e) => {
        const valueKey = e.target.value;
        setNameMedication(valueKey);
        setMedicationsFiltered(medications.filter((medication) => medication.name.toLowerCase().includes(valueKey.toLowerCase())));
    }

    const onSelect = (medicationTarget) => {
        setMedication(medicationTarget);
        setValue(medicationTarget.oid);
        setNameMedication(medicationTarget.name);
        setIsFocused(false);
    }


    useEffect(() => {
        if (isFocused) {
            fetchMedicines();
        }
        if (value) {
            if (!medications.length) {
                fetchMedicines().then(() => {
                    var medication = medications.find(medication => medication.oid === value);
                    setNameMedication(medication.name);
                });
            } else {
                var medication = medications.find(medication => medication.oid === value);
                setNameMedication(medication.name);
            }
        } else {
            setNameMedication("");
        }
    }, [value, medications]);


    return (
        <div className="medication-input-container">
            <div className="medication-input-label">
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="medication-input" style={{width: "100%", height: "100%"}}>
                <input type="text" name={name} value={nameMedication} onChange={onChange} onFocus={handleFocus}
                       onBlur={handleBlur} required={required} style={{width: "100%", height: "100%"}}/>
                {isFocused && (
                    <div className="medication-input-options-container">
                        <div className="medication-input-options" style={{width: "100%", height: "100%"}}>
                            {medicationsFiltered.map((medication) => (
                                <div key={medication.oid} className="medication-input-option"
                                     onMouseDown={() => onSelect(medication)}>
                                    <img src={`data:image/jpeg;base64,${medication.imageBase64}`}
                                         alt={medication.name}/>
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
