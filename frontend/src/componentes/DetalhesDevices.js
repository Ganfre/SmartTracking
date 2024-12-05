import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import Graph from "./Graficos";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import FilterComponent from "./Filtro";
import siloImg from "./img/Silo.png";
import caixaAguaImg from "./img/Caixa_Agua.png";

const Titulo = styled.div`
    h1 {
        font-weight: bold;
        color: #111827;
        padding: 0rem 1rem 1rem 0rem;
    }
`;

const AdmContainer = styled.div`
    padding-left: 8rem;
    padding-right: 3rem;
    padding-bottom: 2rem;
`;

const BackButton = styled.button`
    background-color: transparent;
    color: #111827;
    border: none;
    padding: 5px 0px 0px 0px;
    cursor: pointer;
    font-size: 25px;
`;

const LinhaTitulo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const CustomTable = styled(Table)`
    &.table {
        background-color: #444;
        color: #111827;
    }
    thead {
        background-color: #555;
    }
    tbody {
        tr {
            &:nth-child(even) {
                background-color: #444;
            }
            &:nth-child(odd) {
                background-color: #333;
            }
            td {
                color: #111827;
            }
        }
    }
`;

// Estilização do container do silo com a barra
const SiloContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px; // Largura da imagem do silo
    height: 340px; // Altura da imagem do silo
    margin: auto;
`;

const SiloImagem = styled.img`
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

const CaixaImagem = styled.img`
    width: 100%;
    height: auto;
    max-height: 315px; 
    object-fit: contain; 
    position: absolute;
    top: 0;
    left: 9px;
    z-index: 1;
`;

const BarraNivelVertical = styled.div`
    background-color: #ddd;
    width: 50px; // Largura da barra de nível
    height: 70%; // Altura total da barra
    border-radius: 5px;
    margin-top: 10.5px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: flex-end;
    z-index: 2;
`;

const NivelPreenchidoVertical = styled.div`
    width: 100%;
    height: ${props => props.nivel}%; // Altura da parte preenchida da barra
    background-color: ${props => {
        if (props.nivel < 30) return "red";
        if (props.nivel < 50) return "orange";
        if (props.nivel < 80) return "yellow";
        return "green";
    }};
    transition: height 0.5s;
`;

const PercentagemVertical = styled.div`
    position: absolute;
    bottom: 5px; // Para centralizar a porcentagem na parte inferior da barra
    width: 100%;
    text-align: center;
    color: black;
    font-weight: bold;
    z-index: 3;
`;

const IconePeso = styled(FontAwesomeIcon)`
    margin-right: 5px;
    color: ${(props) => (props.peso < 50 ? "red" : "gray")};
    animation: ${(props) => (props.peso < 50 ? "pulse 1s infinite" : "none")};
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const TabelaWrapper = styled.div`
    max-height: 261.5px;
    overflow-y: auto; 
`;

const DetalhesDevice = () => {
    const { id } = useParams();
    const { data } = useApi(`/devices/detalhes/${id}`);
    const medidas = data?.data?.message?.medidas || [];
    const [filtroData, setFiltroData] = useState({
        dataInicio: null,
        dataFim: null
    });

    useEffect(() => {
        const today = new Date();
        const dataInicio = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const dataFim = dataInicio; // O final do dia também é o mesmo dia para filtrar um único dia

        setFiltroData({ dataInicio, dataFim });
    }, []);

    const ultimasCincoMedidas = medidas.slice(-5);

    const nivelAtual = medidas.length > 0 ? medidas[medidas.length - 1].nivel : 0;
    const pesoAtual = medidas.length > 0 ? medidas[medidas.length - 1].peso : 0;

    const tipo = data?.data?.message?.tipo || "Silo";

    const exportToCsv = () => {
        const headers = ["Data", "Hora", "Temperatura", "Umidade", "Nível", "Peso"];
        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" +
            headers.join(";") + "\n" +
            medidas.map(row => [
                row.data, 
                row.hora,
                row.temperatura,
                row.umidade,
                row.nivel,
                row.peso
            ].join(";")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Medidas.csv");
        document.body.appendChild(link);
        link.click();
    };

    const goBack = () => {
        window.history.back();
    };

    const filtrarPorData = (medidasFiltradas, dataInicio, dataFim) => {
        const dataInicioFiltro = new Date(dataInicio);
        const dataFimFiltro = new Date(dataFim);
        dataFimFiltro.setDate(dataFimFiltro.getDate() + 1);

        return medidasFiltradas.filter(medida => {
            const dataMedida = new Date(medida.data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3'));
            return dataMedida >= dataInicioFiltro && dataMedida < dataFimFiltro;
        });
    };

    return (
        <AdmContainer>
            <Container>
                <Row>
                    <Col md={12}>
                        <BackButton onClick={goBack}><FontAwesomeIcon icon={faArrowLeft} /></BackButton>
                    </Col>
                </Row>
                <LinhaTitulo>
                    <Titulo><h1>{data?.data?.message?.nome}</h1></Titulo>
               </LinhaTitulo>
                <Row>
                    <Col md={3}>
                        <Card style={{ height: "385px", marginBottom: "15px" }}>
                            <Card.Header>{tipo === "Silo" ? "Silo" : "Caixa d'Água"}</Card.Header>
                            <Card.Body>
                                <SiloContainer>
                                    {tipo === "Silo" ? (
                                        <>
                                            <SiloImagem src={siloImg} alt="Silo" />
                                            <div style={{ position: "absolute", top: "0px", right: "-33px", display: "flex", alignItems: "center" }}>
                                                <IconePeso icon={faWeightHanging} peso={pesoAtual} />
                                                <span style={ pesoAtual < 50 ? { color: "red", fontWeight: 'bold'} : { color: "gray", fontWeight: 'bold' }}>{pesoAtual}kg</span>
                                            </div>
                                        </>
                                    ) : (
                                        <CaixaImagem src={caixaAguaImg} alt="Caixa d'Água" />
                                    )}
                                    <BarraNivelVertical>
                                        <NivelPreenchidoVertical nivel={nivelAtual} />
                                        <PercentagemVertical>{nivelAtual}%</PercentagemVertical>
                                    </BarraNivelVertical>
                                </SiloContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9}>
                        <Card style={{ height: "385px", marginBottom: "15px"}}>
                            <Card.Header>Últimas Medidas</Card.Header>
                            <Card.Body>
                                <TabelaWrapper>
                                    <CustomTable striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Temperatura</th>
                                                <th>Umidade</th>
                                                <th>Nível</th>
                                                <th>Peso</th>
                                                <th>Data</th>
                                                <th>Hora</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ultimasCincoMedidas.map(med => (
                                                <tr key={med.data + med.hora}>
                                                    <td style={med.temperatura < 20 ? { color: "red", fontWeight: 'bold' } : { color: "black" }}>{med.temperatura}°C</td>
                                                    <td style={med.umidade > 60 ? { color: "red", fontWeight: 'bold' } : { color: "black" }}>{med.umidade}%</td>
                                                    <td style={med.nivel < 30 ? { color: "red", fontWeight: 'bold' } : { color: "black" }}>{med.nivel}%</td>
                                                    <td style={med.peso < 50 ? { color: "red", fontWeight: 'bold' } : { color: "black" }}>{med.peso}kg</td>
                                                    <td>{med.data}</td>
                                                    <td>{med.hora}h</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </CustomTable>
                                </TabelaWrapper>
                                <Button style={{marginTop: '10px'}} variant="primary" onClick={exportToCsv}>Exportar CSV</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>Gráficos</Card.Header>
                            <Card.Body>
                                <FilterComponent 
                                    setFiltroData={setFiltroData} 
                                    dataInicio={filtroData.dataInicio} 
                                    dataFim={filtroData.dataFim}
                                />
                                <Row>
                                    <Col md={6}>
                                        <Graph data={filtrarPorData(medidas, filtroData?.dataInicio, filtroData?.dataFim).map((med) => ({ data: med.data, value: med.temperatura }))} title="Temperatura (°C)" />
                                    </Col>
                                    <Col md={6}>
                                        <Graph data={filtrarPorData(medidas, filtroData?.dataInicio, filtroData?.dataFim).map((med) => ({ data: med.data, value: med.umidade }))} title="Umidade (%)" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Graph data={filtrarPorData(medidas, filtroData?.dataInicio, filtroData?.dataFim).map((med) => ({ data: med.data, value: med.nivel }))} title="Nível (%)" />
                                    </Col>
                                    <Col md={6}>
                                        <Graph data={filtrarPorData(medidas, filtroData?.dataInicio, filtroData?.dataFim).map((med) => ({ data: med.data, value: med.peso }))} title="Peso (kg)" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AdmContainer>
    );
}

export default DetalhesDevice;
