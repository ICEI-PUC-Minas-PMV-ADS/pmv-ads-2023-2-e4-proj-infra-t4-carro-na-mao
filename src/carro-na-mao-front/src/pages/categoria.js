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
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategoria, setSelectedCategoria] = useState(null);

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
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()
    }, []);

    const categoria = () => {
        const valor = document.querySelector("#valor").value;
        const descricaoCategoria = document.querySelector("#descricaoCategoria").value;
        const promocaoCategoria = document.querySelector("#promocaoCategoria").checked;

        const data = {
            "desc_categoria": descricaoCategoria,
            "vl_categoria": valor,
            "ind_promocao": promocaoCategoria
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }

        if (selectedCategoria && selectedCategoria.id_categoria) {
            axios.put(`https://api-carronamao.azurewebsites.net/api/Categorias?id=${selectedCategoria.id_categoria}`, data, { headers })
                .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                        alert("Categoria Atualizada!");
                    }
                })
                .catch(error => {
                    alert(error.status);
                });
        } else {
            axios.post('https://api-carronamao.azurewebsites.net/api/Categorias', data, { headers })
                .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                        alert("Categoria Cadastrada!");
                    }
                })
                .catch(error => {
                    alert(error.status);
                });
        }
    }

    const excluir = () => {

        const categoria = document.querySelector("#categoriaCategoria").value

        const data = {
            "id": categoria
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }

        if (selectedCategoria && selectedCategoria.id_categoria) {
            axios.delete(`https://api-carronamao.azurewebsites.net/api/Categorias?id=${selectedCategoria.id_categoria}`, data, {headers})
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
        
    }

    const limparCampos = () => {
        document.querySelector("#categoriaCategoria").value = ""
        document.querySelector("#valor").value = ""
        document.querySelector("#descricaoCategoria").value = ""
        document.querySelector("#promocaoCategoria").value = ""
    }

    const handleCategoriaClick = (categoria) => {
        setSelectedCategoria(categoria);
        document.querySelector("#categoriaCategoria").value = categoria.id_categoria;
        document.querySelector("#valor").value = categoria.vl_categoria;
        document.querySelector("#descricaoCategoria").value = categoria.desc_categoria;
        document.querySelector("#promocaoCategoria").value = categoria.ind_promocao;
    }

    return(
        <>
        <Menu/>
        <section id="categoriaStyle">
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading"></div>
                </div>
            ) : (
                 <>
                 <div style={{ width: '25%', float: 'left' }}>
                            <div id="divListagem">
                                <ul>
                                    {categorias.map(categoria => (
                                        <li key={categoria.id_categoria} onClick={() => handleCategoriaClick(categoria)}
                                        >{categoria.desc_categoria}</li>
                                    ))}
                                </ul>
                            </div>
                </div>
                        <div id="camposCategoria">
                                <div>
                                    <button id="btnRegistro" onClick={limparCampos}>Novo Registro</button>
                                </div>
                                <div>
                                    <label>Código Categoria</label>
                                    <input  type="text" id="categoriaCategoria" placeholder="Código do Categoria" readOnly />
                                </div>
                                <div>
                                    <label>Valor da Categoria</label>
                                    <input type="text" id="valor" placeholder="R$50/dia" />
                                </div>
                                <div>
                                    <label>Descrição Categoria</label>
                                    <input type="text" id="descricaoCategoria" placeholder="Insira a descrição" />
                                </div>
                                <div>
                                    <label>Indica Promoção</label>
                                    <input type="checkbox" id="promocaoCategoria" />
                                </div>
                                <br />
                                <br />
                                <div>
                                    <label>Deseja excluir o estoque deste veículo?</label>
                                    <button id="btnExcluir" onClick={excluir}>Excluir</button>
                                </div>
                                <br />
                                <br />
                                <div>
                                    <button id="btnGravar" onClick={categoria}>Gravar</button>
                                </div>
                            </div></>
            )}
           
        </section>
        </>
    )
}

export default Categoria;