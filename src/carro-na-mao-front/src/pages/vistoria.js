import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import '..estilos/vistoria.css';

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
          return navigate("/home2")
        }
      }
      ).catch(error => {
        alert(error.status)
      })

  }

  return (
    <>
      <div >
                <div class="container2">
                    <div class="container">
                        <div class="container">
                            <img src="src/img/logo-carro-na-mao.png" alt="Logo Carro na Mão"></img>
                        </div>
                        <div class="container">
                            <div class="container5"><a href="/Home2">Página Inicial</a></div>
                            <div class="container5"><a href="/Cadastro">Cadastro Usúarios</a></div>
                            <div class="container5"><a href="/Vistoria">Vistoria</a></div>
                            <div class="container5"><a href="/Manutencao">Manutenção</a></div>
                            <div class="container5"><a href="/">Sair</a></div>
                        </div>
                    </div>
                </div>
            </div>

      <section>
      <div class="container">
          <div>
        <h3>Tela de realização de Vistoria de Veiculos</h3>
        </div>
        </div >
        <div class="container">
        <h5>Dados da Reserva e Vistoria:</h5>
        </div>


        <div >
          <div class="container">
            <label >ID do Veiculo:</label>
            <input type="text" id="veiculo" placeholder='3111' ></input>
            <p> </p>
          </div>
          <hr></hr>

          <div class="container">
            <label>Data da Vistoria:</label>
            <input type="date" id="date" placeholder='Data da Vistoria'></input>
            <p> </p>
          </div>
          <div class="container">
          <div class="container4">
            <label >Descrição da Vistoria:</label>
            <input type="text" id="descricao" placeholder='Descrição da Vistoria'></input>
            <p> </p>
          </div>
          </div>

          <div class="container">
          <div class="container4">
            <label>Observações da Vistoria:</label>
            <input type="text" id="observacoes" placeholder='Observações da Vistoria'></input>
            <p> </p>
          </div>
          </div>
          <hr></hr>

          <div class="container">
            <div class="container">
              <label>Criar Manutenção no sistema?:</label>
              <p></p>
              <div>
                <select id="manut">
                  <option value="true">Criar Manutenção</option>
                  <option value="false">Não Criar Manutenção</option>
                </select>
              </div>
            </div>

            <div class="container">
              <label>Tipo de Vistoria:</label>
              <p></p>
              <div>
                <select id="tipo">
                  <option value="0">Entrada de veiculo</option>
                  <option value="1">Saída de veiculo</option>
                </select>
              </div>
            </div>
          </div>


        </div>

        <hr></hr>
        <div class="container2">
          <div class="container">
            <button onClick={vistoriar}>Cadastrar Vistoria</button>
          </div>
          <br></br>
      <a href="javascript:history.back()">Voltar</a>
        </div>
      </section>
      
    </>

  );
}




export default Vistoria;