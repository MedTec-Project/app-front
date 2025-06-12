import './ModalPerfil.css';
import {AiOutlineClose} from "react-icons/ai";
import ButtonComorbidade from '../ButtonComorbidade/buttonComorbidade';

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
                            <div className='foto-perfil'>
                                <div className='foto'>

                                </div>
                            </div>
                        </div>
                        <div className='pos-dados'>
                            <h3>Mohamed Lee</h3>
                            <div className='pos-tit'>
                                <p>CPF: XXX.XXX.XXX-XX</p>
                                <p>Telefone: (47) 99783-9970</p>
                            </div>
                        </div>
                    </div>                   
                </div>
                <div className='cnt-button'>
                    <button className='but-edit'>Editar Perfil</button>
                </div>
            </div>
            <div className='nav-modal'>
                <div className='nav-itens'>
                    <button className='iten-button'>Dados</button>
                    <button className='iten-button'>Comorbidades</button>
                    <button className='iten-button'>Responsáveis</button>
                    <button className='iten-button'>Médicos</button>
                </div>
            </div>
            <div className='cnt-iten'>
                <div className='cnt-position'>
                    <ButtonComorbidade />
                    <ButtonComorbidade />
                    <ButtonComorbidade />
                    <ButtonComorbidade />
                </div>
            </div>
            <div className='div-button'>
                <div className='pos-button'>
                    <button className='button-add'>Adicionar</button>
                    <button className='button-edt'>Editar</button>
                </div>
            </div>
        </div>
    );
}