import {IoIosSearch} from "react-icons/io";
import CardAgenda from "../../components/CardAgenda/cardAgenda.jsx";
import BottonDiary from "../../components/BottonDiary/bottonDiary.jsx";
import "./Schedule.css";
import ModalRegisterScheduling from "./Register/ModalRegisterScheduling.jsx";
import {useEffect, useState, useRef} from "react";
import {toast} from "react-toastify";
import {
    getGeneralSchedule,
    getTodaySchedule,
    saveSchedule,
    markScheduleTaken,
    getScheduleById, deleteSchedule
} from "../../api/schedule.jsx";
import ModalMedication from "../../components/ModalMedication/ModalMedication.jsx";

export default function Schedule() {

    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);
    const [tab, setTab] = useState(1);
    const [cards, setCards] = useState([]);
    const [animatingId, setAnimatingId] = useState(null);
    const debounceTimers = useRef({});
    const [isOpenMedicationModal, setIsOpenMedicationModal] = useState(false);
    const [scheduleShow, setScheduleShow] = useState({});

    const toggleCardStatus = (e, oid) => {
        e.stopPropagation();
        setAnimatingId(oid);

        setCards((prevCards) => prevCards.map((card) => (card.oid === oid ? {...card, taken: !card.taken} : card)));

        var card = cards.find(card => card.oid === oid);

        if (card.taken === true) {
            markScheduleTaken(card.oid, false).then((data) => {
                if (data) {
                    fetchSchedules();
                }
            });
        } else {
            markScheduleTaken(card.oid, true).then((data) => {
                if (data) {
                    fetchSchedules();
                }
            });
        }
    };

    const handleOpenModalScheduling = () => {
        setIsOpenSchedulingModal(true);
    };

    const handleCloseScheduling = () => {
        setIsOpenSchedulingModal(false);
    };

    const handleSaveScheduling = (schedule) => {
        saveSchedule(schedule).then((data) => {
            if (data) {
                toast.success("Agendamento cadastrado com sucesso!");
                handleCloseScheduling();
            }
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                if (error.response.data.mensagem instanceof Array) {
                    var mensagem = error.response.data.mensagem.join(", ");
                    toast.error(mensagem);
                } else {
                    toast.error(error.response.data.mensagem);
                }
            }
        });
    };

    const fetchSchedules = async () => {
        const schedules = tab === 1 ? await getTodaySchedule() : await getGeneralSchedule();
        setCards(schedules.map((schedule) => ({
            oid: schedule.oid,
            dateTaken: schedule.dateTaken,
            taken: schedule.taken,
            scheduleStatus: schedule.status,
            scheduleDate: schedule.scheduleDate,
            name: schedule.medicineName,
            imageBase64: schedule.imageBase64,
            dosage: schedule.dosage,
            dosageType: schedule.dosageType,
            pharmaceuticalForm: schedule.pharmaceuticalForm,
            content: schedule.content,
            medicineCategory: schedule.medicineCategory,
            oidSchedule: schedule.oidSchedule
        })));
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchSchedules();
        };

        fetchData();
    }, [tab]);

    const handleDelete = () => {
        if (scheduleShow === null) return;
        deleteSchedule(scheduleShow.oid).then((data) => {
            if (data) {
                toast.success("Agendamento excluído com sucesso!");
                handleCloseMedicationModal();
            }
        }).catch(() => {
            toast.error("Erro ao excluir o agendamento");
        });
    };

    const handleCloseMedicationModal = () => {
        setIsOpenMedicationModal(false);
    };

    const handleOpenMedicationModal = (oidSchedule) => {
        getScheduleById(oidSchedule).then((data) => {
            setScheduleShow(data);
            setIsOpenMedicationModal(true);
        }).catch((error) => {
            toast.error("Erro ao carregar o agendamento");
        });
    };

    const handleClean = () => {
        setScheduleShow(null);
    };

    return (
        <div className="agendamento-container">
            <ModalMedication isOpen={isOpenMedicationModal} labelCancel={"Excluir"} labelSubmit={"Editar"}
                             handleClose={handleCloseMedicationModal} schedule={scheduleShow}
                             handleClean={handleDelete}/>
            <ModalRegisterScheduling isOpen={isOpenSchedulingModal} handleClose={handleCloseScheduling}
                                     handleSubmit={handleSaveScheduling}
                                     handleClean={handleClean}/>
            <div className="pos-shadow" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div className="nav-top">
                    <h2 style={{color: "#48735F", fontWeight: "100"}}>Agendamento de Medicamentos</h2>
                    <div style={{marginLeft: "auto"}}>
                        <button className="but-scheduler" onClick={handleOpenModalScheduling}>+ Criar Agendamento
                        </button>
                    </div>
                </div>
                <div className="navegacao">
                    <div className="nav-itens">
                        <button className={`botao-navegacao ${tab === 1 ? "botao-navegacao-active" : ""}`}
                                onClick={() => setTab(1)}>Hoje
                        </button>
                        <button className={`botao-navegacao ${tab === 2 ? "botao-navegacao-active" : ""}`}
                                onClick={() => setTab(2)}>Geral
                        </button>
                    </div>
                </div>
            </div>
            <div className="cards">
                {cards.map((card) => (
                    <CardAgenda
                        key={card.oid}
                        id={card.oid}
                        schedule={card}
                        onClick={() => handleOpenMedicationModal(card.oidSchedule)}
                        toggle={(e) => toggleCardStatus(e, card.oid)}/>
                ))}
            </div>
        </div>
    );
}
