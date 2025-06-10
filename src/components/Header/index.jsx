import { Link } from 'react-router-dom';
import './styles.css'
import SearchInput from '../SearchInput';
import { FaRegUser } from "react-icons/fa";
import Logo_MedTec from '../../assets/images/logo-medtec.png';
import Dropdown from "../Dropdown/Dropdown.jsx";


export default function Header() {
    return (
        <header>
            <nav>
                <div className="left"><img src={Logo_MedTec} alt='logo_medtec' className='logo-header'/></div>
                <div className="mid">
                    <Link to="/medicamentos">Medicamentos</Link>
                    <Link to="/agendamento">Agendamentos</Link>
                    <Link to="/consultas">Consultas</Link>
                    <Link to="/calendario">Calendário</Link>
                </div>
                <div className="right">
                    <SearchInput/>
                    <Dropdown />
                </div>
            </nav>
        </header>
    )
}
