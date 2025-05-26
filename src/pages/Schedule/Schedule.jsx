import { IoIosSearch } from "react-icons/io";
import CardAgenda from "../../components/CardAgenda/cardAgenda.jsx";
import BottonDiary from "../../components/BottonDiary/bottonDiary.jsx";
import "./Schedule.css";
import ModalRegisterScheduling from "./Register/ModalRegisterScheduling.jsx";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { getGeneralSchedule, getTodaySchedule, saveSchedule, markScheduleTaken } from "../../api/schedule.jsx";

export default function Schedule() {

    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);
    const [tab, setTab] = useState(1);
    const [cards, setCards] = useState([]);
    const [animatingId, setAnimatingId] = useState(null);
    const debounceTimers = useRef({});

    const toggleCardStatus = (e, oid) => {
        e.stopPropagation();
        setAnimatingId(oid);

        setCards((prevCards) =>
            prevCards.map((card) =>
                card.oid === oid ? { ...card, dateTaken: !card.dateTaken } : card
            )
        );

        if (debounceTimers.current[oid]) {
            clearTimeout(debounceTimers.current[oid]);
        }

        debounceTimers.current[oid] = setTimeout(() => {
            const card = cards.find((c) => c.oid === oid);
            if (card) {
                markScheduleTaken(oid, !card.dateTaken)
                    .then(() => {
                        toast.success("Status salvo com sucesso");
                    })
                    .catch(() => {
                        toast.error("Erro ao salvar o status");
                    });
            }
        }, 3000);
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

    const transformCards = (data) => {
        return data.map((schedule) => ({
            id: schedule.oid,
            isOn: false,
        }));
    };

    useEffect(() => {
        const fetchSchedules = tab === 1 ? getTodaySchedule : getGeneralSchedule;

        fetchSchedules().then((data) => {
            setCards(data.map((schedule) => ({
                oid: schedule.oid,
                dateTaken: schedule.dateTaken,
                scheduleStatus: schedule.status,
                scheduleDate: schedule.scheduleDate,
                name: schedule.medicineName,
                imageBase64: schedule.imageBase64,
                dosage: schedule.dosage,
                dosageType: schedule.dosageType,
                pharmaceuticalForm: schedule.pharmaceuticalForm,
                content: schedule.content,
                medicineCategory: schedule.medicineCategory,
            })));
        });
    }, [tab]);

    const handleClean = () => {
        console.log("limpar");
    };

    return (
        <div className="agendamento-container">
            <ModalRegisterScheduling isOpen={isOpenSchedulingModal} handleClose={handleCloseScheduling}
                                     handleSubmit={handleSaveScheduling}
                                     handleClean={handleClean}/>
            <div className="pos-shadow" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div className="nav-top">
                    <h2 style={{color: "#48735F", fontWeight: "100"}}>Agenda de Medicamentos</h2>
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
                        isOn={card.dateTaken}
                        toggle={(e) => toggleCardStatus(e, card.oid)}/>
                ))}
            </div>
        </div>
    );
}