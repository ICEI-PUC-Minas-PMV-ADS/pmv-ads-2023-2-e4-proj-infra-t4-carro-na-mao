import { Link } from "react-router-dom";
import React, { useState } from 'react';
import '../estilos/Menu.css'
import { useNavigate } from 'react-router-dom';
//imports da funcionalidade notificcacao
import Apps from './Apps';

export function Menu() {

  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    navigate(`/${value}`); // Navegar para a página correspondente
  };

  return (

    <>
      <nav class="drop-menu">
        <ul>
          <li><a href="#">Menu</a>
            <ul>
              <li><Link to="/Home2">Home</Link></li>
              <li><Link to="/Dashboard">Dashboard</Link></li>
              <li><Link to="/Locacao">Alugar</Link></li>
              <li><Link to="/avaliacoes">Avaliações</Link></li>
              <li><Link to="/Vistoria">Cadastrar Vistoria</Link></li>
              <li><Link to="/Vistoria2">Consultar Vistorias</Link></li>
              <li><Link to="/Localizacao">Localização</Link></li>
              <li><Link to="/Manutencao">Manutencão</Link></li>
              <li><Link to="/Infracoes">Infrações</Link></li>
              <li><Link to="/Historico">Histórico</Link></li>
              <li><Link to="/Notificacoes">Notificações</Link></li>
            </ul>
          </li>
          
          <Apps />

          <li id="sairButton"><Link to="/">Sair</Link></li>

          <li id="selectAdm">
            <a href="#">Adm</a>
            
            <ul>
              <li><Link to="/Estoque">Estoque</Link></li>
              <li><Link to="/Categoria">Categoria</Link></li>
            </ul>

          </li>
        </ul>
      </nav>
    </>

  );
}