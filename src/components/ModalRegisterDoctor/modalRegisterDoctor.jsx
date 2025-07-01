import "./modalRegisterDoctor.css";
import {useState} from "react";
import TextInput from "../../components/TextInput/TextInput.jsx";
import ModalRegister from "../../components/ModalRegister/ModalRegister.jsx";
import CustomDatepicker from "../../components/CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../components/CustomTimepicker/CustomTimepicker.jsx";

export default function ModalRegisterDoctor({isOpen, handleClose, handleSubmit, event}) {
    const initialState = {
        title: event?.title,
        description: event?.description,
        file: event?.file,
        scheduleDate: event?.scheduleDate,
    };
    const [formData, setFormData] = useState(initialState);

    const handleChange = (field, value) => {
        setFormData(prev => {
            const updated = {...prev, [field]: value};

            if (field === 'scheduleDate') {
                const next = new Date(updated.scheduleDate);
                next.setHours(next.getHours() + 1);
                updated.scheduleDate = next;
            }

            return updated;
        });
    };

    const handleFormSubmit = () => {
        handleSubmit(formData);
    };

    const handleClean = () => {
        setFormData(initialState);
    };


    return (
        <ModalRegister isOpen={isOpen} handleClose={handleClose} handleSubmit={handleFormSubmit}
                       handleClean={handleClean} width={"30rem"} labelSubmit={"Cadastrar"} labelCancel={"Limpar"}
                       height={"25rem"} title={"Cadastrar Médico"}>
            <div className="modal-register-doctor">
                <div className="left-side">
                    <div className="form-group">
                        <TextInput label="Titulo" placeholder="Nome do médico" value={formData.title}
                                   onChange={(e) => handleChange('title', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <TextInput label="Titulo" placeholder="Tipo" value={formData.title}
                                   onChange={(e) => handleChange('title', e.target.value)}/>
                    </div>
                </div>
            </div>
        </ModalRegister>
    );
}
