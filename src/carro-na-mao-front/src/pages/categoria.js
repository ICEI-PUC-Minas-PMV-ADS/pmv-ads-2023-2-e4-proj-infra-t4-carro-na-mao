import axios from "axios";
import React, {Component} from "react";
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import{Menu} from './menu';
import '../estilos/categoria.css'


function Categoria() {
    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try{
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);
                
                const response = await axios.get('https://api-carronamao.azurewebsites.net/api/Categorias', {
                    headers: {
                        "Authorization": 'Bearer ' + jwtToken
                    }
                });
                setCategorias(response.data)

            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()
    }, []);

    const categoria = () => {

        const valor = document.querySelector("#valor").value
        const descricao = document.querySelector("#descricao").value
        const promocao = document.querySelector("#promocao").value  == true;

        const data = {
            "desc_categoria": descricao,
            "vl_categoria": valor,
            "ind_promocao": promocao
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }

        axios.post('https://api-carronamao.azurewebsites.net/api/Categorias', data, {headers})
        .then(response => {
            console.log(response.status)
            if(response.status == 200){
                return navigate("/Categoria")
            }
        }
        ).catch(error => {
            alert(error.status)
        
        })

    }

    const excluir = () => {

        const categoria = document.querySelector("#categoria").value

        const data = {
            "id": categoria
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }

        axios.delete('https://api-carronamao.azurewebsites.net/api/Categorias', data, {headers})
        .then(response => {
            console.log(response.status)
            if(response.status == 200){
                return navigate("/Categoria")
            }
        }
        ).catch(error => {
            alert(error.status)
        
        })
        
    }

    const limparCampos = () => {
        document.querySelector("#categoria").value = ""
        document.querySelector("#valor").value = ""
        document.querySelector("#descricao").value = ""
        document.querySelector("#promocao").value = ""
    }

    return(
        <>
        <Menu/>
        <section id="categoriaStyle">
            <div style={{ width: '25%', float: 'left'}}>
                <div id="divListagem">
                    {/* Renderizar a lista de categorias aqui */}
                    <ul>
                        {categorias.map(categoria => (
                            <li key={categoria.id_categoria}>{categoria.desc_categoria}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={{ width: '75%', float: 'right' }}>
                <div>
                    <button id="btnRegistro" onClick={limparCampos}>Novo Registro</button>
                </div>
                <br/>
                <div>
                    <label>Código Categoria</label>
                    <input className="input" type="text" id="categoria" placeholder="Código do Categoria"/>
                </div>
                <br/>
                <div>
                    <label>Valor da Categoria</label>
                    <input className="input" type="text" id="valor" placeholder="R$50/dia"/>
                </div>
                <br/>
                <div>
                    <label>Descrição Categoria</label>
                    <input className="input" type="text" id="descricao" placeholder="Insira a descrição"/>
                </div>
                <br/>
                <div>
                    <label>Indica Promoção</label>
                    <input type="checkbox" id="promocao"/>
                </div>
                <br/>
                <br/>
                <div>
                    <label>Deseja excluir o estoque deste veículo?</label>
                    <button id="btnExcluir" onClick={excluir}>Excluir</button>
                </div>
                <br/>
                <br/>
                <div>
                    <button id="btnGravar" onClick={categoria}>Gravar</button>
                </div>
            </div>
        </section>
        </>
    )
}

export default Categoria;