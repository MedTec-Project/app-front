import "./MedicationCard.css";
import heart from "../../assets/icons/favorito.png";
import calendar from "../../assets/icons/calendar.png";

export default function MedicationCard({med, selected, setSelected}) {
    return (
        <div
            key={med.id}
            className={`medication-card ${selected === med.id ? "selected" : ""}`}
            onClick={() => setSelected(med.id)}
        >
            <div className="medication-image-container">
                <div className="medication-image">
                    <img src={med.image} alt={med.name}/>
                </div>
                <div className="medication-favorite">
                    <img src={heart} alt="Favorito"/>
                </div>
            </div>
            <div className="medication-infos">
                <div className="medication-type-tag">
                    <span className={`tag ${med.type.toLowerCase()}`}>{med.type}</span>
                </div>
                <div className="medication-info">
                    <h3>{med.name}</h3>
                    <p>{med.pills} Comprimidos</p>
                </div>
                <div className="medication-button">
                    <button>Agendar <img src={calendar} alt="Agendar"/></button>
                </div>
            </div>
        </div>
    );
}
