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
    const [estoques, setEstoques] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEstoque, setSelectedEstoque] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try{
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);

                const response = await axios.get('https://api-carronamao.azurewebsites.net/api/Estoques', {
                    headers: {
                        "Authorization": 'Bearer ' + jwtToken
                    }
                });
                setEstoques(response.data)
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()
    }, []);

    const estoque = () => {
        const modelo = document.querySelector("#modelo").value;
        const marca = document.querySelector("#marca").value;
        const cor = document.querySelector("#cor").value;
        const quantidade = document.querySelector("#quantidade").value;

        const data = {
            "modelo_veiculo": modelo,
            "marca_veiculo": marca,
            "cor_veiculo": cor,
            "quantidade": quantidade
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }

        if (selectedEstoque && selectedEstoque.id_estoque) {
            axios.put(`https://api-carronamao.azurewebsites.net/api/Estoques?id=${selectedEstoque.id_estoque}`, data, { headers })
                .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                        return navigate("/Estoque");
                    }
                })
                .catch(error => {
                    alert(error.status);
                });
        } else {
            axios.post('https://api-carronamao.azurewebsites.net/api/Estoques', data, { headers })
                .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                        return navigate("/Estoque");
                    }
                })
                .catch(error => {
                    alert(error.status);
                });
        }
    }

    const handleEstoqueClick = (estoque) => {
        setSelectedEstoque(estoque);
        document.querySelector("#modelo").value = estoque.modelo_veiculo;
        document.querySelector("#marca").value = estoque.marca_veiculo;
        document.querySelector("#cor").value = estoque.cor_veiculo;
        document.querySelector("#quantidade").value = estoque.quantidade;
    }

    return (
        <>
        <Menu/>
        <section id="estoqueStyle">
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading"></div>
                </div>
            ) : (
            <>
                <div style={{ width: '25%', float: 'left'}}>
                    <div id="divListagem">
                        <ul>
                        {estoques.map(estoque => (
                                        <li key={estoque.id_estoque} onClick={() => handleEstoqueClick(estoque)}
                                        >{estoque.marca_veiculo}</li>
                                    ))}
                        </ul>
                    </div>
                </div>
                <div style={{ width: '75%', float: 'right' }}>
                    <div>
                        <button id="btnRegistro">Novo Registro</button>
                        <button id="btnGravar" onClick={estoque}>Gravar</button>
                    </div>
                    <div>
                        <label>Código Estoque</label>
                        <input type="text" id="estoque" placeholder="Código do Estoque"/>
                    </div>
                    <div>
                        <label>Modelo</label>
                        <input type="text" id="modelo" placeholder="Modelo Veículo"/>
                    </div>
                    <div>
                        <label>Marca</label>
                        <input type="text" id="marca" placeholder="Marca Veículo"/>
                    </div>
                    <div>
                        <label>Cor Veículo</label>
                        <input type="text" id="cor" placeholder="Cor do veículo"/>
                    </div>
                    <div>
                        <label>Quantidade</label>
                        <input type="number" id="quantidade" placeholder="Quantidade em estoque"/>
                    </div>
                    <div>
                        <label>Deseja excluir o estoque deste veículo?</label>
                        <button id="btnExcluir">Excluir</button>
                    </div>
                </div>
                </>
            )}
        </section>
        </>
    )
}

export default Estoque;