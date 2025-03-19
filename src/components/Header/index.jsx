import { Link } from 'react-router-dom';
import './styles.css'
import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';
import SearchInput from '../SearchInput';
import { FaRegUser } from "react-icons/fa";

export default function Header() {

    const { token } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <div className="left">left</div>
                <div className="mid">
                    <Link to="/medicamentos">Medicamentos</Link>
                    <Link to="/agendamento">Agendamentos</Link>
                    <Link to="/calendario">Calendário</Link>
                </div>
                <div className="right"><SearchInput/><FaRegUser color='white' size={30}/></div>
                {/* <Link to="/"><img src={logo} alt="Logo" className="header-logo" /></Link>
                <ul>
                    <Link to="/">
                        <li>HOME</li>
                    </Link>
                    <Link to="/favorites"><li>Favoritos</li></Link>
                    <Link to="/feed"><li>Feed</li></Link>
                    {token && <Link to="/profile">Perfil</Link>}
                    {token && <LogoutButton />}
                </ul> */}
            </nav>
        </header>
    )
}
