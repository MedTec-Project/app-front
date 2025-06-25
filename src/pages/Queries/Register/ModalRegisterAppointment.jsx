import "./ModalRegisterAppointment.css";
import {useEffect, useState} from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import CustomDatepicker from "../../../components/CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../../components/CustomTimepicker/CustomTimepicker.jsx";
import {getDoctors} from "../../../api/doctor.jsx";
import {UtilDate} from "../../../utils/UtilDate.jsx";

export function ModalRegisterAppointment({isOpen, handleClose, handleSubmit, handleClean, appointment}) {
    const initialState = {
        oid: appointment?.oid,
        oidDoctor: appointment?.oidDoctor,
        scheduleDate: appointment?.scheduleDate,
        reminder: appointment?.reminder
    };
    const [formData, setFormData] = useState(initialState);
    const [doctorOptions, setDoctorOptions] = useState([]);
    useEffect(() => {
        if (isOpen) {

            setFormData({
                oid: appointment?.oid,
                oidDoctor: appointment?.oidDoctor,
                scheduleDate: appointment?.scheduleDate ? UtilDate.parseDate(appointment.scheduleDate) : null,
                reminder: appointment?.reminder
            });
        }
        getDoctors().then((data) => {
            if (data) {
                const options = data.map((doctor) => ({oid: doctor.oid, label: doctor.name}));
                setDoctorOptions(options);
            }
        });
    }, [isOpen]);

    const handleChange = (field, value) => {
        setFormData(prev => {
            const updated = {...prev, [field]: value};

            if (field === 'scheduleDate') {
                const next = new Date(updated.scheduleDate);
                next.setHours(next.getHours());
                updated.scheduleDate = next;
            }

            return updated;
        });
    };

    const handleFormSubmit = () => {
        const appointment = {
            ...formData
        };
        handleSubmit(appointment);
    };

    const clearForm = () => {
        setFormData(initialState);
    };

    return (
        <ModalRegister title={"Agendar Consulta"} isOpen={isOpen} handleClose={handleClose}
                       handleSubmit={handleFormSubmit} handleClean={clearForm} width={"60rem"} labelSubmit={"Agendar"}
                       labelCancel={"Limpar"} height={"35rem"}>
            <div className="modal-register-schedule">
                <div className="left-side">
                    <div className="form-group">
                        <TextInput label="Lembrete:" value={formData.reminder}
                                   onChange={(e) => handleChange('reminder', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="doctor">Médico:</label>
                        <Select options={doctorOptions} placeholder={"Selecione um médico..."} value={formData.oidDoctor}
                                onSelect={(e) => handleChange('oidDoctor', e.oid)}/>
                    </div>
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
