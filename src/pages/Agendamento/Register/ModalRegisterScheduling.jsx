import "./ModalRegisterScheduling.css";
import { GoPaperclip } from "react-icons/go";
import { useEffect, useState } from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import MultiSelect from "../../../components/MultiSelect/MultiSelect.jsx";
import { getSymptoms } from "../../../api/symptom";
import MedicineInput from "../../Medications/Input/MedicineInput.jsx";

export default function ModalRegisterScheduling({ isOpen, handleClose, handleSubmit, handleClean }) {
     const [medicine, setMedicine] = useState(null);
     const [doctor, setDoctor] = useState(null);
     const [initialDate, setInitialDate] = useState(new Date());
     const [finalDate, setFinalDate] = useState(new Date());
     const [quantity, setQuantity] = useState(1);
     const [interval, setInterval] = useState(1);
     const [reminder, setReminder] = useState(false);
     const [medicineOptions, setMedicineOptions] = useState([]);
     const [doctorOptions, setDoctorOptions] = useState([]);
     const [receipt, setReceipt] = useState(null);

    const imageHandler = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/') || file.type.startsWith('application/pdf')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setReceipt(reader.result.split(",")[1]);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, selecione um arquivo de imagem válido.");
        }
    };

    const handleFormSubmit = () => {
        const medicine = transformFormToObject();
        handleSubmit(medicine);
    };

    const transformFormToObject = () => {

        const medicine = {
            name,
            brand,
            type,
            symptoms,
            dosage,
            description,
            medicineCategory,
            imageBase64,
            registrationNumber,
            dosageType,
            pharmaceuticalForm,
            content
        };

        medicine.symptoms = medicine.symptoms.map(symptom => {
            return {
                name: symptom.name,
                oid: symptom.oid
            };
        });
        return medicine;
    };

    return (
        <ModalRegister title={"Agendar Medicamento"} isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit} handleClean={handleClean} width={"80rem"} labelSubmit={"Agendar"} labelCancel={"Limpar"} height={"50rem"}>
            <div className="form-group" style={{ gridColumn: "span 2", gridRow: "span 2" }}>
                <MedicineInput name="medicine" label="Medicamento" required={true} value={medicine} onChange={(e) => setMedicine(e.target.value)} />
            </div>
        </ModalRegister>
    );
}
