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

          alert("Ops, encontramos um problema, campos incorretos, tente novamente!");
          return navigate("/Avaliacoes")
        }
      }
      ).catch(error => {
        alert("Ops, encontramos um problema, campos incorretos, tente novamente!");
      })

  }

  return (
    <>
      <Menu />

      <section>
        <div class="container-1">
          <div>
            <h3 >Deseja saber sobre a sua Locação? Acesse a aba Reservas.</h3>
          </div>

        </div >

        <div>
          <div class="container-2">
            <h4>Envie sua mensagem, Reclamação ou Sugestão:</h4>
            <div>
              <label>Nome:</label>
              <input type="text" id="nome" placeholder='Insira seu nome...' ></input>
            </div>

            <div>
              <label>Sobrenome:</label>
              <input type="text" id="sobrenome" placeholder='Insira seu sobrenome...' ></input>
            </div>

            <div>
              <label>E-mail:</label>
              <input type="text" id="email" placeholder='Insira seu e-mail...' ></input>

              <label>Fone:</label>
              <input type="text" id="fone" placeholder='insira seu telefone...' ></input>

              <label>Data:</label>
              <input type="date" id="date" placeholder=''></input>
            </div>
            <br>
            </br>
            <div>
              <label>Observações:</label><br></br>
              <textarea class="msg"></textarea>
            </div>

            <br>
            </br>

            <div>
              <button id="btnCadastrar" onClick={avaliar}>Enviar Avaliação</button>

              <button id='btnVoltar'> <a href="javascript:history.back()">Voltar</a> </button>
            </div>

          </div>
        </div>


      </section>

    </>
  );
}


export default Avaliacoes;
