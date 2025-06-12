import { Link } from 'react-router-dom';
import './styles.css';
import SearchInput from '../SearchInput';
import Logo_MedTec from '../../assets/images/logo-medtec.png';
import Dropdown from "../Dropdown/Dropdown.jsx";
import { IoNotificationsOutline } from "react-icons/io5";
import ModalNotification from '../ModalNotification/modalNotification.jsx';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const notifRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <header>
            <nav>
                <ModalNotification modalOpen={isOpen} ref={notifRef} />
                <div className="left">
                    <img src={Logo_MedTec} alt='logo_medtec' className='logo-header'/>
                </div>
                <div className="mid">
                    <Link to="/medicamentos">Medicamentos</Link>
                    <Link to="/agendamento">Agendamentos</Link>
                    <Link to="/calendario">Calendário</Link>
                </div>
                <div className="right">
                    <SearchInput />
                    <IoNotificationsOutline
                        style={{
                            marginLeft: "50px",
                            paddingBottom: "5px",
                            color: "white",
                            width: "35px",
                            height: "35px",
                            cursor: "pointer"
                        }}
                        onClick={toggleMenu}/>
                    <Dropdown />
                </div>
            </nav>
        </header>
    );
}
