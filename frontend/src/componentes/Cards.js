import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCard = styled.div`
    box-sizing: border-box;
    background-color: #111827;
    border-color: black;
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden; 
    a {
        text-decoration: none;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    h6 {
        padding-left: 1rem;
        color: white;
        font-weight: bold;
        line-height: 12px;
    }
    h5 {
        text-align: center;
        color: white;
        font-weight: normal;
    }
    h4 {
        text-align: center;
        color: white;
        font-weight: normal;
        padding-top: 6px;
        font-weight: bold;
    }
    h6T {
        text-align: center;
        color: yellow;
        font-weight: bold;
        font-size: 14px;
        line-height: 5px;
        padding-bottom: 10px;
    }
    lb {
        color: white; 
    }
    img {
        padding-bottom: 1rem;
        max-width: 200px;
        max-height: 200px;
        width: auto;
        height: 180px;
    }
`;

const Info = styled.div`
    text-decoration: none;
    padding-bottom: 8px;
`;

const Cards = ({ projeto }) => {
    console.log(projeto);
    const ultimo = projeto.medidas.length;
    console.log(ultimo);


    return (
        <StyledCard>
            <Link to={`/medidas/${projeto._id}`}>
                <Content>
                    <h4>{projeto.nome}</h4>
                    <img src={projeto.imagem} alt="Description" />
                    <h5>Medidas Atuais:</h5>
                    <h6T>{projeto.medidas[ultimo - 1].data} {projeto.medidas[ultimo - 1].hora}</h6T>
                    <h6T>{projeto.medidas[ultimo - 1].netst}</h6T>
                    <Info>
                        <h6>Temperatura: <span style={{ color: projeto.medidas[ultimo - 1].temperatura < 20 ? "#ff0000" : "#00cc00", fontWeight: "bold" }}>{projeto.medidas[ultimo - 1].temperatura}°C</span></h6>
                        <h6>Umidade: <span style={{ color: projeto.medidas[ultimo - 1].umidade > 60 ? "#ff0000" : "#00cc00", fontWeight: "bold" }}>{projeto.medidas[ultimo - 1].umidade}%</span></h6>
                        <h6>Nível: <span style={{ color: projeto.medidas[ultimo - 1].nivel < 30 ? "#ff0000" : "#00cc00", fontWeight: "bold" }}>{projeto.medidas[ultimo - 1].nivel}%</span></h6>
                        <h6>Peso: <span style={{ color: projeto.medidas[ultimo - 1].peso < 50 ? "#ff0000" : "#00cc00", fontWeight: "bold" }}>{projeto.medidas[ultimo - 1].peso}kg</span></h6>
                    </Info>
                </Content>
            </Link>
        </StyledCard>
    );
};

export default Cards;
