import { useEffect, useState } from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import CustomDatepicker from "../../../components/CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../../components/CustomTimepicker/CustomTimepicker.jsx";
import { getComorbidityTypes } from "../../../api/comorbidity.jsx";
import "./ModalRegisterComorbidity.css";

export function ModalRegisterComorbidity({ isOpen, handleClose, handleSubmit, comorbidity, handleClean }) {
    const initialState = {
        oid: '',
        oidComorbidityType: '',
        name: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [comorbidityTypeOptions, setComorbidityTypeOptions] = useState([]);

    useEffect(() => {
        if (isOpen) {
            if (comorbidity) {
                setFormData({
                    oid: comorbidity?.oid,
                    oidComorbidityType: comorbidity?.oidComorbidityType,
                    name: comorbidity?.name,
                });
            } else {
                setFormData(initialState);
            }
        }

        getComorbidityTypes().then((data) => {
            if (data) {
                const options = data.map((comorbidityType) => ({ oid: comorbidityType.oid, label: comorbidityType.name }));
                setComorbidityTypeOptions(options);
            }
        });
    }, [isOpen, comorbidity]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value || "",
        }));
    };

    const handleFormSubmit = () => {
        const comorbidity = { ...formData };
        handleSubmit(comorbidity);
    };

    return (
        <ModalRegister title={"Adicionar Comorbididade"} isOpen={isOpen} handleClose={handleClose}
                       handleSubmit={handleFormSubmit} handleClean={handleClean} width={"30rem"} labelSubmit={"Adicionar"}
                       labelCancel={"Excluir"} height={"25rem"}>
            <div className="modal-register-comorbidity">
                <div className="left-side">
                    <div className="form-group">
                        <TextInput label="Nome da Comorbidade:" value={formData.name}
                                   onChange={(e) => handleChange('name', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="doctor">Tipo de Comorbidade:</label>
                        <Select options={comorbidityTypeOptions} placeholder={"Selecione um tipo..."} value={formData.oidComorbidityType}
                                onSelect={(e) => handleChange('oidComorbidityType', e.oid)} />
                    </div>
                </div>
            </div>
        </ModalRegister>
    );
}
