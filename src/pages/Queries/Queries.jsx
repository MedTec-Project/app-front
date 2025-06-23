import '../Queries/Queries.css';
import CardConsulta from "../../components/CardConsulta/cardConsulta.jsx";
import ModalRegisterAppointment from "./Register/ModalRegisterAppointment.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {saveSchedule} from "../../api/schedule.jsx";
import {
    getAllAppointments,
    getTodayAppointments,
    markAppointmentDone,
    saveAppointment
} from "../../api/appointment.jsx";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal.jsx";

export default function Queries() {
    const [isOpenAppointmentModal, setIsOpenAppointmentModal] = useState(false);
    const [animatingId, setAnimatingId] = useState(null);
    const [appointments, setAppointments] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
    const [confirmationModalOid, setConfirmationModalOid] = useState(null);

    const handleOpenModalAppointment = () => setIsOpenAppointmentModal(true);
    const handleCloseAppointment = () => setIsOpenAppointmentModal(false);

    const handleCloseConfirmationModal = () => {
        setConfirmationModalOid(null);
        setIsOpenConfirmationModal(false);
    };

    const handleModalConfirmation = (oid) => {
        setConfirmationModalOid(oid);
        setIsOpenConfirmationModal(true);
    };

    const handleSaveAppointment = (schedule) => {
        saveAppointment(schedule).then((data) => {
            if (data) {
                toast.success("Agendamento cadastrado com sucesso!");
                handleCloseAppointment();
                fetchAppointments();
            }
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                const mensagem = Array.isArray(error.response.data.mensagem)
                    ? error.response.data.mensagem.join(", ")
                    : error.response.data.mensagem;
                toast.error(mensagem);
            }
        });
    };

    const handleClean = () => {
        console.log("limpar");
    };

    const handleMarkAppointmentDone = (oid, done) => {
        markAppointmentDone(oid, done).then((data) => {
            if (data) {
                toast.success("Agendamento atualizado com sucesso!");
                fetchAppointments();
            }
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                const mensagem = Array.isArray(error.response.data.mensagem)
                    ? error.response.data.mensagem.join(", ")
                    : error.response.data.mensagem;
                toast.error(mensagem);
            }
        });
    };

    const toggleCardStatus = (e, oid) => {
        e.stopPropagation();
        setAnimatingId(oid);

        setAppointments((prevCards) => prevCards.map((card) => (card.oid === oid ? {
            ...card,
            taken: !card.taken
        } : card)));

        var card = appointments.find(card => card.oid === oid);

        setSelectedCard(card);

        const dateStr = card.scheduleDate;
        if (!dateStr) return;
        const [datePart, timePart] = dateStr.split(" ");
        const [day, month, year] = datePart.split("/").map(Number);
        const [hours, minutes, seconds] = timePart.split(":").map(Number);
        const date = new Date(year, month - 1, day, hours, minutes, seconds);
        const now = new Date();

        const minDiff = Math.abs((now - date) / 1000 / 60);

        if (minDiff > 20 && card.done !== true) {
            handleModalConfirmation(oid);
        } else {
            handleMarkAppointmentDone(oid, card.taken);
        }
    };

    const fetchAppointments = async () => {
        const appointments = activeTab === 0 ? await getTodayAppointments() : await getAllAppointments();
        setAppointments(appointments);
    }

    useEffect(() => {
        fetchAppointments().then(r =>
            console.log(r));
    }, [activeTab]);

    return (
        <div className="agendamento-container">
            <ConfirmationModal
                isOpen={isOpenConfirmationModal}
                onClose={handleCloseConfirmationModal}
                onConfirm={() => handleMarkAppointmentDone(confirmationModalOid, true)}
            >
                Tem certeza que deseja confirmar uma consulta com mais de 20 minutos de antecedência?
            </ConfirmationModal>
            <ModalRegisterAppointment
                isOpen={isOpenAppointmentModal}
                handleClose={handleCloseAppointment}
                handleSubmit={handleSaveAppointment}
                handleClean={handleClean}
            />
            <div className="pos-shadow" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div className="nav-top">
                    <h2 style={{color: "#48735F", fontWeight: "100"}}>Agenda de Consultas</h2>
                    <div style={{marginLeft: "auto"}}>
                        <button className="but-scheduler" onClick={handleOpenModalAppointment}>+ Criar Agendamento
                        </button>
                    </div>
                </div>
                <div className="navegacao">
                    <div className="nav-itens">
                        <button className={`botao-navegacao ${activeTab === 0 ? "botao-navegacao-active" : ""}`} onClick={() => setActiveTab(0)}>Hoje</button>
                        <button className={`botao-navegacao ${activeTab === 1 ? "botao-navegacao-active" : ""}`} onClick={() => setActiveTab(1)}>Todos</button>
                    </div>
                </div>
            </div>
            <div className="cards">
                {appointments && appointments.map((card) => (
                    <CardConsulta
                        key={card.oid}
                        id={card.oid}
                        card={card}
                        isOn={card.isOn}
                        toggle={(e) => toggleCardStatus(e, card.oid)}
                        isAnimating={animatingId === card.id}
                    />
                ))}
            </div>
        </div>
    );
}
