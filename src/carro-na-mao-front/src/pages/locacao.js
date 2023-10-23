import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate,Link } from 'react-router-dom'


function Locacao() {
    const navigate = useNavigate()
    const [token,setToken]=useState(null)
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

    const reservar =()=>{
        const local = document.querySelector('#localRetirada').value
        const categoria = document.querySelector('#categoriaRetirada').value
        const modelo = document.querySelector('#modeloRetirada').value
        const corVeiculo = document.querySelector("#corVeiculo").value
        const valor = document.querySelector("#valorCategoria").value
        const custosAd = document.querySelector("#custosAd").value
        const dataRetirada = document.querySelector("#dataRetirada").value
        const dataEntrega = document.querySelector("#dataEntrega").value
        
        const data = {
                "id_local": local,
                "id_categoria": categoria,
                "modelo_veiculo": modelo,
                "cor_veiculo": corVeiculo,
                "vl_categoria": valor,
                "custos_ad": custosAd,
                "data_retirada": dataRetirada,
                "data_entrega": dataEntrega
             }
             const headers ={
                "Content-Type":"application/json",
                "Authorization": 'Bearer ' + token
               } 
           
               axios.post('https://api-carronamao.azurewebsites.net/api/Locacao',data,{headers})
              .then(response =>{
                  console.log(response.status)
                  if(response.status===200){
                      alert('Reserva Cadastrada com sucesso')
                     return navigate("/")
                  }
                }
                ).catch(error => {
                  alert(error.status)
              })
            }

            
     return(
        <>
        <section>
    <input type="text" id="localRetirada" placeholder='Escolha o Local'></input>
    <input type="text" id="categoriaRetirada" placeholder='Escolha a Categoria' ></input>
    <input type="text" id="modeloRetirada" placeholder='Escolha o Modelo'></input>
    <input type="text" id="corVeiculo" placeholder='Selecione a Cor'></input>
    <input type="number" id="valorCategoria" placeholder='Valor'></input>
    <input type="number" id="custosAd" placeholder='Adicionais'></input>
    <input type="date" id="dataRetirada" placeholder='Selecione a data de retirada'></input>
    <input type="date" id="dataEntrega" placeholder='Selecione a data de entrega'></input>

        <div>
        <button onClick={reservar}>Reservar</button>                
        </div>
    </section>
    </>
    )
}


export default Locacao;