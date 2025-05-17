import "./ModalRegisterScheduling.css";
import {GoPaperclip} from "react-icons/go";
import {useEffect, useState} from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import MultiSelect from "../../../components/MultiSelect/MultiSelect.jsx";
import {getSymptoms} from "../../../api/symptom";
import MedicineInput from "../../Medications/Input/MedicineInput.jsx";
import DatePicker from "react-datepicker";
import CustomDatepicker from "../../../components/CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../../components/CustomTimepicker/CustomTimepicker.jsx";
import CustomNumberInput from "../../../components/CustomNumberInput/CustomNumberInput.jsx";
import IncrementSvg from "../../../assets/icons/increment-arrow.svg";
import DecrementSvg from "../../../assets/icons/decrement-arrow.svg";

export default function ModalRegisterScheduling({isOpen, handleClose, handleSubmit, handleClean}) {
    const [medicine, setMedicine] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const [quantity, setQuantity] = useState(1);
    const [interval, setInterval] = useState(1);
    const [reminder, setReminder] = useState(null);
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [receipt, setReceipt] = useState(null);
    const [nextHour, setNextHour] = useState(null);

    const changeInterval = (e) => {
        const interval = parseInt(e);
        const nextHour = new Date(initialDate);
        nextHour.setHours(nextHour.getHours() + interval);
        setNextHour(nextHour);
        setInterval(interval);
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
        <ModalRegister title={"Agendar Medicamento"} isOpen={isOpen} handleClose={handleClose}
                       handleSubmit={handleFormSubmit} handleClean={handleClean} width={"80rem"} labelSubmit={"Agendar"}
                       labelCancel={"Limpar"} height={"50rem"}>
            <div className="modal-register-schedule">
                <div className="form-group" style={{gridColumn: "span 2"}}>
                    <MedicineInput width={"30rem"} name="medicine" label="Medicamento" required={true} value={medicine}
                                   onChange={(e) => setMedicine(e.target.value)}/>
                </div>
                <div className="form-group" style={{gridColumn: "span 2"}}>
                    <TextInput label="Lembrete" value={reminder} onChange={(e) => setReminder(e.target.value)}/>
                </div>
                <div className="form-group" style={{gridColumn: "span 2"}}>
                    <label htmlFor="doctor">Médico Responsável</label>
                    <Select options={doctorOptions} placeholder={"Selecione um médico..."}
                            onSelect={(e) => setDoctor(e.id)}/>
                </div>
                <div className="form-group" style={{gridColumn: "span 2"}}>
                    <label htmlFor="doctor">Data de Início</label>
                    <CustomDatepicker value={initialDate} onChange={(e) => setInitialDate(e)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="doctor">Data de Término</label>
                    <CustomDatepicker showMonthYearDropdown={true} showYearDropdown={true} selected={finalDate}
                                      onChange={(e) => setFinalDate(e)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="horaInicio">Hora de Início</label>
                    <CustomTimepicker value={initialDate} onChange={(e) => setInitialDate(e)}/>
                </div>
                <div className="form-group" style={{gridColumn: "span 2"}}>
                    <CustomNumberInput
                        value={interval}
                        onChange={(e) => changeInterval(e)}
                        min={0}
                        max={100}
                        step={1}
                        label="Quantidade"
                        required={true}
                        incrementSvg={IncrementSvg}
                        decrementSvg={DecrementSvg}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="proxHora">Proximo horário</label>
                    <CustomTimepicker value={nextHour} disabled={true}/>
                </div>
            </div>
        </ModalRegister>
    );
}
