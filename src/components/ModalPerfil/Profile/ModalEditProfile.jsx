import "./ModalEditProfile.css";
import {useEffect, useState} from "react";
import TextInput from "../../TextInput/TextInput.jsx";
import ModalRegister from "../../ModalRegister/ModalRegister.jsx";

export default function ModalEditProfile({isOpen, handleClose, handleSubmit, user, handleClean}) {
    const initialState = {
        oid: user?.oid,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
    };
    const [formData, setFormData] = useState(initialState);

    const handleChange = (field, value) => {
        setFormData(prev => {
            return {...prev, [field]: value};
        });
    };

    const handleFormSubmit = () => {
        handleSubmit(formData);
    };

    useEffect(() => {
        if (isOpen) {
            setFormData(initialState);
        }
    }, [isOpen]);

    return (
        <ModalRegister isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit}
                      width={"30rem"} labelSubmit={"Editar"}
                       height={"27rem"} title={"Editar Perfil"}>
            <div className="modal-edit-profile">
                <div className="left-side">
                    <div className="form-group">
                        <TextInput label="Nome" placeholder="Nome" value={formData.name}
                                   onChange={(e) => handleChange('name', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <TextInput label="Telefone" placeholder="Telefone" value={formData.phone}
                                   onChange={(e) => handleChange('phone', e.target.value)}/>
                    </div>
                </div>
            </div>
        </ModalRegister>
    );
}
