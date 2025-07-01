import "./buttonComorbidade.css";
import { FaDna } from "react-icons/fa";

export default function ButtonComorbidade({ comorbidity, onClick }) {
    return comorbidity ? (
        <div className="button" style={{borderColor: comorbidity.color, cursor: "pointer"}} onClick={onClick}>
            <div className="but-pos" style={{borderColor: comorbidity.color}}>
                <div className="pos-image">
                    <div className="img-border" style={{borderColor: comorbidity.color}}>
                        <img className="icon" src={`data:image/svg+xml;base64,${comorbidity.image}`} alt="Comorbidade" color={comorbidity.color} />
                    </div>
                </div>
                <div className="pos-text" style={{color: comorbidity.color}}>
                    <h6>{comorbidity.name}</h6>
                    <p style={{marginTop: "4px", fontSize: "10px"}}>Tipo: {comorbidity.comorbidityTypeName}</p>
                </div>
            </div>
        </div>
    ) : null;
}