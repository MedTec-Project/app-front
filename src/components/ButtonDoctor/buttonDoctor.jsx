import "./buttonDoctor.css";
import image from "../../assets/images/doctor.png";

export default function ButtonDoctor({doctor, onClick}) {
    return doctor ? (
        <div className="but-doctor" onClick={onClick}>
            <div className="but-pos-img">
                <img src={image} className="perfil-usuar" alt="Foto do médico"/>
            </div>
            <div className="pos-txt">
                <h3>{doctor.name}</h3>
                <p style={{marginTop: "5px", fontSize: "12px"}}>Especialidade: {doctor.specialty}</p>
                <p style={{marginTop: "5px", fontSize: "12px"}}>CRM: {doctor.crm}</p>
            </div>
        </div>
    ) : null;
}