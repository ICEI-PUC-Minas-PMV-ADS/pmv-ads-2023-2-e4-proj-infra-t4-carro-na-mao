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
  const [dados_user,setDados] = useState([])
 
  useEffect(() => {
    async function fetchData() {
      try {
        const jwtToken = await RecuperaToken();
        setToken(jwtToken);
        recuperarDadosLocal()
      } catch (error) {
        console.error('Erro ao recuperar token:', error);
      }
    }
    fetchData()
  }, []);

  const avaliar = () => {
    const nome = document.querySelector("#nome").value
    const nota = document.querySelector("#nota").value

    const data = {
      "observaceo": nome,
      "nota": nota,
      "nomeUsaurio":dados_user.nome,
      "id_usuario": dados_user.id
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
        alert("Ops, encontramos um problema, campos incorretos, tente novamente!");
      })

  }

 async function recuperarDadosLocal(){
    const dadosSalvos = await localStorage.getItem('dados_user')
    setDados(JSON.parse(dadosSalvos))
  }

  return (
    <>
      <Menu />
      <section id="conteudoPagina">
        <div class="container-1">
          <div>
            <h3 id="tituloPagAvaliacao">Deseja saber sobre a sua Locação? Acesse a aba Reservas.</h3>
           </div>
         </div >
          <div>
            <div class="container-2">
              <h4>Envie sua mensagem, Reclamação ou Sugestão:</h4>
              <div>
                <label>Observação:</label>
                <input type="text" id="nome" placeholder='Insira sua reclação...' ></input>
              </div>
              <div>
                <label>=Nota:</label>
                <input type="text" id="nota" placeholder='Insira sua nota de atendimento...' ></input>
              </div>
              <div>
                <label>E-mail:</label>
                <input type="text" id="email" placeholder='Insira seu e-mail...' ></input>
                <label>Fone:</label>
                <input type="text" id="fone" placeholder='insira seu telefone...' ></input>
                <label>Data:</label>
                <input type="date" id="date" placeholder=''></input>
              </div>
              <br/>
            <br/>
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
