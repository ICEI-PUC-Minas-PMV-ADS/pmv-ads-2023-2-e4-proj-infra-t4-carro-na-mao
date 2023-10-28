import axios from "axios";
import React, {Component} from "react";
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import{Menu} from './menu';
import '../estilos/localizacao.css'

function Localizacao() {
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

    return(
        <>
        <Menu/>
        <section id="localizacaoStyle">
            <div style={{ width: '25%', float: 'left'}}>
                <labe>Insira o código da Locação</labe>
                <br/>
                <input type="number"/>
            </div>
            <div id="divMap">
                <label id="textMap">Este é o local de retirada do seu veículo</label>
            </div>
        </section>
        </>
    )
}

export default Localizacao;