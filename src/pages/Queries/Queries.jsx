import '../Queries/Queries.css';
import CardConsulta from "../../components/CardConsulta/cardConsulta.jsx";
import ModalRegisterScheduling from "./Register/ModalRegisterScheduling.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveSchedule } from "../../api/schedule.jsx";

export default function Queries() {
    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);
    
        const handleOpenModalScheduling = (e) => {
            setIsOpenSchedulingModal(true);
        };
    
        const handleCloseScheduling = () => {
            setIsOpenSchedulingModal(false);
        };
    
        const handleSaveScheduling = (schedule) => {
            saveSchedule(schedule).then((data) => {
                if (data) {
                    toast.success("Agendamento cadastrado com sucesso!");
                    handleCloseScheduling();
                }
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    if (error.response.data.mensagem instanceof Array) {
                        var mensagem = error.response.data.mensagem.join(", ");
                        toast.error(mensagem);
                    } else {
                        toast.error(error.response.data.mensagem);
                    }
                }
            });
        }
    
        const handleClean = () => {
            console.log("limpar")
        }
    
        return (
            <div className="agendamento-container">
            <ModalRegisterScheduling isOpen={isOpenSchedulingModal} handleClose={handleCloseScheduling} handleSubmit={handleSaveScheduling}
                handleClean={handleClean} />
            <div className="pos-shadow" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <div className="nav-top">
                    <h2 style={{ color: "#48735F", fontWeight: "100" }}>Agenda de Consultas</h2>
                    <div style={{ marginLeft: "auto" }}>
                        <button className="but-scheduler" onClick={handleOpenModalScheduling}>+ Criar Agendamento</button>
                    </div>
                </div>
                <div className="navegacao">
                    <div className="nav-itens">
                        <button className="botao-navegacao">Hoje</button>
                        <button className="botao-navegacao">Geral</button>
                    </div>
                </div>
            </div>
            <div className="cards">
                <CardConsulta />
            </div>
        </div>
    )
} 