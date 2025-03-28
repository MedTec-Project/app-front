import "./MedicationCard.css";
import heart from "../../assets/icons/favorito.png";
import calendar from "../../assets/icons/calendar.png";
import {useNavigate} from "react-router-dom";

export default function MedicationCard({med, selected, setSelected, handleOpenModal}) {

    const navigate = useNavigate();

    const handleClickCard = () => {
        navigate(`/medicamentos/${med.id}`)
    }

     const handleClickFavorite = (e) => {
        e.stopPropagation();
        setSelected(med.id)
    }

    const handleClickAgenda = (e) => {
        e.stopPropagation();
        handleOpenModal();
    }
    return (
        <div
            key={med.oid}
            className={`medication-card ${selected === med.oid ? "selected" : ""}`}
            onClick={handleClickCard}
        >
            <div className="medication-image-container">
                <div className="medication-image">
                    <img src={`data:image/jpeg;base64,${med.imageBase64}`} alt={med.name} />
                </div>
                <div className="medication-favorite" onClick={handleClickFavorite}>
                    <img src={heart} alt="Favorito"/>
                </div>
            </div>
            <div className="medication-infos">
                <div className="medication-type-tag">
                    <span className="tag" style={{backgroundColor: med.medicineCategoryColor}}>{med.medicineCategoryName}</span>
                </div>
                <div className="medication-info">
                    <h3>{med.name} {med.dosage}{med.dosageTypeName}</h3>
                    <p> {med.content} {med.pharmaceuticalFormName}</p>
                </div>
                <div className="medication-button" onClick={handleClickAgenda}>
                    <button>Agendar <img src={calendar} alt="Agendar"/></button>
                </div>
            </div>
        </div>
    );
}
