import "./buttonComorbidade.css";
import { FaDna } from "react-icons/fa";

export default function ButtonComorbidade() {
    return(
        <div className="button">
            <div className="but-pos">
                <div className="pos-image">
                    <div className="img-border">
                        <FaDna className="icon" />
                    </div>
                </div>
                <div className="pos-text">
                    <h6>Sindrome de Down</h6>
                    <p style={{marginTop: "4px", fontSize: "10px"}}>Tipo: Trissomia Livre</p>
                </div>
            </div>
        </div>
    );
}