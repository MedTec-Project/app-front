import CardAgenda from "../../components/CardAgenda/cardAgenda";
import BottonDiary from "../../components/BottonDiary/bottonDiary";
import "./styles.css"

export default function Agendamento(){
    
    return(
        <div className="agendamento-container">
            <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div className="nav-top">
                    <div>
                        <h2 style={{color: "#48735F", fontWeight: "100"}}>Agenda de Medicamentos</h2>
                    </div>
                    <div style={{marginLeft: "auto"}}>
                        <div>
                            <button className="but-scheduler">+ Criar Agendamento</button>
                        </div>
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
                <CardAgenda />
                <CardAgenda />
                <CardAgenda />
                <CardAgenda />
            </div>
        </div>
    )
}