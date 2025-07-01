import "./buttonDoctor.css";
import image from "../../assets/images/doctor.png";

export default function ButtonDoctor() {
    return(
        <div className="but-doctor">
            <div className="but-pos-img">
                <img src={image} className="perfil-usuar" alt="Foto do médico" />
            </div>
            <div className="pos-txt">
                <h3>Mohamed Lee</h3>
                <p style={{marginTop: "5px", fontSize: "12px"}}>Cardiologista</p>
            </div>
        </div>
    )
}