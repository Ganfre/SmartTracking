import React from 'react';
import styled from 'styled-components';
import Logo_Colorido from './img/LogoSS_P.png'

const Inicio = styled.div`
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10rem;
    color: black;
`;

const Descricao = styled.div`
    flex: 1;
    padding-right: 5rem;
    h1{
        font-weight: bold;
        font-size: 3rem;
        color: black;
    }
    h2{
        padding-top: 1rem;
        font-weight: bold;
        font-size: 2rem;
        color: black;
    }
    p{
        padding-top: 1rem;
        font-size: 20px;
        text-align: justify;
        color: black;
    }
`;

const SecaoResumo = ()=>{
    return(
        <Inicio>
            <Descricao>
                <img style={{ width: '65%', height: 'auto'}} src={Logo_Colorido} alt="Logo_Colorido" />
                <p>
                O SmartTracking é uma aplicação projetada para monitorar e gerenciar níveis e condições de reservatórios, 
                como silos e caixas d'água, de forma inteligente e eficiente.  Utilizando tecnologia de ponta, o sistema 
                coleta dados em tempo real, oferecendo uma visualização clara e acessível das medições. Ele é ideal para 
                ambientes industriais e residenciais que necessitam de controle preciso e automação na gestão de seus 
                reservatórios. Com uma interface intuitiva, o SmartTracking permite que os usuários acompanhem o status 
                dos sistemas, recebam alertas e relatórios detalhados, garantindo um uso mais eficiente e seguro dos recursos.
                </p>
            </Descricao>
        </Inicio>
    )
}

export default SecaoResumo