import './styles.css';
import { RiCheckboxFill } from "react-icons/ri";

export default function Calendar() {
    return (
        <div className='div-main'>
            <div className='div-left'>
                <div className='block'>
                    <div className='blo-tittle'>
                        <div className='blo-pos-tittle'>
                            <a className='blo-pos-tit-final'>Março 2025</a>
                            <div className='but-direction'>
                                <button className='button'>&lt;</button>
                                <button className='button'>&gt;</button>
                            </div>
                        </div>
                        <div className='blo-calendar'>
                        <div class="calendar">
                            <div class="month-indicator">
                            </div>
                            <div class="day-of-week">
                            <div>SEG</div>
                            <div>TER</div>
                            <div>QUA</div>
                            <div>QUI</div>
                            <div>SEX</div>
                            <div>SAB</div>
                            <div>DOM</div>
                            </div>
                            <div class="date-grid">
                            <button>
                                <time datetime="2010-02-01">1</time>
                            </button>
                            <button>
                                <time datetime="2020-02-02">2</time>
                            </button>
                            <button>
                                <time datetime="2020-02-03">3</time>
                            </button>
                            <button>
                                <time datetime="2020-02-04">4</time>
                            </button>
                            <button>
                                <time datetime="2020-02-05">5</time>
                            </button>
                            <button>
                                <time datetime="2020-02-06">6</time>
                            </button>
                            <button>
                                <time datetime="2020-02-07">7</time>
                            </button>
                            <button>
                                <time datetime="2020-02-08">8</time>
                            </button>
                            <button>
                                <time datetime="2020-02-09">9</time>
                            </button>
                            <button>
                                <time datetime="2020-02-10">10</time>
                            </button>
                            <button>
                                <time datetime="2020-02-11">11</time>
                            </button>
                            <button>
                                <time datetime="2020-02-12">12</time>
                            </button>
                            <button>
                                <time datetime="2020-02-13">13</time>
                            </button>
                            <button>
                                <time datetime="2020-02-14">14</time>
                            </button>
                            <button>
                                <time datetime="2020-02-15">15</time>
                            </button>
                            <button>
                                <time datetime="2020-02-16">16</time>
                            </button>
                            <button>
                                <time datetime="2020-02-17">17</time>
                            </button>
                            <button>
                                <time datetime="2020-02-18">18</time>
                            </button>
                            <button>
                                <time datetime="2020-02-19">19</time>
                            </button>
                            <button>
                                <time datetime="2020-02-20">20</time>
                            </button>
                            <button>
                                <time datetime="2020-02-21">21</time>
                            </button>
                            <button>
                                <time datetime="2020-02-22">22</time>
                            </button>
                            <button>
                                <time datetime="2020-02-23">23</time>
                            </button>
                            <button>
                                <time datetime="2020-02-24">24</time>
                            </button>
                            <button>
                                <time datetime="2020-02-25">25</time>
                            </button>
                            <button>
                                <time datetime="2020-02-26">26</time>
                            </button>
                            <button>
                                <time datetime="2020-02-27">27</time>
                            </button>
                            <button>
                                <time datetime="2020-02-28">28</time>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='block'>
                    <div className='blo-tittle'>
                        <div className='blo-pos-tittle'>
                            <a className='blo-pos-tit-final'>Categoria</a>
                        </div>
                        <div className='blo-cat'>
                            <div className='cat-blo'>
                                <RiCheckboxFill style={{height: "20px", width:"20px", color: "purple"}} /><a className='cat-iten'>Atestado adicionado</a>
                            </div> 
                            <div className='cat-blo'>
                                <RiCheckboxFill style={{height: "20px", width:"20px", color: "yellow"}} /><a className='cat-iten'>Anotação</a>
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
                <div className='block'>
                <div className='blo-tittle'>
                        <div className='blo-pos-tittle'>
                            <a className='blo-pos-tit-final'>Informações...</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='div-right'>
                
            </div>
        </div>
    )
}