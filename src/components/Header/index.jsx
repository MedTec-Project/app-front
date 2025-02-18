import { Link } from 'react-router-dom';
import './styles.css'
import SearchInput from '../SearchInput';
import Dropdown from '../Dropdown/index';

export default function Header() {
    return (
        <header>
            <nav>
                <div className="left">left</div>
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