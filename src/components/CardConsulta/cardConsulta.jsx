import '../CardConsulta/cardConsulta.css';
import image from '../../assets/images/doctor.png';
import { FaCheck } from "react-icons/fa6";

export default function CardConsulta({ id, card, isOn, toggle, isAnimating, onClick }) {
    return (
        <div className={`card-main ${isOn ? "inactive-card" : ""} ${isAnimating ? "card-animating" : ""}`} onClick={onClick} style={{ margin: "10px" }}>
            <div style={{ padding: "15px" }}>
                <div className='pos-foto'>
                    <div className='foto-doctor'>
                        <img src={image} className="foto-perfil" alt="Foto do médico" />
                    </div>
                </div>
                <div className='tittle'>
                    <label>Médico: {card.nameDoctor}</label>
                </div>
                <div className='pos-information'>
                    <h4 style={{ textAlign: "center", paddingBottom: "10px", fontWeight: "100" }}>INFORMAÇÕES</h4>
                    <label>Horário: {card.scheduleDate ? card.scheduleDate.slice(11, 16) : ""}</label><br />
                    <label>Data: {card.scheduleDate ? card.scheduleDate.slice(0, 10) : ""}</label><br />
                    <label>{card.reminder ? "Lembrete: " + card.reminder : ""}</label><br />
                </div>
            </div>
            <div className='div-but'>
                <button className='but-acept' onClick={toggle} disabled={isOn}>
                    <FaCheck style={{ width: "35px", height: "35px", color: isOn ? "#ccc" : "white" }} />
                </button>
            </div>
        </div>
    );
}
