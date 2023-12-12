
import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import imagem from  '../img/logo2.png'
import { Menu } from './menu';
import { useNavigate,Link } from 'react-router-dom'
import '../estilos/home2.css'

function Home2() {
  
  return (
    <div id="fundoHome2">
      <Menu style="background-color: transparent;"/>
      <section id="parteum">
        <h1>Seja bem-vindo ao Carro na <spam>mão</spam>!</h1>
        <p>Sua plataforma rápida e descomplicada para você escolher o que mais te agrada. Como podemos te ajudar?</p>
        <Link className="botoesHome2"id="redirecinarAlocacao"to="/Locacao">Alugar Veículos</Link>
        <Link className="botoesHome2"id="rediriecionarVistoria"to="/Vistoria2">Acompanhar Vistorias</Link>  
      </section>
     
      <section id="partedois">
        <img id= "logoHome2"src={imagem}></img>
      </section>
      
     </div>
  );
}


export default Home2;
