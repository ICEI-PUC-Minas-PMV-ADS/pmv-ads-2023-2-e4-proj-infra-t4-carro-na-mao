import axios from "axios";
import React, { Component } from "react";
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { Menu } from './menu';
import '../estilos/localizacao.css'
import { LOCAL1, DEFAULT } from "../enum/localizacao";

function Localizacao() {
    const [token, setToken] = useState(null)
    const [showDivs, setShowDivs] = useState(false);
    const [localizacaoData, setLocalizacaoData] = useState(null);
    const [localizacaoEnum, setLocalizacaoEnum] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()
    }, []);

    const findLocalizacao = () => {
        const locacao = document.querySelector("#locacao").value;

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }

        axios.get(`https://api-carronamao.azurewebsites.net/find-by-locacao?id_locacao=${locacao}`, { headers })
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    const localizacaoEnum = getLocalizacao(response.data.id_local);
                    setLocalizacaoEnum(localizacaoEnum);
                    setLocalizacaoData(response.data);
                    setShowDivs(true);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getLocalizacao = (idLocal) => {
        switch (idLocal) {
            case 1:
                return LOCAL1;
            default:
                return DEFAULT; // Valor padrão se não corresponder a 1 ou 2
        }
    };

    return (
        <div id="fundoLocalizacao">
            <Menu />
            <labe id="textoLocalizacao1">Localização de Veículos</labe>

            <section id="localizacaoStyle">
                <div style={{ width: '25%', float: 'left' }}>

                    <labe id="textoLocalizacao2">Insira o código da Locação</labe>

                    <input id="locacao" type="text" onChange={findLocalizacao} />
                    {showDivs && localizacaoData ? (
                        <div>
                            <p>ID da Locação: {localizacaoData.id_locacao}</p>
                            <p>Nome do Local: {localizacaoEnum.nome}</p>
                            <p>Categoria: {localizacaoData.id_categoria}</p>
                            <p>Modelo do Veículo: {localizacaoData.modelo_veiculo}</p>
                            <p>Hora de Retirada: {localizacaoData.hora_retirada}</p>
                            <p>Hora de Entrega: {localizacaoData.hora_entrega}</p>
                            <p>Valor da Categoria: R$ {localizacaoData.vl_categoria}</p>
                            <p>Custos Adicionais: R$ {localizacaoData.custos_ad}</p>
                            <p>Data de Retirada: {localizacaoData.data_retirada}</p>
                            <p>Data de Entrega: {localizacaoData.data_entrega}</p>
                        </div>
                    ) : null}
                </div>
                <div id="listagem">
                    {showDivs && localizacaoData ? (
                        <div id="divMap">
                            <label id="textMap">Este é o local de retirada do seu veículo</label>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3751.2036080142802!2d-43.939082!3d-19.915822999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDU0JzU3LjAiUyA0M8KwNTYnMjAuNyJX!5e0!3m2!1spt-BR!2sbr!4v1698532806271!5m2!1spt-BR!2sbr" width={1000} height={500}></iframe>
                        </div>
                    ) : null}
                </div>

            </section>
        </div>
    )
}

export default Localizacao;