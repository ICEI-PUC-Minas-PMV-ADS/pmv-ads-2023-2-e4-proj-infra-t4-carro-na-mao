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
    const [showDivs, setShowDivs] = useState(false); 
    const [localizacaoData, setLocalizacaoData] = useState(null);

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
                    const codLocal = response.data.id_local;
                    setLocalizacaoData(response.data);
                    setShowDivs(true);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return(
        <>
        <Menu/>
        <section id="localizacaoStyle">
            <div style={{ width: '25%', float: 'left'}}>
                <labe>Insira o código da Locação</labe>
                <br/>
                <input id="locacao" type="text" onChange={findLocalizacao}/>
            </div>
            <div>
                {showDivs && localizacaoData ? (
                    <>
                        <div>

                        </div>
                        <div id="divMap">
                            <label id="textMap">Este é o local de retirada do seu veículo</label>
                        </div>
                    </>
                ): null}
            </div>
            
        </section>
        </>
    )
}

export default Localizacao;