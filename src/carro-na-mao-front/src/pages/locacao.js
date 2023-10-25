import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate,Link } from 'react-router-dom';
import{Menu} from './menu';


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
        const horaRetirada = document.querySelector("#horaRetirada").value
        const horaEntrega = document.querySelector('#horaEntrega').value
        const valor = document.querySelector("#valorCategoria").value
        const custosAd = document.querySelector("#custosAd").value
        const dataRetirada = document.querySelector("#dataRetirada").value
        const dataEntrega = document.querySelector("#dataEntrega").value
        
        const data = {
                "id_local": local,
                "id_categoria": categoria,
                "modelo_veiculo": modelo,
                "hora_retirada": horaRetirada,
                "hora_entrega": horaEntrega,
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
                     return navigate("/Locacao")
                  }
                }
                ).catch(error => {
                  alert(error.status)
              })
            }

            
     return(
        <>
        <Menu/>
        <section>
    <input type="text" id="localRetirada" placeholder='Escolha o Local'></input>
    <input type="text" id="categoriaRetirada" placeholder='Escolha a Categoria' ></input>
    <input type="text" id="modeloRetirada" placeholder='Escolha o Modelo'></input>
    <input type="text" id="horaRetirada" placeholder='Selecione a hora da retirada'></input>
    <input type="text" id="horaEntrega" placeholder='Selecione a hora da entrega'></input>
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