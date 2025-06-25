import "./ModalRegisterEventos.css";
import {GoPaperclip} from "react-icons/go";
import {useEffect, useState} from "react";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import {getSymptoms} from "../../../api/symptom";
import ModalRegister from "../../ModalRegister/ModalRegister.jsx";
import CustomDatepicker from "../../CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../CustomTimepicker/CustomTimepicker.jsx";

export default function ModalRegisterEventos({isOpen, handleClose, handleSubmit, event}) {
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
                       handleClean={handleClean} width={"80rem"} labelSubmit={"Cadastrar"} labelCancel={"Limpar"}
                       height={"50rem"} title={"Cadastrar Evento"}>
            <div className="modal-register-events">
                <div className="left-side">
                    <div className="form-group">
                        <TextInput label="Titulo" placeholder="Escreva um titulo..." value={formData.title}
                                   onChange={(e) => handleChange('title', e.target.value)}/>
                    </div>
                    <div className="form-group" style={{gridColumn: "span 2", gridRow: "span 2"}}>
                        <div className="text-input-container">
                            <label htmlFor="description">Descrição</label>
                            <textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
                        </div>
                    </div>
                    {/*<div className="form-group image">*/}
                    {/*    <input type="file" id="documentUpload" accept="image/*" style={{display: "none"}}*/}
                    {/*           onChange={(e) => handleChange('file', e.target.files[0])}/>*/}
                    {/*    <button type="button" className="upload-btn"*/}
                    {/*            onClick={() => document.getElementById("documentUpload").click()}>*/}
                    {/*        <span>Anexar Documento:</span>*/}
                    {/*        <GoPaperclip style={{marginLeft: "1rem", fontSize: "1.6rem"}}/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
                <div className="right-side">
                    <div className="section section-date">
                        <div className="form-group">
                            <label htmlFor="doctor">Data:</label>
                            <CustomDatepicker value={formData.scheduleDate}
                                              onChange={(e) => handleChange('scheduleDate', e)}/>
                        </div>
                    </div>
                    <div className="section section-time">
                        <div className="form-group">
                            <label htmlFor="horaInicio">Hora de Início:</label>
                            <CustomTimepicker value={formData.scheduleDate}
                                              onChange={(e) => handleChange('scheduleDate', e)}/>
                        </div>
                    </div>
                </div>
            </div>
        </ModalRegister>
    );
}
