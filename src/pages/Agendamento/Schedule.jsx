import { IoIosSearch } from "react-icons/io";
import CardAgenda from "../../components/CardAgenda/cardAgenda";
import BottonDiary from "../../components/BottonDiary/bottonDiary";
import "./Schedule.css"
import ModalRegisterScheduling from "./Register/ModalRegisterScheduling.jsx";
import {useState} from "react";

export default function Schedule(){

    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);

    const handleOpenModalScheduling = () => {
        setIsOpenSchedulingModal(true);
    };

    const handleCloseScheduling = () => {
        setIsOpenSchedulingModal(false);
    };

    const handleSaveScheduling = (schedule) => {
        console.log(schedule);
    }

    const handleClean = () => {
        console.log("limpar")
    }
    
    return(
        <div className="agendamento-container">
            <ModalRegisterScheduling isOpen={isOpenSchedulingModal} handleClose={handleCloseScheduling} handleSubmit={handleSaveScheduling}
                                     handleClean={handleClean} />
            <div className="navegacao">
                <div className="nav-itens">
                    <button className="botao-navegacao">Hoje</button>
                    <div className="agendar" onClick={handleOpenModalScheduling}>
                        <button className="botao-agendar">AGENDAR</button>
                    </div>
                    <button className="botao-navegacao">Geral</button>
                </div>
                <div className="nav-pesquisa">
                    <input className="campo-pesquisa" placeholder="Procurar medicamentos..." />
                    <button className="but-pesquisa">
                        <IoIosSearch className="icone-pesquisa"/>
                    </button> 
                </div>
            </div>
            
            <div className="cards">
                <CardAgenda />
                <CardAgenda />
                <CardAgenda />
                <CardAgenda />
            </div>
            <BottonDiary />
        </div>
    )
}