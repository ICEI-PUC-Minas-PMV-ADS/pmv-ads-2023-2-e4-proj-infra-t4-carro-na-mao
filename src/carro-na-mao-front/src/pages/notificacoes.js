import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
import NovuBell from "../component/NovuBell";
import "../estilos/App.css";

function Notificacoes() {
  const [status, setStatus] = useState(); // status of passed/failed notificaiton

  const sendNotification = async () => {
    await axios
      .post("http://localhost:8000", {
        subscriberId: `${process.env.REACT_APP_SUBSCRIBER_ID}`,
      })
      .then((res) => {
        setStatus(res.status);
      });
  };


  return (
    <div id="fundoAvaliacao1">
    <>
      <Menu />

      <section>
      <div className="App">
      <div className="NavBar">
        <br/>
        <h1>Workflow de Notificações:</h1>
        <h1>InApp & E-mail</h1>
        <br/>
      </div>      
      <button onClick={sendNotification}>Enviar Notificação</button>
      {status === 201 && <h1><br/>Notificação enviada!</h1>}
      {status === 400 && <h1>Erro ao enviar notificação =/</h1>}
    </div>

       
        
      </section>

    </>
    </div>
  );
}


export default Notificacoes;
