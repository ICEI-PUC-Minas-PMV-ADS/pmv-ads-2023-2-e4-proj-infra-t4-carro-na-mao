import axios from 'axios';

import { useEffect, useState } from 'react';
import { Menu } from './menu';

function Home2() {

    return (
        <>

            <div >
                <div class="container2">
                    <div class="container">
                        <div class="container">
                            <img src="src/img/logo-carro-na-mao.png" alt="Logo Carro na Mão"></img>
                        </div>
                        <div class="container">

                            <div class="container5"><a href="/Home2">Página Inicial</a></div>
                            <div class="container5"><a href="/Cadastro">Cadastro Usúarios</a></div>
                            <div class="container5"><a href="/Vistoria">Vistoria</a></div>
                            <div class="container5"><a href="/Manutencao">Manutenção</a></div>
                            <div class="container5"><a href="/">Sair</a></div>
                        </div>
                    </div>
                </div>
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
        </>
    );
}

export default Home2;