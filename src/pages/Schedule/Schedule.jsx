import { IoIosSearch } from "react-icons/io";
import CardAgenda from "../../components/CardAgenda/cardAgenda.jsx";
import BottonDiary from "../../components/BottonDiary/bottonDiary.jsx";
import "./Schedule.css"
import ModalRegisterScheduling from "./Register/ModalRegisterScheduling.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveSchedule } from "../../api/schedule.jsx";

export default function Schedule() {

    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);

    const [cards, setCards] = useState([
        { id: 1, isOn: false },
        { id: 2, isOn: false },
        { id: 3, isOn: false },
        { id: 4, isOn: false },
    ]);

    const [animatingId, setAnimatingId] = useState(null);

    const toggleCardStatus = (id) => {
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
    }

    const handleClean = () => {
        console.log("limpar")
    }

    return (
        <div className="agendamento-container">
            <ModalRegisterScheduling isOpen={isOpenSchedulingModal} handleClose={handleCloseScheduling} handleSubmit={handleSaveScheduling}
                handleClean={handleClean} />
            <div className="pos-shadow" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <div className="nav-top">
                    <h2 style={{ color: "#48735F", fontWeight: "100" }}>Agenda de Medicamentos</h2>
                    <div style={{ marginLeft: "auto" }} onClick={handleOpenModalScheduling}>
                        <button className="but-scheduler">+ Criar Agendamento</button>
                    </div>
                </div>
                <div className="navegacao">
                    <div className="nav-itens">
                        <button className="botao-navegacao">Hoje</button>
                        <button className="botao-navegacao">Geral</button>
                    </div>
                </div>
            </div>
            <div className="cards" onClick={handleOpenModal}>
                {cards.map((card) => (
                    <CardAgenda
                        key={card.id}
                        id={card.id}
                        isOn={card.isOn}
                        toggle={() => toggleCardStatus(card.id)} />
                ))}
            </div>
        </div>
    )
}
