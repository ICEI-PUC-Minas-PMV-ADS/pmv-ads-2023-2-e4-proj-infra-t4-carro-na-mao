import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/manutencao.css';

function Historico() {
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

    const valores = document.querySelector("#valores").value



    const data = {

      "valores": valores,
     

    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }

    axios.post('https://api-carronamao.azurewebsites.net/api/Historico', data, { headers })
      .then(response => {
        console.log(response.status)
        if (response.status === 200) {

          alert("Historico Resgatado com Sucesso.");
          return navigate("/Historico")
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
          <h5 >Historico do Cliente:</h5>
        </div>

        <div>
          <div class="container">
            <div>
              <label>Valor:</label>
              <input type="text" id="valores" placeholder='0,00' ></input>
            </div>

          </div>
        </div>



        <hr></hr>

        
          <div >
            <button id="btnCadastrar" onClick={arrumar}>Ver Histórico</button>
          </div>
          <br></br>
          <a href="javascript:history.back()">Voltar</a>
        
      </section>

    </>
  );
}


export default Historico;
