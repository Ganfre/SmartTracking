import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import styled from 'styled-components'
import {addRegistro} from '../servicos/api'

const Geral = styled.div`
    h6{
        color: #111827;
        font-weight: bold;
    }
`;

function NovoDevice() {

    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [email, setEmail] = useState()
    const [imagem, setImagem] = useState()
    const [tipo, setTipo] = useState('') 

    const data = { nome, descricao, email, imagem, tipo }

    function click(){
        addRegistro(data)
    }

  return (
    <Geral>
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label><h6>Email</h6></Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Insira o seu email" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label><h6>Nome do Device</h6></Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Insira um nome do device"
                        value={nome}
                        onChange={(e)=> setNome(e.target.value)}
                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tipo">
                    <Form.Label><h6>Tipo de Device</h6></Form.Label>
                    <Form.Select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="">Selecione um tipo</option>
                        <option value="Silo">Silo</option>
                        <option value="Caixa d'Água">Caixa d'Água</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="descricao">
                    <Form.Label><h6>Descriçao</h6></Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Descrição do device"
                        value={descricao}
                        onChange={(e)=> setDescricao(e.target.value)} 
                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="foto">
                    <Form.Label><h6>Foto</h6></Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Insira uma imagem para identificação"
                        value={imagem}
                        onChange={(e)=> setImagem(e.target.value)} 
                        />
                </Form.Group>
                <Button variant="primary" onClick={()=> click(data.email, data.nome, data.descricao, data.imagem, data.tipo)} >Salvar</Button>&nbsp;&nbsp;
                <Button variant="secondary" type="submit">Cancelar</Button>

            </Form>
        </Container>
    </Geral>
  )
}

export default NovoDevice