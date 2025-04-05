import { IoIosSearch } from "react-icons/io";
import CardAgenda from "../../components/CardAgenda/cardAgenda";
import BottonDiary from "../../components/BottonDiary/bottonDiary";
import "./styles.css"

export default function Agendamento(){
    
    return(
        <div className="agendamento-container">
            <div className="navegacao">
                <div className="nav-itens">
                    <button className="botao-navegacao">Hoje</button>
                    {/* <div className="agendar"> 
                        <button className="botao-agendar">AGENDAR</button>
                    </div> */}
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