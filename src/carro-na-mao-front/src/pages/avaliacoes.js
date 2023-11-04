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

  async function recuperarDadosLocal(){
    const dadosSalvos = localStorage.getItem('dados_user')
    setDados(JSON.parse(dadosSalvos))
}


function avaliar(){
  const observaceo = document.querySelector("#nome").value
  const nota = document.querySelector("#nota").value
  console.log(dados_user)
  const data= {
    "observaceo": observaceo,
    "nota": nota,
    "nomeUsaurio":dados_user.nome,
    "id_usuario": dados_user.id
  }
  const headers={
    "Content-Type":"application/json, text/plain, */*",
    "Authorization": 'Bearer ' + token
}
  axios.post('https://api-carronamao.azurewebsites.net/api/Avaliacao',data,{headers}).then(response=>{
    if(response.status==200){
      alert('ok')
    }
  }).catch(erro=>{
    alert(erro)
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
              <input type="text" id="nome" placeholder='Digite sua observação' ></input>
            </div>

            <div>
              <label>Nota:</label>
              <input type="text" id="nota" placeholder='Insira sua nota...' ></input>
            </div>

            <div>
              <label>E-mail:</label>
              <input type="text" id="email" placeholder='Insira seu e-mail...'></input>

              <label>Fone:</label>
              <input type="text" id="fone" placeholder='insira seu telefone...'></input>

        
            </div>

            <br></br>

            <div>
              <label>Observações:</label><br></br>
              <textarea class="msg"></textarea>
            </div>

            <br>
            </br>
o
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
