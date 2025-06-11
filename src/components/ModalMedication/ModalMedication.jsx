import './ModalMedication.css';
import {AiOutlineClose} from "react-icons/ai";
import {TbCheck, TbPencil, TbTrashOff} from "react-icons/tb";
import {useEffect, useMemo} from "react";

export default function ModalMedication({
                                            isOpen,
                                            handleClose,
                                            handleClean,
                                            labelSubmit,
                                            labelCancel,
                                            handleSubmit,
                                            schedule
                                        }) {

    return (
        <div className="modal-overlay" style={{display: isOpen ? "block" : "none"}} onClick={handleClose}>
            <div className='mod-medice' style={{display: isOpen ? "block" : "none"}}
                 onClick={(e) => e.stopPropagation()}>
                <div className='mod-tittle'>
                    <div className='mod-cnt-tit'>
                        <h4 style={{letterSpacing: "2px", color: "rgb(102, 131, 102)", textAlign: "center"}}>Medicamento
                            Agendado</h4>
                    </div>
                    <button className="close-btn" onClick={handleClose}>
                        <AiOutlineClose/>
                    </button>
                </div>
                <div className='sub-tit'>
                    <h5 style={{
                        letterSpacing: "1px",
                        color: "rgb(102, 131, 102)",
                        marginLeft: "35px"
                    }}>{schedule.nameMedicine} ({schedule.dosageMedicine}{schedule.dosageTypeMedicine})</h5>
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
                        <button className='item-button'>Quantidade: {schedule.quantity}</button>
                        <button className='item-button'>Médico Responsável: Usuário teste</button>
                        <button className='item-button'>Data de Inicio: {schedule.initialDate}</button>
                        <button className='item-button'>Data Final: {schedule.finalDate}</button>
                        <button className='item-button'>Lembrete: {schedule.reminder}</button>
                    </div>
                </div>
                <div className="modal-register-footer">
                    <button className="cancel-btn"
                            onClick={() => handleClean(schedule.oidSchedule)}>{labelCancel}</button>
                    <button className="edit-btn" onClick={() => handleSubmit(schedule.oid)}>{labelSubmit}</button>
                </div>
            </div>
        </div>
    );
}
