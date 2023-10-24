
import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import './manutencao.css';

function Manutencao() {
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

  const arrumar = () => {

    const veiculo = document.querySelector("#veiculo").value
    const date1 = document.querySelector("#date1").value
    const tipo = document.querySelector("#tipo").value
    const descricao = document.querySelector("#descricao").value
    const valor_nf = document.querySelector("#valor_nf").value
    const hora_oficina = document.querySelector("#hora_oficina").value
    const date2 = document.querySelector("#date2").value
    const id_vistoria = document.querySelector("#id_vistoria").value

    const data = {

      "id_veiculo": veiculo,
      "data_inicio": date1,
      "tipo": tipo,
      "descricao": descricao,
      "valor_nf": valor_nf,
      "hora_oficina": hora_oficina,
      "previsao_termino": date2,
      "id_vistoria": id_vistoria,
      "id_manutencao": "em branco"
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }

    axios.post('https://api-carronamao.azurewebsites.net/api/Manutencao', data, { headers })
      .then(response => {
        console.log(response.status)
        if (response.status === 200) {

          alert("Manutenção Inserida com Sucesso.");
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
            <h3 >Tela de lançamentos de Manutenções realizadas.</h3>
          </div>
        </div >
        <div class="container">
          <h5 >Dados do Veiculo e Manutenções:</h5>
        </div>

        <div>
          <div class="container">
            <div>
              <label>ID de Veiculo:</label>
              <input type="text" id="veiculo" placeholder='5211' ></input>
            </div>
            <div>
              <label>Tipo de Mnutenção:</label>
              <div>
                <select id="tipo">
                  <option value="0">Revisão em Garantia</option>
                  <option value="1">Sinistro</option>
                  <option value="2">Preventiva</option>
                  <option value="3">Reparo</option>
                  <option value="4">Parada Operacional/Reserva Tecnica</option>
                  <option value="5">Limpeza</option>
                </select>
              </div>
            </div>

          </div>
          <div class="container">
            <div class="container">
              <div>
                <label>Data Inicio Manutenção:</label>
                <input type="date" id="date1" placeholder='Data da Manutenção'></input>

              </div>
              <div>
                <label>Data Prevista Fim da Manutenção:</label>
                <input type="date" id="date2" placeholder='Data do Término da Manutenção'></input>

              </div>
              <div>
                <label>Horas de oficina previstas para a Manutenção:</label>
                <input type="text" id="hora_oficina" placeholder='Quantidade de horas de oficina na manutenção realizada'></input>

              </div>
            </div>

          </div>
          <div class="container">
       <div class="container4">
       <label>Descrição da Manutenção:</label>
          <input type="text" id="descricao" placeholder='Descrição da Manutenção'></input>
          <p> </p>
       </div>
       </div>

<div class="container">
<div class="container">
<label>ID da Vistoria:</label>
          <input type="text" id="id_vistoria" placeholder='3111' ></input>
          <p> </p>
<div class="container">
<label>Valores das Nota fiscal da Manutenção:</label>
          <input type="text" id="valor_nf" placeholder='Valor da Nota Fiscal da operação'></input>
          <p> </p>
</div>
</div>
</div>

          





         

         

        </div>

        <hr></hr>

        <div class="container2">
        <div class="container">
          <button onClick={arrumar}>Cadastrar Manutenção</button>
        </div>
        <br></br>
      <a href="javascript:history.back()">Voltar</a>
      </div>
      </section>
      
    </>
  );
}


export default Manutencao;
