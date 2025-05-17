import {useContext, useState} from 'react';
import { FaRegUser } from 'react-icons/fa';
import './Dropdown.css';
import Perfil from '../../assets/images/Perfil.png';
import Pacientes from '../../assets/images/Pacientes.png';
import Favoritos from '../../assets/images/favoritos.png';
import Historico from '../../assets/images/historico.png';
import Configuracoes from '../../assets/images/configuracoes.png';
import Sair from '../../assets/images/sair.png';
import {AuthContext} from "../../auth/Context.jsx";
import {useNavigate} from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div style={{ position: 'relative' }}>
      <FaRegUser className='icone' onClick={toggleMenu}/>
      {isOpen && (
        <div className={`menu ${isOpen ? 'open' : ''}`}>
          <div className='menu-itens'>  
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <div className='conjunto-menu'>
                  <img className='imagem' src={Perfil} /><li className='itens-menu'>Meu Perfil</li>
                </div>
                <div className='conjunto-menu'>
                  <img className='imagem' src={Pacientes} /><li className='itens-menu'>Pacientes</li>
                </div>
                <div className='conjunto-menu'>
                  <img className='imagem' src={Favoritos} /><li className='itens-menu'>Favoritos</li>
                </div>
                <div className='conjunto-menu'>
                  <img className='imagem' src={Historico} /><li className='itens-menu'>Histórico</li>
                </div>
                <div className='conjunto-menu'>
                  <img className='imagem' src={Configuracoes} /><li className='itens-menu'>Configurações</li>
                </div>
                <div className='conjunto-menu' onClick={handleLogout}>
                  <img style={{marginLeft: "3px"}} className='imagem' src={Sair} /><li style={{marginLeft: "2px"}}  className='itens-menu'>Sair</li>
                </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
