import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/avaliacoes.css';

function Avaliacoes() {
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

  const avaliar = () => {

    const nome = document.querySelector("#nome").value



    const data = {

      "nome": nome,


    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }

    axios.post('https://api-carronamao.azurewebsites.net/api/Avaliacao', data, { headers })
      .then(response => {
        console.log(response.status)
        if (response.status === 200) {

          alert("Agradecemos o seu feedback, sua avaliação foi Registrada com Sucesso!");
          return navigate("/Avaliacoes")
        }
      }
      ).catch(error => {
        alert("Ops, encontramos um problema, algo está incorreto, tente novamente!");
      })

  }

  return (
    <>
      <Menu />

      <section>
        <div class="container-1">
          <div>
            <h3 >Deseja saber sobre a sua locação? Acesse a aba Reservas.</h3>
          </div>

        </div >
        <div class="container-1">
          <h4>Envie sua mensagem:</h4>
        </div>

        <div>
          <div class="container-2">
            <div>
              <label>Nome:</label>
              <input class="imputt" type="text" id="nome" placeholder='insira seu nome...' ></input>
            </div>

            <div>
              <label>Sobrenome:</label>
              <input class="imputt" type="text" id="nome" placeholder='insira seu sobrenome...' ></input>
            </div>

            <div>
              <label>E-mail:</label>
              <input type="text" id="e-mail" placeholder='insira seu e-mail...' ></input>
            </div>

            <div>
              <label>Fone:</label>
              <input type="text" id="fone" placeholder='insira seu telefone...' ></input>
            </div>

            <br></br>

            <div>
              <label>Observações:</label><br></br>
              <textarea class="msg" cols="100" rows="5"></textarea>
            </div>

          </div>
        </div>



        <hr></hr>


        <div >
          <button id="btnCadastrar" onClick={avaliar}>Enviar Avaliação</button>
        </div>
        <br></br>
        <a href="javascript:history.back()">Voltar</a>

      </section>

    </>
  );
}


export default Avaliacoes;
