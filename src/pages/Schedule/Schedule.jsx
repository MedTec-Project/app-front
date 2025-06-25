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
    getScheduleById, deleteSchedule, updateSchedule
} from "../../api/schedule.jsx";
import ModalMedication from "../../components/ModalShow/ModalMedication.jsx";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal.jsx";
import ModalShowSchedule from "./Show/ModalShowSchedule.jsx";

export default function Schedule() {

    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);
    const [tab, setTab] = useState(1);
    const [cards, setCards] = useState([]);
    const [animatingId, setAnimatingId] = useState(null);
    const debounceTimers = useRef({});
    const [isOpenMedicationModal, setIsOpenMedicationModal] = useState(false);
    const [scheduleShow, setScheduleShow] = useState({});
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
    const [confirmationModalOid, setConfirmationModalOid] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const toggleCardStatus = (e, oid) => {
        e.stopPropagation();
        setAnimatingId(oid);

        setCards((prevCards) => prevCards.map((card) => (card.oid === oid ? {...card, taken: !card.taken} : card)));

        var card = cards.find(card => card.oid === oid);

        setSelectedCard(card);

        const date = new Date(card.scheduleDate.replace('[UTC]', ''));
        const now = new Date();

        const minDiff = Math.abs((now - date) / 1000 / 60);

        if (minDiff > 20 && card.taken !== true) {
            handleModalConfirmation(oid);
        } else {
            handleMarkScheduleTaken(oid, card.taken);
        }
    };

    const handleMarkScheduleTaken = (oid, taken) => {
        markScheduleTaken(oid, !taken).then(onSucessMarkScheduleTaken);
    }

    const onSucessMarkScheduleTaken = (data) => {
        setTimeout(() => {
        if (data) {
            fetchSchedules();
        }
        }, 1000);
    }

    const handleOpenModalScheduling = () => {
        setScheduleShow(null);
        setIsOpenSchedulingModal(true);
    };

    const handleCloseScheduling = () => {
        setIsOpenSchedulingModal(false);
    };

    const handleSaveScheduling = (schedule) => {
        if (schedule.oid) {
            updateSchedule(schedule.oid, schedule).then((data) => {
                if (data) {
                    toast.success("Agendamento atualizado com sucesso!");
                    handleCloseScheduling();
                    handleCloseMedicationModal();
                    fetchSchedules();
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
        } else {
            saveSchedule(schedule).then((data) => {
                if (data) {
                    toast.success("Agendamento cadastrado com sucesso!");
                    handleCloseScheduling()
                    handleCloseMedicationModal();
                    fetchSchedules();
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
        }
    };

    const handleModalConfirmation = (oid) => {
        setIsOpenConfirmationModal(true);
        setConfirmationModalOid(oid);
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

    const handleCleanScheduling = () => {
        setScheduleShow(null);
    };

    const handleConfirmSchedule = (oid, taken) => {
        handleMarkScheduleTaken(oid, taken);
        setIsOpenConfirmationModal(false);
    };

    const handleCloseConfirmationModal = () => {
        setIsOpenConfirmationModal(false);
        setCards((prevCards) => prevCards.map((card) => (card.oid === confirmationModalOid ? {...card, taken: false} : card)));
    };

    const handleEditSchedule = () => {
        setIsOpenSchedulingModal(true);
    }
    return (
        <div className="agendamento-container">
            <ConfirmationModal isOpen={isOpenConfirmationModal} onClose={() => handleCloseConfirmationModal()}
                               onConfirm={() => handleConfirmSchedule(confirmationModalOid, false)}>
                Tem certeza que deseja confirmar um agendamento com mais de 20 minutos de diferença?
            </ConfirmationModal>
            <ModalShowSchedule isOpen={isOpenMedicationModal}
                             handleClose={handleCloseMedicationModal} schedule={scheduleShow} allCards={cards}
                             handleClean={handleDelete} handleSubmit={handleEditSchedule}/>
            <ModalRegisterScheduling
                key={scheduleShow?.oid || 'new'}
                isOpen={isOpenSchedulingModal}
                handleClose={handleCloseScheduling}
                handleSubmit={handleSaveScheduling}
                handleClean={handleCleanScheduling}
                schedule={scheduleShow}
            />
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
