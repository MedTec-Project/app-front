import './ModalMedication.css';
import {AiOutlineClose} from "react-icons/ai";
import {TbCheck, TbTrashOff} from "react-icons/tb";

export default function ModalMedication({isOpen, handleClose, handleClean, labelSubmit, labelCancel, handleSubmit}) {
    return(
        <div className='mod-medice' style={{display: isOpen ? "block" : "none"}}>
            <div className='mod-tittle'>
                <div className='mod-cnt-tit'>
                    <h4 style={{letterSpacing: "2px", color: "rgb(102, 131, 102)", textAlign: "center"}}>Medicamento Agendado</h4>
                </div>
                <button className="close-btn" onClick={handleClose}>
                    <AiOutlineClose />
                </button>
            </div>
            <div className='sub-tit'>
                <h5 style={{letterSpacing: "1px", color: "rgb(102, 131, 102)", marginLeft: "35px"}}>Paracetamol (20mg/ml)</h5>
            </div>
            <div className='cnt-medice'>
                <div className='img-medice'>
                    <a>teste</a>
                </div>
                <div className='calendar'>

                </div>
            </div>
            <div className='cnt-buttons'>
                <div className='buttons'>
                    <button className='item-button'>Quantidade: 2</button>
                    <button className='item-button'>Responsável: Usuário teste</button>
                    <button className='item-button'>Data de Inicio: 21/12/2024</button>
                    <button className='item-button'>Data Final: 21/12/2024</button>
                    <button className='item-button'>Lembrete</button>
                </div>
            </div>
            <div className="modal-register-footer">
                <button className="cancel-btn" onClick={handleClean}>{labelCancel}<TbTrashOff style={{marginLeft: "1rem", fontSize: "1.7rem"}}/></button>
                <button className="register-btn" onClick={handleSubmit}>{labelSubmit}<TbCheck style={{marginLeft: "0.7rem", fontSize: "2rem"}}/></button>
            </div>
        </div>
    );
}