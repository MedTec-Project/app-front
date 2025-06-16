import '../CardConsulta/cardConsulta.css';
import image from '../../assets/images/doctor.png';
import { FaCheck } from "react-icons/fa6";

export default function CardConsulta({ id, isOn, toggle, isAnimating }) {
    return (
        <div className={`card-main ${isOn ? "inactive-card" : ""} ${isAnimating ? "card-animating" : ""}`}>
            <div style={{ margin: "40px" }}>
                <div className='pos-foto'>
                    <div className='foto'>
                        <img src={image} className="foto-perfil" alt="Foto do médico" />
                    </div>
                </div>
                <div className='tittle'>
                    <label>Médico: Maicon Douglas</label>
                </div>
                <div className='pos-information'>
                    <h4 style={{ textAlign: "center", paddingBottom: "10px", fontWeight: "100" }}>INFORMAÇÕES</h4>
                    <label>Horário: 15:00h</label><br />
                    <label>Data: 12/12/2024</label>
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