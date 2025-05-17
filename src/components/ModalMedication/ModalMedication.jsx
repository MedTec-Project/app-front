import './ModalMedication.css';
import {AiOutlineClose} from "react-icons/ai";

export default function ModalMedication({isOpen, handleClose}) {
    return(
        <div className='mod-medication' style={{display: isOpen ? "block" : "none"}}>
            <div className='mod-tittle'>
                <div className='mod-cnt-tit'>
                    <h4 style={{letterSpacing: "2px", color: "rgb(102, 131, 102)", textAlign: "center"}}>Medicamento Agendado</h4>
                </div>
                <button className="close-btn" onClick={handleClose}>
                    <AiOutlineClose />
                </button>
            </div>
        </div>
    );
}