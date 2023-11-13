import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/manutencao.css';

function Notificacoes() {
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

  const notificar = () => {

    const assunto = document.querySelector("#assunto").value



    const data = {

      "assunto": assunto,
      "corpomensagem": "string"
     

    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }

    axios.post('https://api-carronamao.azurewebsites.net/api/Notificacao/Enviar%20Notificacao', data, { headers })
      .then(response => {
        console.log(response.status)
        if (response.status === 200) {

          alert("Notificação Registrada com Sucesso.");
          return navigate("/Notificacoes")
        }
      }
      ).catch(error => {
        alert("Ops, encontramos um problema!");
      })

  }

  return (
    <>
      <Menu />

      <section>
        <div class="container">
          <div>
            <h3 >Tela de lançamentos Modelo</h3>
          </div>
        </div >
        <div class="container">
          <h5 >Dados da notificação:</h5>
        </div>

        <div>
          <div class="container">
            <div>
              <label>Registrar:</label>
              <input type="text" id="assunto" placeholder='insira a mensagem' ></input>
            </div>

          </div>
        </div>



        <hr></hr>

        
          <div >
            <button id="btnCadastrar" onClick={notificar}>Enviar Notificação</button>
          </div>
          <br></br>
          <a href="javascript:history.back()">Voltar</a>
        
      </section>

    </>
  );
}


export default Notificacoes;
