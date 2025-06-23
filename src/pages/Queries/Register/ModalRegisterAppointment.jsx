import "./ModalRegisterAppointment.css";
import {useEffect, useState} from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import CustomDatepicker from "../../../components/CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../../components/CustomTimepicker/CustomTimepicker.jsx";
import {getDoctors} from "../../../api/doctor.jsx";

export default function ModalRegisterAppointment({isOpen, handleClose, handleSubmit, handleClean}) {
    const [oidDoctor, setOidDoctor] = useState("");
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [reminder, setReminder] = useState("");
    const [doctorOptions, setDoctorOptions] = useState([]);

    useEffect(() => {
        getDoctors().then((data) => {
            if (data) {
                const options = data.map((doctor) => ({ oid: doctor.oid, label: doctor.name }));
                setDoctorOptions(options);
            }
        });
    }, []);

    const handleFormSubmit = () => {
        const appointment = {
            oidDoctor,
            scheduleDate,
            reminder
        };
        handleSubmit(appointment);
    };

    return (
        <ModalRegister title={"Agendar Consulta"} isOpen={isOpen} handleClose={handleClose}
                       handleSubmit={handleFormSubmit} handleClean={handleClean} width={"60rem"} labelSubmit={"Agendar"}
                       labelCancel={"Limpar"} height={"35rem"}>
            <div className="modal-register-schedule">
                <div className="left-side">
                    <div className="form-group">
                        <TextInput label="Lembrete:" value={reminder} onChange={(e) => setReminder(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="doctor">Médico:</label>
                        <Select options={doctorOptions} placeholder={"Selecione um médico..."}
                                onSelect={(e) => setOidDoctor(e.oid)}/>
                    </div>
                </div>
                <div className="right-side">
                    <div className="section section-date">
                        <div className="form-group">
                            <label htmlFor="doctor">Data:</label>
                            <CustomDatepicker value={scheduleDate} onChange={(e) => setScheduleDate(e)}/>
                        </div>
                    </div>
                    <div className="section section-time">
                        <div className="form-group">
                            <label htmlFor="horaInicio">Hora de Início:</label>
                            <CustomTimepicker value={scheduleDate} onChange={(e) => setScheduleDate(e)}/>
                        </div>
                    </div>
                </div>
            </div>
        </ModalRegister>
    );
}
