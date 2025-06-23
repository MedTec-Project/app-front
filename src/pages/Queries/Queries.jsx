import '../Queries/Queries.css';
import CardConsulta from "../../components/CardConsulta/cardConsulta.jsx";
import ModalRegisterScheduling from "./Register/ModalRegisterScheduling.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveSchedule } from "../../api/schedule.jsx";

export default function Queries() {
    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);
    const [cards, setCards] = useState([
        { id: 1, isOn: false },
        { id: 2, isOn: false },
        { id: 3, isOn: false },
    ]);
    const [animatingId, setAnimatingId] = useState(null);

    const handleOpenModalScheduling = () => setIsOpenSchedulingModal(true);
    const handleCloseScheduling = () => setIsOpenSchedulingModal(false);

    const handleSaveScheduling = (schedule) => {
        saveSchedule(schedule).then((data) => {
            if (data) {
                toast.success("Agendamento cadastrado com sucesso!");
                handleCloseScheduling();
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

    const toggleCardStatus = (e, id) => {
        e.stopPropagation();
        setAnimatingId(id);

        setTimeout(() => {
            const updated = cards.map((card) =>
                card.id === id ? { ...card, isOn: !card.isOn } : card
            );

            updated.sort((a, b) => {
                if (a.isOn === b.isOn) return 0;
                return a.isOn ? 1 : -1;
            });

            setCards(updated);
            setAnimatingId(null);
        }, 200);
    };

    return (
        <div className="agendamento-container">
            <ModalRegisterScheduling 
                isOpen={isOpenSchedulingModal} 
                handleClose={handleCloseScheduling} 
                handleSubmit={handleSaveScheduling}
                handleClean={handleClean} 
            />
            <div className="pos-shadow" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <div className="nav-top">
                    <h2 style={{ color: "#48735F", fontWeight: "100" }}>Agenda de Consultas</h2>
                    <div style={{ marginLeft: "auto" }}>
                        <button className="but-scheduler" onClick={handleOpenModalScheduling}>+ Criar Agendamento</button>
                    </div>
                </div>
                <div className="navegacao">
                    <div className="nav-itens">
                        <button className="botao-navegacao">Hoje</button>
                        <button className="botao-navegacao">Geral</button>
                    </div>
                </div>
            </div>
            <div className="cards">
                {cards.map((card) => (
                    <CardConsulta 
                        key={card.id} 
                        id={card.id} 
                        isOn={card.isOn} 
                        toggle={(e) => toggleCardStatus(e, card.id)}
                        isAnimating={animatingId === card.id}
                    />
                ))}
            </div>
        </div>
    );
}