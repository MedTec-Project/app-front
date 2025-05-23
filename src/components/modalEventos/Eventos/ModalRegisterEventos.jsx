import "./ModalRegisterEventos.css";
import {GoPaperclip} from "react-icons/go";
import {useEffect, useState} from "react";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import {getSymptoms} from "../../../api/symptom";
import ModalRegister from "../../ModalRegister/ModalRegister.jsx";

export default function ModalRegisterEventos({isOpen, handleClose, handleSubmit, handleClean}) {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [type] = useState("");
    const [symptoms, setSymptoms] = useState([]);
    const [dosage, setDosage] = useState(0.0);
    const [description, setDescription] = useState("");
    const [medicineCategory, setMedicineCategory] = useState(1);
    const [imageBase64, setImageBase64] = useState(null);
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [dosageType, setDosageType] = useState(1);
    const [pharmaceuticalForm, setPharmaceuticalForm] = useState(1);
    const [previewImage, setPreviewImage] = useState(null);
    const [content, setContent] = useState(null);

    const [symptomsOptions, setSymptomsOptions] = useState([]);

    useEffect(() => {
        getSymptoms().then((data) => {
            if (data) {
                const options = data.map((symptom) => ({id: symptom.oid, label: symptom.name}));
                setSymptomsOptions(options);
            }
        });
    }, []);

    const [medicineCategoryOptions] = useState([
        {id: 1, label: "Analgésico"},
        {id: 2, label: "Anti-inflamatório"},
        {id: 3, label: "Antialérgico"},
        {id: 4, label: "Anti-inflamatório"},
    ]);

    const [pharmaceuticalFormOptions] = useState([
        {id: 1, label: "Comprimido"},
        {id: 2, label: "Cápsula"},
        {id: 3, label: "Gotas Orais"},
        {id: 4, label: "Injeção"},
        {id: 5, label: "Pomada"},
        {id: 6, label: "Creme"},
        {id: 7, label: "Gel"},
        {id: 8, label: "Xarope"},
        {id: 9, label: "Supositório"},
        {id: 10, label: "Spray"},
        {id: 11, label: "Adesivo"},
        {id: 12, label: "Pó"},
        {id: 13, label: "Solução"},
        {id: 14, label: "Suspensão"},
    ]);

    const [dosageTypeOptions] = useState([
        {id: 1, label: ""},
        {id: 2, label: "Gramas (G)"},
        {id: 3, label: "Microgramas (MCG)"},
        {id: 4, label: "Mililitros (ML)"},
        {id: 5, label: "Gotas"},
        {id: 6, label: "Unidades Internacionais (IU)"},
        {id: 7, label: "Unidades"},
        {id: 8, label: "Porcentagem"},
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
        <ModalRegister isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit}
                       handleClean={handleClean} width={"80rem"} labelSubmit={"Cadastrar"} labelCancel={"Excluir"}
                       height={"50rem"}>
            <div className="modal-register-events">
                <div className="form-group">
                    <TextInput label="Nome" required={true} value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group" style={{gridColumn: "span 2", gridRow: "span 2"}}>
                    <div className="text-input-container">
                        <label htmlFor="description">Descrição</label>
                        <textarea value={description} placeholder="Escreva uma descrição..."
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group image">
                    <input type="file" id="documentUpload" accept="image/*" style={{display: "none"}}
                           onChange={imageHandler}/>
                    <button type="button" className="upload-btn"
                            onClick={() => document.getElementById("documentUpload").click()}>
                        <span>Anexar Documento:</span>
                        <GoPaperclip style={{marginLeft: "1rem", fontSize: "1.6rem"}}/>
                    </button>
                </div>
            </div>
        </ModalRegister>
    );
}
