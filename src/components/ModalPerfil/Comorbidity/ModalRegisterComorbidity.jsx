import {useEffect, useState} from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import CustomDatepicker from "../../../components/CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../../components/CustomTimepicker/CustomTimepicker.jsx";
import {getComorbidityTypes} from "../../../api/comorbidity.jsx";

export function ModalRegisterComorbidity({isOpen, handleClose, handleSubmit, comorbidity, handleClean}) {
    const initialState = {
        oid: comorbidity?.oid,
        oidComorbidityType: comorbidity?.oidComorbidityType,
        name: comorbidity?.name,
    };
    console.log(initialState);
    const [formData, setFormData] = useState(initialState);
    const [comorbidityTypeOptions, setComorbidityTypeOptions] = useState([]);
    useEffect(() => {
        if (isOpen) {

            setFormData({
                oid: comorbidity?.oid,
                oidComorbidityType: comorbidity?.oidComorbidityType,
                name: comorbidity?.name,
            });
        }
        getComorbidityTypes().then((data) => {
            if (data) {
                const options = data.map((comorbidityType) => ({oid: comorbidityType.oid, label: comorbidityType.name}));
                setComorbidityTypeOptions(options);
            }
        });
    }, [isOpen]);

    const handleChange = (field, value) => {
        setFormData(prev => {
            return {...prev, [field]: value};
        });
    };

    const handleFormSubmit = () => {
        const comorbidity = {
            ...formData
        };
        handleSubmit(comorbidity);
    };

    return (
        <ModalRegister title={"Adicionar Comorbididade"} isOpen={isOpen} handleClose={handleClose}
                       handleSubmit={handleFormSubmit} handleClean={handleClean} width={"60rem"} labelSubmit={"Adicionar"}
                       labelCancel={"Excluir"} height={"35rem"}>
            <div className="modal-register-schedule">
                <div className="left-side">
                    <div className="form-group">
                        <TextInput label="Nome da Comorbidade:" value={formData.name}
                                   onChange={(e) => handleChange('name', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="doctor">Tipo de Comorbidade:</label>
                        <Select options={comorbidityTypeOptions} placeholder={"Selecione um tipo..."} value={formData.oidComorbidityType}
                                onSelect={(e) => handleChange('oidComorbidityType', e.oid)}/>
                    </div>
                </div>
            </div>
        </ModalRegister>
    );
}
