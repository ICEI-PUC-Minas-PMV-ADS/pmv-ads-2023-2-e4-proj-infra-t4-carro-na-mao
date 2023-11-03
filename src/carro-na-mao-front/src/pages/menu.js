import { Link } from "react-router-dom";
import React, { useState } from 'react';
import imagem from '../img/logo3.png'
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
      <div id="menu">

        <a href="/Home2">
          <img src={imagem} alt="Imagem" />          
        </a>
       
        <Link to="/Locacao">Locação</Link>
        <Link to="/Localizacao">Localização</Link>

        <select value={selectedOption} onChange={handleOptionChange}>
          <option>Acesso Restrito</option>
          <option value="Categoria">Categorias</option>
          <option value="Estoque">Estoque</option>
          <option value="Vistoria">Cadastrar Vistoria</option>
          <option value="Vistoria2">Consultar Vistorias</option>
          <option value="Manutencao">Manutenções</option>
          <option value="Notificacoes">Notificações  - Validar se Permanece</option>
          <option value="dashboard">Dashboard</option>
          <option value="Avaliacoes">Avaliações</option>
          <option value="Localizacao">Localização - Validar se Permanece</option>
        </select>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option>Minha Conta</option>
          <option value="Historico">Histórico</option>
          <option value="Infracoes">Infrações</option>
          <option value="Notificacoes">Notificações  - Validar se Permanece</option>
          <option value="Avaliacoes">Avaliações</option>

        </select>
        <Apps />
        <Link to="/">Sair</Link>
      </div>
    </>

  );
}