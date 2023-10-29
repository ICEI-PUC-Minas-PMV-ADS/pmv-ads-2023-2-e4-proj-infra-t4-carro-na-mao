import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/manutencao.css';

function Reservas() {
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

  const reservar = () => {

    const id_local = document.querySelector("#id_local").value



    const data = {

      "id_local": id_local,
      "id_locacao": "string",
      "id_veiculo": "string",
      "id_local": "string",
      "ind_retirado": true


    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }

    axios.post('https://api-carronamao.azurewebsites.net/api/Retiradas', data, { headers })
      .then(response => {
        console.log(response.status)
        if (response.status === 200) {

          alert("Reserva Registrada com Sucesso.");
          return navigate("/Reservas")
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
          <h5 >Dados da Reserva:</h5>
        </div>

        <div>
          <div class="container">
            <div>
              <label>Valor:</label>
              <input type="text" id="id_local" placeholder='insira aqui' ></input>
            </div>

          </div>
        </div>



        <hr></hr>


        <div >
          <button id="btnCadastrar" onClick={reservar}>Cadastrar Reserva</button>
        </div>
        <br></br>
        <a href="javascript:history.back()">Voltar</a>

      </section>

    </>
  );
}


export default Reservas;
