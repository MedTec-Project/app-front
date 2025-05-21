import "./ModalRegisterScheduling.css";
import {useState} from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import MedicineInput from "../../Medications/Input/MedicineInput.jsx";
import CustomDatepicker from "../../../components/CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../../components/CustomTimepicker/CustomTimepicker.jsx";
import CustomNumberInput from "../../../components/CustomNumberInput/CustomNumberInput.jsx";
import IncrementSvg from "../../../assets/icons/increment-arrow.svg";
import DecrementSvg from "../../../assets/icons/decrement-arrow.svg";

export default function ModalRegisterScheduling({isOpen, handleClose, handleSubmit, handleClean}) {
    const [oidMedicine, setOidMedicine] = useState(null);
    const [oidDoctor, setOidDoctor] = useState(null);
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
        const schedule = transformFormToObject();
        handleSubmit(schedule);
    };

    const transformFormToObject = () => {
        return {
            oidMedicine,
            reminder,
            oidDoctor,
            initialDate,
            finalDate,
            quantity,
            interval
        };
    };

    return (
        <ModalRegister title={"Agendar Medicamento"} isOpen={isOpen} handleClose={handleClose}
                       handleSubmit={handleFormSubmit} handleClean={handleClean} width={"70rem"} labelSubmit={"Agendar"}
                       labelCancel={"Limpar"} height={"40rem"}>
            <div className="modal-register-schedule">
                <div className="left-side">
                    <div className="form-group">
                        <MedicineInput width={"30rem"} name="medicine" label="Medicamento:" required={true} value={oidMedicine} />

                    </div>
                    <div className="form-group">
                        <TextInput label="Lembrete:" value={reminder} onChange={(e) => setReminder(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="doctor">Médico Responsável:</label>
                        <Select options={doctorOptions} placeholder={"Selecione um médico..."}
                                onSelect={(e) => setOidDoctor(e.oid)}/>
                    </div>
                </div>
                <div className="right-side">
                    <div className="section section-date">
                        <div className="form-group">
                            <label htmlFor="doctor">Data de Início:</label>
                            <CustomDatepicker value={initialDate} onChange={(e) => setInitialDate(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="doctor">Data de Término:</label>
                            <CustomDatepicker showMonthYearDropdown={true} showYearDropdown={true} selected={finalDate}
                                              onChange={(e) => setFinalDate(e)}/>
                        </div>
                    </div>
                    <div className="section section-time">
                        <div className="form-group">
                            <label htmlFor="horaInicio">Hora de Início:</label>
                            <CustomTimepicker value={initialDate} onChange={(e) => setInitialDate(e)}/>
                        </div>
                        <div className="form-group">
                            <CustomNumberInput
                                value={interval}
                                onChange={(e) => changeInterval(e)}
                                min={0}
                                max={100}
                                step={1}
                                label="Intervalo:"
                                required={true}
                                incrementSvg={IncrementSvg}
                                decrementSvg={DecrementSvg}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="proxHora">Proximo horário:</label>
                            <CustomTimepicker value={nextHour} disabled={true}/>
                        </div>
                    </div>
                    <div className="form-group quantity-input">
                        <CustomNumberInput
                            value={quantity}
                            onChange={(e) => setQuantity(e)}
                            min={0}
                            max={100}
                            step={0}
                            label="Quantidade:"
                            required={true}
                            incrementSvg={IncrementSvg}
                            decrementSvg={DecrementSvg}
                        />
                    </div>
                </div>
            </div>
        </ModalRegister>
    );
}
