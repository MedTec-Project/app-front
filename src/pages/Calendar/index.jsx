import {useEffect, useState} from "react";
import './styles.css';
import { RiCheckboxFill } from "react-icons/ri";
import CalendarAPI from '../../components/CalendarAPI/CalendarAPI';
import ModalEventos from '../../components/modalEventos/Eventos/ModalRegisterEventos';

export default function Calendar() {

        const [event, setEvent] = useState(null);
        const [tab, setTab] = useState(1);
        const [selected, setSelected] = useState(null);
        const [sortOptions, setSortOptions] = useState([
            {id: "none", label: "Ordenar"},
            {id: "name", label: "Nome"},
            {id: "type", label: "Tipo"},
            {id: "pills", label: "Comprimidos"}
        ]);
        const [isOpen, setIsOpen] = useState(false);
        const [sort, setSort] = useState(sortOptions[0]);
        const [filters, setFilters] = useState({
            brands: {
                catarinense: false,
                nissei: false
            },
            types: {
                analgesico: false,
                antiInflamatorio: false,
                antialergico: false
            }
        });
        const brandOptions = [
            {id: "catarinense", label: "Catarinense", checked: filters.brands.catarinense},
            {id: "nissei", label: "Nissei", checked: filters.brands.nissei}
        ];
        const typeOptions = [
            {id: "analgesico", label: "Analgésico", checked: filters.types.analgesico},
            {id: "antiInflamatorio", label: "Anti-inflamatório", checked: filters.types.antiInflamatorio},
            {id: "antialergico", label: "Antialérgico", checked: filters.types.antialergico}
        ];
        const handleFilterChange = (category, id) => {
            setFilters(prevFilters => ({
                ...prevFilters,
                [category]: {
                    ...prevFilters[category],
                    [id]: !prevFilters[category][id]
                }
            }));
        };
    
        const handleSortChange = (e) => {
            setSort(sortOptions.find(option => option.id === e.target.value));
        };
    
        const handleOpenModal = () => {
            setIsOpen(true);
        };
        const handleClose = () => {
            setIsOpen(false);
        };
    
        const handleSubmit = (medicamento) => {
            setEvent(medicamento);
            saveEvent(medicamento).then((data) => {
                if (data) {
                    toast.success("Medicamento cadastrado com sucesso!");
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
    
        const handleClean = () => {
            console.log("limpar")
        }

    return (
        <div className='div-main'>
            <ModalEventos isOpen={isOpen} handleClose={handleClose} handleSubmit={handleSubmit}
                                               handleClean={handleClean}/>
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