import React, { useState } from "react";
import CardAgenda from "../../components/CardAgenda/cardAgenda";
import ModalMedication from "../../components/ModalMedication/ModalMedication";
import "./styles.css";

export default function Agendamento() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
        setIsOpen(true);
  };
  const handleClose = () => {
        setIsOpen(false);
  };

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

  return (
    <div className="agendamento-container">
      <ModalMedication isOpen={isOpen} handleClose={handleClose}/>
      <div className="pos-shadow" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <div className="nav-top">
          <h2 style={{ color: "#48735F", fontWeight: "100" }}>Agenda de Medicamentos</h2>
          <div style={{ marginLeft: "auto" }}>
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
            toggle={() => toggleCardStatus(card.id)}/>
        ))}
      </div>
    </div>
  );
}
