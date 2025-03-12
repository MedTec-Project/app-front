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
    const [type, setType] = useState("");
    const [symptoms, setSymptoms] = useState([]); // Alterado para ser uma lista de sintomas
    const [dosage, setDosage] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [numberReg, setNumberReg] = useState("");
    const [symptomsOptions, setSymptomsOptions] = useState([]);

    useEffect(() => {
        getSymptoms().then((data) => {
            if (data) {
                const options = data.map((symptom) => ({ id: symptom.oid, label: symptom.name }));
                setSymptomsOptions(options);
            }
        });
    }, []);

    const [categoryOptions, setCategoryOptions] = useState([
        { id: "1", label: "Analgésico" },
        { id: "2", label: "Anti-inflamatório" },
        { id: "3", label: "Antialérgico" },
        { id: "4", label: "Anti-inflamatório" },
    ]);

    const imageHandler = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) { // Validação de tipo de imagem
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, selecione um arquivo de imagem válido.");
        }
    };

    const validateForm = () => {
        if (!name || !dosage || !category || !description || symptoms.length === 0) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        return true;
    };

    const handleFormSubmit = () => {
        if (validateForm()) {
            handleSubmit({
                name,
                brand,
                type,
                symptoms,
                dosage,
                description,
                category,
                image,
                numberReg
            });
        }
    };

    return (
        <ModalRegister isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit} handleClean={handleClean} labelSubmit={"Cadastrar"} labelCancel={"Excluir"}>
            <div className="form-group">
                <TextInput label="Nome" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <TextInput label="Dosagem" placeholder="Dosagem" value={dosage} onChange={(e) => setDosage(e.target.value)} />
            </div>
            <div className="form-group" style={{ maxWidth: "20rem" }}>
                <label htmlFor="sintomas">Sintomas</label>
                <MultiSelect options={symptomsOptions} placeholder="Sintomas" onSelect={(selectedSymptoms) => setSymptoms(selectedSymptoms)} />
            </div>
            <div className="form-group">
                <TextInput label="Fabricante" placeholder="Fabricante" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="form-group">
                <TextInput label="Nr. Registro" placeholder="Nr. Registro" value={numberReg} onChange={(e) => setNumberReg(e.target.value)} />
            </div>
            <div className="form-group image">
                <input type="file" id="imageUpload" accept="image/*" style={{ display: "none" }} onChange={imageHandler} />
                <button type="button" className="upload-btn" onClick={() => document.getElementById("imageUpload").click()}>
                    <span>Imagem</span>
                    <GoPaperclip style={{ marginLeft: "1rem", fontSize: "1.6rem" }} />
                </button>
                <div className="image-container">
                    {image && <img src={image} alt="Imagem do medicamento" />}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="categoria">Categoria</label>
                <Select options={categoryOptions} placeholder="Categoria" onSelect={(e) => setCategory(e.label)} />
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
