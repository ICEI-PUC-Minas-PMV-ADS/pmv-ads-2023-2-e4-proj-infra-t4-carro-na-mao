import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
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

          alert("Vistoria Inserida com Sucesso.");
          return navigate("/Vistoria")
        }
      }
      ).catch(error => {
        alert("Ops, encontramos um problema!");
      })

  }

  return (
    <div id="fundoVistoria">
      <Menu />

      <section id="camposVistoria">
                
        <div id="camposParaLoginParteUmVistoria">

        <h3 id="tituloVistoria1">Tela de realização de Vistoria de Veiculos</h3>
        <h5 id="tituloVistoria2" >Dados da Reserva e Vistoria:</h5>

          <label >ID do Veiculo: </label>
          <input type="text" id="veiculo" placeholder='3111' ></input>
          <label>Data da Vistoria:</label>
          <input type="date" id="date" placeholder='Data da Vistoria'></input>
          <label>Tipo de Vistoria:</label>
          <select id="tipo">
            <option value="0">Retorno de veiculo</option>
            <option value="1">Saída de veiculo</option>
          </select>
    
        <h5 id="tituloVistoria3">Detalhamento da Vistoria:</h5>
     
          <label >Descrição da Vistoria:</label>
          <input type="text" id="descricao" placeholder='Descrição da Vistoria'></input>
          <label>Observações da Vistoria:</label>
          <input type="text" id="observacoes" placeholder='Observações da Vistoria'></input>

          <label>Criar Manutenção no sistema?:</label>
          <select id="manut">
            <option value="true">Criar Manutenção</option>
            <option value="false">Não Criar Manutenção</option>
          </select>
     
        </div>

      </section>

      <section>

        <div >
          <button id="btnCadastrarVistoria" onClick={vistoriar}>Cadastrar Vistoria</button>
        </div>
        <button id='btnVoltarVistoria'> <a href="javascript:history.back()">Voltar</a> </button>

      </section>
    </div>
  );
}


export default Vistoria;