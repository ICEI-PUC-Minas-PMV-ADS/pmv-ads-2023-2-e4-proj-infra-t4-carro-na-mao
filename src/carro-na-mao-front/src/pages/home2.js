import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';

import { Menu } from './menu';
import '../estilos/manutencao.css';

function Home2() {
  
  return (
    <>
      <Menu />

      <section>
        <div class="container">
          <div>
            <h3 >Seja bem vindo!</h3>
          </div>
        </div >
        <div class="container">
          <h5 >Sistema ativo</h5>
        </div>
        <div class="container">
                <div class="container2">
                    <p>Olá, seja bem vindo ao sistema!

                        Se está lendo esta mensagem, o seu login está ativo e sua sessão segura foi iniciada corretamente.

                        Duvidas entre em contato com o suporte da Carro na Mão!

                        31-99999-9999 ou suporte@carronamao.com.br
                    </p>
                </div>
            </div>

        
      </section>

    </>
  );
}


export default Home2;
