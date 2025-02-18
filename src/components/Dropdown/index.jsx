import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import './styles.css'
import Perfil from '../../assets/images/Perfil.png';
import Pacientes from '../../assets/images/Pacientes.png';
import Favoritos from '../../assets/images/favoritos.png';
import Historico from '../../assets/images/historico.png';
import Configuracoes from '../../assets/images/configuracoes.png';
import Sair from '../../assets/images/sair.png';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
                <div className='conjunto-menu'>
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
