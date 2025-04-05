import "./Medicine.css";
import paracetamol from "../../../assets/images/paracetamol.png";
import heart from "../../../assets/icons/favorito.png";
import calendar from "../../../assets/icons/calendar-green.png";
import share from "../../../assets/icons/share.png";
import arrowRight from "../../../assets/icons/arrow-right.png";
import arrowLeft from "../../../assets/icons/arrow-left.png";

export default function Medicine() {
    const medication = {
        name: "Simeticona 75mg/mL - 15mL - Cimed Genérico",
        code: "20345",
        image: paracetamol,
        details: "SIMETICONA é indicado para pacientes com excesso de gases no aparelho digestivo.",
        usageType: "Uso oral",
        content: "75mg/mL",
        category: "Antibiótico",
        manufacturer: "Cimed",
        type: "Genérico",
        symptoms: ["Dor de cabeça", "Excesso de gases"],
        usage: {
            children: [
                "Lactentes: 3 a 5 gotas, 3 vezes ao dia.",
                "Até 12 anos: 5 a 10 gotas, 3 vezes ao dia.",
                "Acima de 12 anos",
            ],
            adults: ["13 gotas, 3 vezes ao dia."],
        },
    };

    const similarMedications = [
        {id: 1, name: "Paracetamol - 20mg", image: paracetamol},
        {id: 2, name: "Paracetamol - 20mg", image: paracetamol},
        {id: 3, name: "Paracetamol - 20mg", image: paracetamol},
    ];

    return (
        <div className="medicine-container">
            <div className="medicine-header">
                <div className="medicine-image-section">
                    <div className="medicine-arrow-container">
                        <button className="arrow-btn"><img src={arrowLeft} alt="Voltar"/></button>
                    </div>
                    <div className="medicine-image">
                        <img src={medication.image} alt={medication.name}/>
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
                    <button className="schedule-btn">Agendar Medicamento <img src={calendar} alt="Agendar"/></button>
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
                        <h4>Crianças:</h4>
                        <ul>
                            {medication.usage.children.map((child, index) => (
                                <li key={index}>{child}</li>
                            ))}
                        </ul>

                        <h4>Adultos:</h4>
                        <ul>
                            {medication.usage.adults.map((adult, index) => (
                                <li key={index}>{adult}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
