import "./ModalEventos.css";
import {AiOutlineClose} from "react-icons/ai";
import {TbCheck, TbTrashOff} from "react-icons/tb";

export default function ModalEventos({ isOpen, handleClose, handleSubmit, handleClean, labelSubmit, labelCancel, children, width, height }) {

    return (
        <div className="modal-overlay" style={{display: isOpen ? "block" : "none"}}>
            <div className="modal-register" style={{ width: width ? width : "50rem", height: height ? height : "40rem" }}>
                <div className="modal-register-content">
                    <div className="modal-register-header">
                        <div className="modal-register-title">
                                <h2>Cadastrar Evento</h2>
                        </div>
                        <button className="close-btn" onClick={handleClose}>
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className="modal-register-form">
                        <form>
                            {children}
                        </form>
                    </div>
                    <div className="modal-register-footer">
                        <button className="cancel-btn" onClick={handleClean}>{labelCancel}<TbTrashOff style={{marginLeft: "1rem", fontSize: "1.7rem"}}/></button>
                        <button className="register-btn" onClick={handleSubmit}>{labelSubmit}<TbCheck style={{marginLeft: "0.7rem", fontSize: "2rem"}}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}