import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/historico.css';
import { FiSearch} from 'react-icons/fi';

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

  const Historico = () => {

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
        <div className="containerh1">
          <div>
            <h3 >Historico de suas locações</h3>
          </div>
        </div >
        <div className="containerh2">
          <h5 >Historico do Cliente:</h5>
        </div>

        <div>
          <div className="containerh3">
            <div>
              <label>Numero de contrato</label>
              <input type="text" id_historico="Numenro do contrato"
               placeholder='' >
 
               </input>
            </div>
            <div >
            <button className="buttonSearch">
            <FiSearch size={25} color='#fff'/>
             </button>
          </div>
          </div>
        </div>



        <hr></hr>

        
        
          <br></br>
         
          
          <a href="javascript:history.back()">Voltar</a>
          <a href="javascript:history.back()">Voltar</a>
        
      </section>
      <main className= "main">
        <h2>Numero do contrato: 00005</h2>

        <span>data devolução: 20/10/2023</span>
        <span>Veículo: Etios</span>
        <span>Valor da locação: R$1200,00</span>
        <span>Observação:       </span>

      </main>

    </>
  );
}


export default Historico;
