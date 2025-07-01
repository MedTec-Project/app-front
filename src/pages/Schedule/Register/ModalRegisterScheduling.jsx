import "./ModalRegisterScheduling.css";
import { useEffect, useState } from "react";
import ModalRegister from "../../../components/ModalRegister/ModalRegister.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import Select from "../../../components/Select/Select.jsx";
import MedicineInput from "../../Medications/Input/MedicineInput.jsx";
import CustomDatepicker from "../../../components/CustomDatePicker/CustomDatePicker.jsx";
import CustomTimepicker from "../../../components/CustomTimepicker/CustomTimepicker.jsx";
import CustomNumberInput from "../../../components/CustomNumberInput/CustomNumberInput.jsx";
import IncrementSvg from "../../../assets/icons/increment-arrow.svg";
import DecrementSvg from "../../../assets/icons/decrement-arrow.svg";
import {getDoctors} from "../../../api/doctor.jsx";

export default function ModalRegisterScheduling({ isOpen, handleClose, handleSubmit, handleClean, schedule, medicine }) {

    const getInitialDate = () => {
        const now = new Date();
        now.setMonth(now.getMonth() + 1);
        return now;
    };

    const initialState = {
        oid: null,
        oidMedicine: null,
        oidDoctor: null,
        initialDate: new Date(),
        finalDate: getInitialDate(),
        quantity: 1,
        interval: 1,
        reminder: '',
        receipt: '',
        nextHour: null,
    };

    const [formData, setFormData] = useState(initialState);
    const [doctorOptions, setDoctorOptions] = useState([]);



    const handleChange = (field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            if (field === 'interval') {
                const next = new Date(updated.initialDate);
                next.setHours(next.getHours() + parseInt(value));
                updated.nextHour = next;
            }

            if (field === 'initialDate' && updated.interval) {
                const next = new Date(value);
                next.setHours(next.getHours() + parseInt(updated.interval));
                updated.nextHour = next;
            }

            return updated;
        });
    };

    const handleFormSubmit = () => {
        const scheduleData = { ...formData };
        handleSubmit(scheduleData);
    };

    const clearForm = () => {
        setFormData(initialState);
    };

    const fetchDoctors = async () => {
        const data = await getDoctors();
        const options = data.map((doctor) => ({oid: doctor.oid, label: doctor.name}));
        setDoctorOptions(options);
    };

    useEffect(() => {
        if (isOpen) {
            fetchDoctors();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && !schedule) {
            setFormData(initialState);
            return;
        }

        if (isOpen && schedule) {
            const parseDate = (input) =>
                typeof input === 'string' && input.includes('/')
                    ? parsePtBRDateString(input)
                    : new Date(input);

            const newInitial = parseDate(schedule.initialDate);
            const newFinal = parseDate(schedule.finalDate);
            const newNext = new Date(newInitial);
            newNext.setHours(newNext.getHours() + schedule.interval);

            setFormData({
                ...schedule,
                initialDate: newInitial,
                finalDate: newFinal,
                nextHour: newNext,
            });
        }
    }, [isOpen, schedule]);

    const parsePtBRDateString = (str) => {
        const [day, month, year] = str.split('/');
        return new Date(Number(year), Number(month) - 1, Number(day));
    };

    return (
        <ModalRegister
            title={"Agendar Medicamento"}
            isOpen={isOpen}
            handleClose={handleClose}
            handleSubmit={handleFormSubmit}
            handleClean={() => {
                clearForm();
                handleClean();
            }}
            width={"60rem"}
            labelSubmit={"Agendar"}
            labelCancel={"Limpar"}
            height={"35rem"}
        >
            <div className="modal-register-schedule">
                <div className="left-side">
                    <div className="form-group">
                        <MedicineInput
                            width={"30rem"}
                            name="medicine"
                            label="Medicamento:"
                            required={true}
                            value={formData.oidMedicine}
                            setValue={(val) => handleChange('oidMedicine', val)}
                        />
                    </div>
                    <div className="form-group">
                        <TextInput
                            label="Lembrete:"
                            value={formData.reminder}
                            onChange={(e) => handleChange('reminder', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Médico Responsável:</label>
                        <Select
                            options={doctorOptions}
                            placeholder={"Selecione um médico..."}
                            onSelect={(e) => handleChange('oidDoctor', e.oid)}
                        />
                    </div>
                </div>

                <div className="right-side">
                    <div className="section section-date">
                        <div className="form-group">
                            <label>Data de Início:</label>
                            <CustomDatepicker
                                value={formData.initialDate}
                                onChange={(e) => handleChange('initialDate', e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Data de Término:</label>
                            <CustomDatepicker
                                value={formData.finalDate}
                                onChange={(e) => handleChange('finalDate', e)}
                            />
                        </div>
                    </div>
                    <div className="section section-time">
                        <div className="form-group">
                            <label>Hora de Início:</label>
                            <CustomTimepicker
                                value={formData.initialDate}
                                onChange={(e) => handleChange('initialDate', e)}
                            />
                        </div>
                        <div className="form-group">
                            <CustomNumberInput
                                value={formData.interval}
                                onChange={(e) => handleChange('interval', e)}
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
                            <label>Próximo horário:</label>
                            <CustomTimepicker
                                value={formData.nextHour}
                                disabled={true}
                                onChange={(e) => handleChange('nextHour', e)}
                            />
                        </div>
                    </div>

                    <div className="form-group quantity-input">
                        <CustomNumberInput
                            value={formData.quantity}
                            onChange={(e) => handleChange('quantity', e)}
                            min={0}
                            max={100}
                            step={1}
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
