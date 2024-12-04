import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faChartLine, faCog, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logo_B from './img/Logo_B.png';
import LogoSS_Menor from './img/LogoSS_Menor.png';
import Logout from "../paginas/Logout";
import { useApi } from '../hooks/useApi';
import Userfront from '@userfront/toolkit';
import ToggleMenu from './ToggleMenu';

// Estilização do Menu utilizando styled-components
const StyledMenu = styled.div`
  background: linear-gradient(160deg, #194631 45%, #009637 100%);
  color: white;
  width: ${(props) => (props.retract === 'true' ? '60px' : '280px')};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0px 30px 0px 0px;
  box-shadow: 10px 0px 20px 5px rgba(0, 0, 0, 0.2);
  transition: width 0.3s ease;

  ul {
    list-style: none;
    padding: 0;
    flex-direction: column;
  }

  li {
    padding-left: ${(props) => (props.retract === 'true' ? '0.2rem' : '2rem')};
    padding-top: ${(props) => (props.retract === 'true' ? '50px' : '1.5rem')};
    display: flex;
    align-items: center;
    &:hover {
      color: #c0c0c0;
    }
  }

  a {
    display: flex;
    color: white;
    text-decoration: none;
    margin: none;
    padding: none;
    align-items: center;
    font-size: 20px;
    &:hover {
      color: #c0c0c0;
    }
  }
`;

// Estilização da Bolinha de Notificação
const BolinhaNotificacao = styled.div`
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  margin-left: 8px;
`;

const Menu = ({ onMenuToggle }) => {
  const [retractMenu, setRetractMenu] = useState(false);
  const { data } = useApi('/devices');
  const [dispositivosComProblemas, setDispositivosComProblemas] = useState(false);

  // Efeito para detectar dispositivos com problemas
  useEffect(() => {
    if (data?.data?.message) {
      const dispositivosComProblemas = data.data.message.some((projeto) => {
        const ultimaMedida = projeto.medidas[projeto.medidas.length - 1];
        return (
          ultimaMedida.temperatura < 20 ||
          ultimaMedida.nivel < 30 ||
          ultimaMedida.peso < 50 ||
          ultimaMedida.umidade > 60
        );
      });
      setDispositivosComProblemas(dispositivosComProblemas);
    }
  }, [data]);

  // Função para alternar o estado de retração do menu
  const toggleRetractMenu = () => {
    setRetractMenu(!retractMenu);
    onMenuToggle(!retractMenu);
  };

  return (
    <StyledMenu retract={retractMenu ? 'true' : 'false'}>

      {/* Botão para alternar a retração do menu */}
      <ToggleMenu onToggle={toggleRetractMenu} />

      {/* Link para a home com o logotipo */}
      <Link to='/' style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingTop: '40px' }}>
        {!retractMenu && <img style={{ width: '100%', height: 'auto' }} src={Logo_B} alt="Logo" />}
        {retractMenu && <img style={{ width: '100%', height: 'auto' }} src={LogoSS_Menor} alt="Logotipo Contraído" />}
      </Link>

      {/* Lista de navegação do menu */}
      <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '20px' }}>
        {/* Links para usuário não logado */}
        {!Userfront.accessToken() && (
          <>
            {!retractMenu && (
              <li>
                <Link to='/login'><FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />Login</Link>
              </li>
            )}
            {retractMenu && (
              <li>
                <Link to='/login'><FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /></Link>
              </li>
            )}
          </>
        )}

        {/* Links para usuário logado */}
        {Userfront.accessToken() && (
          <>
            {!retractMenu && (
              <li>
                <Link to='/'><FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} /> Início</Link>
              </li>
            )}
            {retractMenu && (
              <li>
                <Link to='/'><FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} /></Link>
              </li>
            )}

            {!retractMenu && (
              <li>
                <Link to='/medidas'><FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} /> Medidas</Link>
              </li>
            )}
            {retractMenu && (
              <li>
                <Link to='/medidas'><FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} /></Link>
              </li>
            )}

            {!retractMenu && (
              <li>
                <Link to='/admin'><FontAwesomeIcon icon={faCog} style={{ marginRight: '10px' }} /> Administrador</Link>
              </li>
            )}
            {retractMenu && (
              <li>
                <Link to='/admin'><FontAwesomeIcon icon={faCog} style={{ marginRight: '10px' }} /></Link>
              </li>
            )}

            {!retractMenu && (
              <li>
                <Link to='/notificacao'>
                  <FontAwesomeIcon icon={faBell} style={{ marginRight: '10px' }} />
                  Notificação {dispositivosComProblemas && <BolinhaNotificacao style={{ marginTop: '4px' }} />}
                </Link>
              </li>
            )}
            {retractMenu && (
              <li>
                <Link to='/notificacao'>
                  <FontAwesomeIcon icon={faBell} style={{ marginRight: '5px' }} />
                  {dispositivosComProblemas && <BolinhaNotificacao style={{ marginTop: '-10px', marginLeft: '-13px' }} />}
                </Link>
              </li>
            )}

            <li style={{ display: 'flex', alignItems: 'center' }}>
              {!retractMenu && (
                <Link to='/logout'>
                  <Logout />
                  <div style={{ position: 'absolute', marginBottom: "21px", fontSize: '20px', zIndex: '1'}}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />Sair
                  </div>
                </Link>
              )}
            </li>
          </>
        )}
      </ul>
    </StyledMenu>
  );
};

export default Menu;
