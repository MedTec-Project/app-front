import "./modalRegisterDoctor.css";
import {useEffect, useState} from "react";
import TextInput from "../../TextInput/TextInput.jsx";
import ModalRegister from "../../ModalRegister/ModalRegister.jsx";

export default function ModalRegisterDoctor({isOpen, handleClose, handleSubmit, doctor, handleClean}) {
    const initialState = {
        oid: '',
        name: '',
        specialty: '',
        crm: ''
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (isOpen) {
            if (doctor) {
                setFormData({
                    oid: doctor.oid || '',
                    name: doctor.name || '',
                    specialty: doctor.specialty || '',
                    crm: doctor.crm || ''
                });
            } else {
                setFormData(initialState);
            }
        }
    }, [isOpen, doctor]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value || "",
        }));
    };

    const handleFormSubmit = () => {
        handleSubmit(formData);
    };

    return (
        <ModalRegister isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit}
                       handleClean={handleClean} width={"30rem"} labelSubmit={"Cadastrar"} labelCancel={"Excluir"}
                       height={"27rem"} title={"Cadastrar Médico"}>
            <div className="modal-register-doctor">
                <div className="left-side">
                    <div className="form-group">
                        <TextInput label="Nome" placeholder="Nome do médico" value={formData.name}
                                   onChange={(e) => handleChange('name', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <TextInput label="Tipo" placeholder="Tipo" value={formData.specialty}
                                   onChange={(e) => handleChange('specialty', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <TextInput label="CRM" placeholder="CRM" value={formData.crm}
                                   onChange={(e) => handleChange('crm', e.target.value)}/>
                    </div>
                </div>
            </div>
        </ModalRegister>
    );
}
