import { Link } from 'react-router-dom';
import './styles.css'
import SearchInput from '../SearchInput';
import Dropdown from '../Dropdown/index';
import { FaRegUser } from "react-icons/fa";
import Logo_MedTec from '../../assets/images/logo-medtec.png';


export default function Header() {
    return (
        <header>
            <nav>
                <div className="left"><img src={Logo_MedTec} alt='logo_medtec' className='logo-header'/></div>
                <div className="mid">
                    <Link to="/medicamentos">Medicamentos</Link>
                    <Link to="/agendamentos">Agendamentos</Link>
                    <Link to="/calendario">Calendário</Link>
                </div>
                <div className="right">
                <SearchInput/>
                <Dropdown/>
                </div>
            </nav>
        </header>
    )
}