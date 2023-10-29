import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import imagem from  '../img/logo.png'
import { Menu } from './menu';
import { useNavigate,Link } from 'react-router-dom'
import '../estilos/home2.css'

function Home2() {
  
  return (
    <>
      <Menu style="background-color: transparent;"/>
      <section id="parteum">
        <h1>Seja bem vindo ao Carro na <spam>mão</spam>!</h1>
        <p>Sua plataforma rápida e descomplicada para voçê escolher o que mais te agrada. Como podemos te ajudar ?</p>
        <Link className="botoesHome2"id="redirecinarAlocacao"to="/Locacao">Alugar</Link>
        <Link className="botoesHome2"id="rediriecionarVistoria"to="/Vistoria2">Acopanhar Vistoria</Link>      
      </section>
      <section id="partedois">
        <img src={imagem}></img>
      </section>

    </>
  );
}


export default Home2;
