import "./Medicine.css";
import paracetamol from "../../../assets/images/paracetamol.png";
import heart from "../../../assets/icons/favorito.png";
import calendar from "../../../assets/icons/calendar-green.png";
import share from "../../../assets/icons/share.png";
import arrowRight from "../../../assets/icons/arrow-right.png";
import arrowLeft from "../../../assets/icons/arrow-left.png";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMedication} from "../../../api/medication.jsx";
import {toast} from "react-toastify";
import ModalRegisterScheduling from "../../Schedule/Register/ModalRegisterScheduling.jsx";

export default function Medicine() {
    const { oid} = useParams()
    const [medication, setMedication] = useState(null);
    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);
    const similarMedications = [
        {id: 1, name: "Paracetamol - 20mg", image: paracetamol},
        {id: 2, name: "Paracetamol - 20mg", image: paracetamol},
        {id: 3, name: "Paracetamol - 20mg", image: paracetamol},
    ];

    useEffect(() => {
        getMedication(oid).then((data) => {
            if (data) {
                setMedication(data);
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
    }, [oid]);

    const handleOpenModalScheduling = () => {
        setIsOpenSchedulingModal(true);
    };

    const handleCloseScheduling = () => {
        setIsOpenSchedulingModal(false);
    };

    const handleSaveScheduling = (medicamento) => {
        return;
    }

    const handleClean = () => {
        console.log("limpar")
    }

    return medication ? (
        <div className="medicine-container">
            <ModalRegisterScheduling isOpen={isOpenSchedulingModal} handleClose={handleCloseScheduling} handleSubmit={handleSaveScheduling}
                                     handleClean={handleClean} />
            <div className="medicine-header">
                <div className="medicine-image-section">
                    <div className="medicine-arrow-container">
                        <button className="arrow-btn"><img src={arrowLeft} alt="Voltar"/></button>
                    </div>
                    <div className="medicine-image">
                        <img src={`data:image/jpeg;base64,${medication.imageBase64}`} alt={medication.name}/>
                    </div>
                    <div className="medicine-arrow-container">
                        <button className="arrow-btn"><img src={arrowRight} alt="Avançar"/></button>
                    </div>
                    <div className="medicine-btn-container">
                        <button className="favorite-btn"><img src={heart} alt="Favorito"/></button>
                        <button className="share-btn"><img src={share} alt="Compartilhar"/></button>
                    </div>
                </div>
                <div className="medicine-info">
                    <div className="medicine-information">
                        <h1>{medication.name}</h1>
                        <p className="medicine-code">Código: {medication.code}</p>
                    </div>
                    <button className="schedule-btn" onClick={handleOpenModalScheduling}>Agendar Medicamento <img src={calendar} alt="Agendar"/></button>
                    <div className="similar-medicines">
                        <div className="similar-list-container">
                            <div className="similar-list-title">
                                <h3>Medicamentos semelhantes...</h3>
                            </div>
                            <div className="similar-list-carrousel">
                                <div className="similar-list-arrow">
                                    <button className="arrow-btn"><img src={arrowLeft} alt="Avançar"/></button>
                                </div>
                                <div className="similar-list">
                                    {similarMedications.map((med) => (
                                        <div key={med.id} className="similar-item">
                                            <img src={med.image} alt={med.name}/>
                                            <p>{med.name}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="similar-list-arrow">
                                    <button className="arrow-btn"><img src={arrowRight} alt="Avançar"/></button>
                                </div>
                            </div>
                            <div className="similar-list-carrousel-pagination">
                                <span className="page-dot active"></span>
                                <span className="page-dot"></span>
                                <span className="page-dot"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="medicine-details">
                <h2>Detalhes do Medicamento</h2>
                <div className="medicine-details-container">
                    <div className="medicine-details-content">
                        <h3>{medication.name}</h3>
                        <p>
                            {medication.details}
                        </p>
                        <ul>
                            <li>Conteúdo: {medication.content}</li>
                            <li>Categoria: {medication.category}</li>
                            <li>Fabricante: {medication.manufacturer}</li>
                            <li>Tipo: {medication.type}</li>
                            <li>Uso: {medication.usageType}</li>
                        </ul>

                        <h4>Serve para os Sintomas:</h4>
                        <ul>
                            {medication.symptoms.map((symptom, index) => (
                                <li key={index}>{symptom}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="medicine-details-content">
                        <h3>Modo de uso:</h3>
                        {/*<h4>Crianças:</h4>*/}
                        {/*<ul>*/}
                        {/*    {medication.usage.children.map((child, index) => (*/}
                        {/*        <li key={index}>{child}</li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}

                        {/*<h4>Adultos:</h4>*/}
                        {/*<ul>*/}
                        {/*    {medication.usage.adults.map((adult, index) => (*/}
                        {/*        <li key={index}>{adult}</li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
