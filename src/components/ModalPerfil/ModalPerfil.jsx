import './ModalPerfil.css';
import { AiOutlineClose } from "react-icons/ai";
import ButtonComorbidade from '../ButtonComorbidade/buttonComorbidade';
import ModalRegisterDoctor from '../ModalRegisterDoctor/modalRegisterDoctor';
import { useState } from 'react'; // Certifique-se de importar useState
import ButtonDoctor from '../ButtonDoctor/buttonDoctor';
import image from "../../assets/images/doctor.png";

export default function ModalPerfil({ modalOpen, handleClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // Se estiver usando essa variável

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const closeInnerModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = () => {
        // Defina aqui a lógica de submit, se necessário
    };

    return (
        <div className='mod-perfil' style={{ display: modalOpen ? "block" : "none" }}>
            <ModalRegisterDoctor 
                isOpen={isOpen} 
                handleClose={closeInnerModal} 
                handleSubmit={handleSubmit}
                event={selectedEvent}
            />
            <div className='mod-tittle'>
                <button className="close-btn" onClick={handleClose}>
                    <AiOutlineClose />
                </button>
            </div>
            <div className='conteudo'>
                <div className='cnt-perfil'>
                    <div className='pos-info'>
                        <div className='pos-foto'>                          
                            <img src={image} className="perfil-usuar-modal" alt="Foto do médico" />
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
                    <ButtonDoctor />
                    <ButtonDoctor />
                </div>
            </div>
            <div className='div-button'>
                <div className='pos-button'>
                    <button className='button-add' onClick={handleOpenModal}>Adicionar</button>
                    <button className='button-edt'>Editar</button>
                </div>
            </div>
        </div>
    );
}
