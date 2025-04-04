import "./ModalRegisterScheduling.css";
import { GoPaperclip } from "react-icons/go";
import { useEffect, useState } from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import MultiSelect from "../../../components/MultiSelect/MultiSelect.jsx";
import { getSymptoms } from "../../../api/symptom";

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
        <ModalRegister isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit} handleClean={handleClean} width={"80rem"} labelSubmit={"Cadastrar"} labelCancel={"Limpar"} height={"50rem"}>
            <div className="form-group">
                <TextInput label="Nome" required={true} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="reminder">Lembrete</label>
                <TextInput label="Lembrete" value={reminder} onChange={(e) => setReminder(e.target.value)} />
            </div>
            <div className="form-group">
                <TextInput label="Data Inicial" value={initialDate} onChange={(e) => setInitialDate(e.target.value)} />
            </div>
            <div className="form-group">
                <TextInput label="Data Final" value={finalDate} onChange={(e) => setFinalDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="form">Forma Farmaceutica</label>
                <Select options={pharmaceuticalFormOptions} required={true} onSelect={(e) => setPharmaceuticalForm(e.id)} />
            </div>
            <div className="form-group input-numeric">
                <TextInput label="Conteúdo" placeholder="Quantidade" value={content} onChange={(e) => setContent(parseFloat(e.target.value))} />
            </div>
            <div className="form-group">
                <TextInput label="Fabricante" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="form-group" style={{ maxWidth: "20rem" }}>
                <label htmlFor="sintomas">Sintomas</label>
                <MultiSelect options={symptomsOptions} onSelect={(selectedSymptoms) => setSymptoms(selectedSymptoms)} />
            </div>
            <div className="form-group input-numeric">
                <TextInput label="Nr. Registro" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
            </div>
            <div className="form-group" style={{ gridColumn: "span 2", gridRow: "span 2" }}>
                <div className="text-input-container">
                    <label htmlFor="description">Descrição</label>
                    <textarea value={description} placeholder="Escreva as observações..." onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
            <div className="form-group image">
                <input type="file" id="imageUpload" accept="image/*" style={{ display: "none" }} onChange={imageHandler} />
                <button type="button" className="upload-btn" onClick={() => document.getElementById("imageUpload").click()}>
                    <span>Imagem</span>
                    <GoPaperclip style={{ marginLeft: "1rem", fontSize: "1.6rem" }} />
                </button>
                <div className="image-container">
                    {previewImage && <img src={previewImage} alt="Imagem do medicamento" />}
                </div>
            </div>
        </ModalRegister>
    );
}
