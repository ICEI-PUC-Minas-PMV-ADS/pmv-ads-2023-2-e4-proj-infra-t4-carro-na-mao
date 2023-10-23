import axios from "axios";
import React, {Component} from "react";
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import{Menu} from './menu';

function Categoria() {
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
                    <label>Código Categoria</label>
                    <input type="text" placeholder="Código do Categoria"/>
                </div>
                <div>
                    <label>Valor da Categoria</label>
                    <input type="text" placeholder="R$50/dia"/>
                </div>
                <div>
                    <label>Descrição Categoria</label>
                    <input type="text" placeholder="Insira a descrição"/>
                </div>
                <div>
                    <label>Indica Promoção</label>
                    <input type="checkbox"/>
                </div>
                <div>
                    <label>Deseja excluir o estoque deste veículo?</label>
                </div>
            </div>
        </section>
        </>
    )
}

export default Categoria;