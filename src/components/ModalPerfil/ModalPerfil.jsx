import './ModalPerfil.css';
import {AiOutlineClose} from "react-icons/ai";

export default function ModalPerfil({modalOpen, handleClose}) {
    return(
        <div className='mod-perfil' style={{display: modalOpen ? "block" : "none"}}>
            <div className='mod-tittle'>
                <button className="close-btn" onClick={handleClose}>
                    <AiOutlineClose />
                </button>
            </div>
            <div className='conteudo'>
                <div className='cnt-perfil'>
                    <div className='pos-info'>
                        <div className='pos-foto'>
                            <button className='foto-perfil'></button>
                        </div>
                        <div className='pos-dados'>
                            <h4>Mohamed Lee</h4>
                            <div className='pos-tit'>
                                <p>CPF: xxx.xxx.xxx-xx</p>
                                <p>Telefone: (47) 99783-9970</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='cnt-button'>
                    <button className='but-edit'>Editar Perfil</button>
                </div>
            </div>
        </div>
    );
}