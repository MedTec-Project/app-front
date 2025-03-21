import "./ModalRegisterMedicine.css";
import { GoPaperclip } from "react-icons/go";
import { useEffect, useState } from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import MultiSelect from "../../../components/MultiSelect/MultiSelect.jsx";
import { getSymptoms } from "../../../api/symptom";

export default function ModalRegisterMedicine({ isOpen, handleClose, handleSubmit, handleClean }) {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [type] = useState("");
    const [symptoms, setSymptoms] = useState([]);
    const [dosage, setDosage] = useState(0.0);
    const [description, setDescription] = useState("");
    const [medicineCategory, setMedicineCategory] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [dosageType, setDosageType] = useState(null);
    const [pharmaceuticalForm, setPharmaceuticalForm] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [symptomsOptions, setSymptomsOptions] = useState([]);

    useEffect(() => {
        getSymptoms().then((data) => {
            if (data) {
                const options = data.map((symptom) => ({ id: symptom.oid, label: symptom.name }));
                setSymptomsOptions(options);
            }
        });
    }, []);

    const [medicineCategoryOptions] = useState([
        { id: 1, label: "Analgésico" },
        { id: 2, label: "Anti-inflamatório" },
        { id: 3, label: "Antialérgico" },
        { id: 4, label: "Anti-inflamatório" },
    ]);

    const [pharmaceuticalFormOptions] = useState([
        { id: 1, label: "Comprimido" },
        { id: 2, label: "Cápsula" },
        { id: 3, label: "Gotas Orais" },
        { id: 4, label: "Injeção" },
        { id: 5, label: "Pomada" },
        { id: 6, label: "Creme" },
        { id: 7, label: "Gel" },
        { id: 8, label: "Xarope" },
        { id: 9, label: "Supositório" },
        { id: 10, label: "Spray" },
        { id: 11, label: "Adesivo" },
        { id: 12, label: "Pó" },
        { id: 13, label: "Solução" },
        { id: 14, label: "Suspensão" },
    ]);

    const [dosageTypeOptions] = useState([
        { id: 1, label: "Miligramas (MG)" },
        { id: 2, label: "Gramas (G)" },
        { id: 3, label: "Microgramas (MCG)" },
        { id: 4, label: "Mililitros (ML)" },
        { id: 5, label: "Gotas" },
        { id: 6, label: "Unidades Internacionais (IU)" },
        { id: 7, label: "Unidades" },
        { id: 8, label: "Porcentagem" },
    ]);

    const imageHandler = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result.split(",")[1]);
                setPreviewImage(reader.result);
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
            pharmaceuticalForm
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
        <ModalRegister isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit} handleClean={handleClean} labelSubmit={"Cadastrar"} labelCancel={"Excluir"} height={"50rem"}>
            <div className="form-group">
                <TextInput label="Nome" required={true} placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <TextInput label="Dosagem" required={true} placeholder="Dosagem" value={dosage} onChange={(e) => setDosage(parseFloat(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="dosageType">Tipo de Dosagem</label>
                <Select options={dosageTypeOptions} required={true} placeholder="Tipo de Dosagem" onSelect={(e) => setDosageType(e.id)} />
            </div>
            <div className="form-group">
                <TextInput label="Fabricante" placeholder="Fabricante" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="form-group">
                <TextInput label="Nr. Registro" placeholder="Nr. Registro" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
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
            <div className="form-group">
                <label htmlFor="categoria">Categoria</label>
                <Select options={medicineCategoryOptions} placeholder="Categoria" required={true} onSelect={(e) => setMedicineCategory(e.id)} />
            </div>
            <div className="form-group">
                <label htmlFor="form">Forma Farmaceutica</label>
                <Select options={pharmaceuticalFormOptions} placeholder="Forma Farmaceutica" required={true} onSelect={(e) => setPharmaceuticalForm(e.id)} />
            </div>
            <div className="form-group" style={{ maxWidth: "20rem" }}>
                <label htmlFor="sintomas">Sintomas</label>
                <MultiSelect options={symptomsOptions} placeholder="Sintomas" onSelect={(selectedSymptoms) => setSymptoms(selectedSymptoms)} />
            </div>
            <div className="form-group">
                <div className="text-input-container">
                    <label htmlFor="description">Descrição</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
        </ModalRegister>
    );
}
