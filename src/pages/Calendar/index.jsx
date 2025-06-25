import {useEffect, useState} from "react";
import './styles.css';
import {RiCheckboxFill} from "react-icons/ri";
import CalendarAPI from '../../components/CalendarAPI/CalendarAPI';
import ModalEventos from '../../components/modalEventos/Eventos/ModalRegisterEventos';
import {getCalendar, saveEvent, updateEvent} from "../../api/calendar.jsx";
import ModalRegisterEventos from "../../components/modalEventos/Eventos/ModalRegisterEventos";
import {toast} from "react-toastify";

export default function Calendar() {

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event) => {
        if (event.oid) {
            updateEvent(event).then((data) => {
                if (data) {
                    toast.success("Evento atualizado com sucesso!");
                    fetchSchedules();
                    handleClose();
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
        } else {
            saveEvent(event).then((data) => {
                if (data) {
                    toast.success("Evento cadastrado com sucesso!");
                    fetchSchedules();
                    handleClose();
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
    }

    const fetchSchedules = () => {
        getCalendar().then((data) => {
            if (data) {
                setEvents(data);
            }
        });
    };

    useEffect(() => {
        getCalendar().then((data) => {
            if (data) {
                setEvents(data);
            }
        });
    }, []);



    return (
        <div className='div-main'>
            <ModalRegisterEventos isOpen={isOpen} handleClose={handleClose} handleSubmit={handleSubmit}
                                  event={selectedEvent}/>
            <div className='div-left'>
                <div className='position-blo'>
                    <div className='pos-event' onClick={handleOpenModal}>
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
                                {/*<div className='cat-blo'>*/}
                                {/*    <RiCheckboxFill style={{height: "20px", width:"20px", color: "purple"}} /><a className='cat-iten'>Atestado</a>*/}
                                {/*</div> */}
                                <div className='cat-blo'>
                                    <RiCheckboxFill style={{height: "20px", width: "20px", color: "orange"}}/><a
                                    className='cat-iten'>Anotação</a>
                                </div>
                                <div className='cat-blo'>
                                    <RiCheckboxFill style={{height: "20px", width: "20px", color: "red"}}/><a
                                    className='cat-iten'>Medicamento agendado</a>
                                </div>
                                <div className='cat-blo'>
                                    <RiCheckboxFill style={{height: "20px", width: "20px", color: "blue"}}/><a
                                    className='cat-iten'>Consulta</a>
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
                    <CalendarAPI events={events}/>
                </div>
            </div>
        </div>
    )
}
