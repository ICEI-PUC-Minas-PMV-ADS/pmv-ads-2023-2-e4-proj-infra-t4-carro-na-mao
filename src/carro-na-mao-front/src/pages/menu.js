import { Link } from "react-router-dom";
import React, { useState } from 'react';
import '../estilos/Menu.css'
import { useNavigate } from 'react-router-dom';
//imports da funcionalidade notificcacao
import Apps from './Apps';

export function Menu (){

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
        <Link to="/Home2">Home</Link> 
        <Link to="/Locacao">Locação</Link>
        <Link to="/Localizacao">Localização</Link>    

        <select value={selectedOption} onChange={handleOptionChange}>
          <option>Acesso Restrito</option>
          <option value="Categoria">Categoria</option>
          <option value="Estoque">Estoque</option>
          <option value="Categoria">Categoria</option>
          <option value="Vistoria">Cadastrar Vistorias</option>
          <option value="Vistoria2">Consultar Vistorias</option>
          <option value="Manutencao">Manutenção</option>
          <option value="Notificacoes">Notificações</option>
          <option value="dashboard">Dashboard</option>
          <option value="Avaliacoes">Avaliações</option>         
        </select>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option>Minha Conta</option>
          <option value="Historico">Histórico</option>
          <option value="Infracoes">Infrações</option>  
          <option value="Notificacoes">Notificações</option>
          <option value="Avaliacoes">Avaliações</option>
               
        </select>
        <Apps />
        <Link to="/">Sair</Link>
        </div>
       </>

     );
}