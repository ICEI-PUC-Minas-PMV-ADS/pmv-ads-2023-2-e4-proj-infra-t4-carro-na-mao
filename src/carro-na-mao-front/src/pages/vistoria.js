import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/vistoria.css';

function Vistoria() {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
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

  const vistoriar = () => {
    
   const veiculo = document.querySelector("#veiculo").value
   const tipo = document.querySelector("#tipo").value
   const date = document.querySelector("#date").value
   const descricao = document.querySelector("#descricao").value
   const observacoes = document.querySelector("#observacoes").value
   const manut = document.querySelector("#manut").value === "true";
   

    const data = {
      
      "id_veiculo": veiculo,
      "tipo": tipo,
      "data_vistoria": date,
      "descricao": descricao,
      "observacoes": observacoes,
      "cria_ordem_manut": manut

    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }

    axios.post('https://api-carronamao.azurewebsites.net/api/Vistorias', data, { headers })
      .then(response => {
        console.log(response.status)
        if (response.status === 200) {

          return navigate("/Vistoria")
        }
      }
      ).catch(error => {
        alert(error.status)
      })

  }

  return (
    <>
      <section>
        <h3>Tela de realização de Vistoria de Veiculos</h3>
        <h5>Dados da Reserva e Vistoria:</h5>

       
        
        <div>
          
          <label>ID de Veiculo:</label>
          <input type="text" id="veiculo" placeholder='3111' ></input>
          <p> </p>

          <label>Data da Vistoria:</label>
          <input type="date" id="date" placeholder='Data da Vistoria'></input>
          <p> </p>
          <label>Descrição da Vistoria:</label>
          <input type="text" id="descricao" placeholder='Descrição da Vistoria'></input>
          <p> </p>
          <label>Observações da Vistoria:</label>
          <input type="text" id="observacoes" placeholder='Observações da Vistoria'></input>
          <p> </p>
        </div>

        <label>Cria Manutenção/Sinistro no sistema?:</label>
        <div>
          <select id="manut">
            <option value="true">Criar Manut</option>
            <option value="false">Não Criar Manut</option>
          </select>
        </div>
        <label>Tipo de Vistoria:</label>
        <div>
          <select id="tipo">
            <option value="0">Entrada</option>
            <option value="1">Saída</option>
          </select>
        </div>

        <hr></hr>

        <div>
          <button onClick={vistoriar}>Cadastrar Vistoria</button>
        </div>
  
      </section>
    </>
  );
}


export default Vistoria;