import './styles.css';
import { RiCheckboxFill } from "react-icons/ri";
import CalendarAPI from '../../components/CalendarAPI/CalendarAPI';

export default function Calendar() {
    return (
        <div className='div-main'>
            <div className='div-left'>
            <div className='position-blo'>
                    <div className='pos-event'>
                        <button className='but-event'>CRIAR EVENTO</button>
                    </div>
                </div>
                <div className='position-blo'>
                    <div className='block-cat'>
                        <div className='blo-tittle'>
                            <div className='blo-pos-tittle'>
                                <a className='blo-pos-tit-final'>Categoria</a>
                            </div>
                            <div className='blo-cat'>
                                <div className='cat-blo'>
                                    <RiCheckboxFill style={{height: "20px", width:"20px", color: "purple"}} /><a className='cat-iten'>Atestado adicionado</a>
                                </div> 
                                <div className='cat-blo'>
                                    <RiCheckboxFill style={{height: "20px", width:"20px", color: "orange"}} /><a className='cat-iten'>Anotação</a>
                                </div> 
                                <div className='cat-blo'>
                                    <RiCheckboxFill style={{height: "20px", width:"20px", color: "red"}} /><a className='cat-iten'>Medicamento agendado</a>
                                </div> 
                                <div className='cat-blo'>
                                    <RiCheckboxFill style={{height: "20px", width:"20px", color: "green"}} /><a className='cat-iten'>Data retorno</a>
                                </div> 
                                <div className='cat-blo'>
                                    <RiCheckboxFill style={{height: "20px", width:"20px", color: "blue"}} /><a className='cat-iten'>Data consulta</a>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className='position-blo'>
                    <div className='block-inf'>
                        <div className='blo-tittle'>
                                <div className='blo-pos-tittle'>
                                    <a className='blo-pos-tit-final'>Informações...</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className='div-right'>
                <div className='div-rig-calendar'>
                    <CalendarAPI />
                </div>
            </div>
        </div>
    )
}