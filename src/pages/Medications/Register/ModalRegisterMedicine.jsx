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
    const [medicineCategory, setMedicineCategory] = useState('ANALGESIC');
    const [imageBase64, setImageBase64] = useState(null);
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [dosageType, setDosageType] = useState(1);
    const [pharmaceuticalForm, setPharmaceuticalForm] = useState('TABLET');
    const [previewImage, setPreviewImage] = useState(null);
    const [content, setContent] = useState(null);

    const [symptomsOptions, setSymptomsOptions] = useState([]);

    useEffect(() => {
        getSymptoms().then((data) => {
            if (data) {
                const options = data.map((symptom) => ({ id: symptom.oid, label: symptom.name }));
                setSymptomsOptions(options);
            }
        });
    }, []);

    /*      TABLET(1, "Comprimido"),
            CAPSULE(2, "Cápsula"),
            ORAL_DROPS(3, "Gotas Orais"),
            INJECTION(4, "Injeção"),
            OINTMENT(5, "Pomada"),
            CREAM(6, "Creme"),
            GEL(7, "Gel"),
            SYRUP(8, "Xarope"),
            SUPPOSITORY(9, "Supositório"),
            SPRAY(10, "Spray"),
            PATCH(11, "Adesivo"),
            POWDER(12, "Pó"),
            SOLUTION(13, "Solução"),
            SUSPENSION(14, "Suspensão");*/


    const [medicineCategoryOptions] = useState([
        {id: 'ANALGESIC', label: 'Analgésico'},
        {id: 'ANTIBIOTIC', label: 'Antibiótico'},
        {id: 'ANTIALERGIC', label: 'Antialérgico'},
        {id: 'ANTIINFLAMMATORY', label: 'Antiinflamatório'},
        {id: 'ANTIVIRAL', label: 'Antiviral'},
        {id: 'ANXIOLYTIC', label: 'Ansiolítico'},
        {id: 'HYPNOTIC', label: 'Hipnótico / Sedativo'},
        {id: 'ANTIDEPRESSANT', label: 'Antidepressivo'},
        {id: 'ANTIHYPERTENSIVE', label: 'Antihipertensivo'},
        {id: 'ANTIDIABETIC', label: 'Antidiabetto'},
        {id: 'ANTICOAGULANT', label: 'Anticoagulante / Antiagregante'},
        {id: 'ANTIEMETIC', label: 'Antiemético'},
        {id: 'LAXATIVE', label: 'Laxante'},
        {id: 'ANTIPSYCHOTIC', label: 'Antipsicótico'},
        {id: 'CONTRACEPTIVE', label: 'Anticoncepcional'},
        {id: 'ANTINEOPLASTIC', label: 'Antineoplásico / Quimioterápico'},
    ]);

    const [pharmaceuticalFormOptions] = useState([
        {id: 'TABLET', label: 'Comprimido'},
        {id: 'CAPSULE', label: 'Cápsula'},
        {id: 'ORAL_DROPS', label: 'Gotas Orais'},
        {id: 'INJECTION', label: 'Injeção'},
        {id: 'OINTMENT', label: 'Pomada'},
        {id: 'CREAM', label: 'Creme'},
        {id: 'GEL', label: 'Gel'},
        {id: 'SYRUP', label: 'Xarope'},
        {id: 'SUPPOSITORY', label: 'Supositório'},
        {id: 'SPRAY', label: 'Spray'},
        {id: 'PATCH', label: 'Adesivo'},
        {id: 'POWDER', label: 'Pó'},
        {id: 'SOLUTION', label: 'Solução'},
        {id: 'SUSPENSION', label: 'Suspensão'},
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
        <ModalRegister title={"Cadastrar Medicamento"} isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit} handleClean={handleClean} width={"80rem"} labelSubmit={"Cadastrar"} labelCancel={"Excluir"} height={"50rem"}>
           <div className="modal-register-medicine">
            <div className="form-group modal-register-medicine-input">
                <TextInput label="Nome" required={true} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group modal-register-medicine-input">
                <label htmlFor="dosageType">Tipo de Dosagem</label>
                <Select options={dosageTypeOptions} required={true}  onSelect={(e) => setDosageType(e.id)} />
            </div>
            <div className="form-group input-numeric">
                <TextInput label="Dosagem" required={true} value={dosage} onChange={(e) => setDosage(parseFloat(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="categoria">Categoria</label>
                <Select options={medicineCategoryOptions} required={true} onSelect={(e) => setMedicineCategory(e.id)} />
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
            <div className="form-group" style={{ gridColumn: "span 2", gridRow: "span 2", marginBottom: "0" }}>
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
                <div className="medicine-image-container">
                    {previewImage && <img src={previewImage} alt="Imagem do medicamento" />}
                </div>
            </div>
               </div>
        </ModalRegister>
    );
}
