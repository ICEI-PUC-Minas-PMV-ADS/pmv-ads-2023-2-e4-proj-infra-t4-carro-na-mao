import axios from "axios";
import React, {Component} from "react";
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import{Menu} from './menu';
import  '../estilos/estoque.css'

function Estoque() {
    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    useEffect(() => {
        async function fetchData() {
            try{
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()
    }, []);

    return (
        <>
        <Menu/>
        <section>
            <div style={{ width: '25%', float: 'left'}}>
                {/* Div para listagem de estoque disponível */}
                {/* Coloque sua lista de estoque aqui */}
            </div>
            <div style={{ width: '75%', float: 'right' }}>
                <div>
                    <button id="btnRegistro">Novo Registro</button>
                    <button id="btnGravar">Gravar</button>
                </div>
                <div>
                    <label>Código Estoque</label>
                    <input type="text" placeholder="Código do Estoque"/>
                </div>
                <div>
                    <label>Código Veículo</label>
                    <input type="text" placeholder="Modelo Veículo"/>
                </div>
                <div>
                    <label>Placa Veículo</label>
                    <input type="text" placeholder="AAA-0000"/>
                </div>
                <div>
                    <label>Cor Veículo</label>
                    <input type="text" placeholder="Cor do veículo"/>
                </div>
                <div>
                    <label>Deseja excluir o estoque deste veículo?</label>
                </div>
            </div>
        </section>
        </>
    )
}

export default Estoque;