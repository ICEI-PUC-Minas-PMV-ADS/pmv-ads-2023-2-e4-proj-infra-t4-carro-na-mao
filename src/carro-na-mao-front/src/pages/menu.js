
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import '../estilos/Menu.css'
export function Menu (){

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

     return (

      <>
        <div id="menu">
        <Link to="/Home2">Home</Link>
        <Link to="/Reservas">Reservas</Link>
        <Link to="/Infracoes">Infrações</Link>
        <Link to="/Historico">Histórico</Link>
        <Link to="/Avaliacoes">Avaliações</Link>        
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Vistoria">Vistoria</Link>
        <Link to="/Arruma">ManutencaoTeste</Link>
        <Link to="/Localizacao">Localização</Link>
        <Link to="/Manutencao">Manutencao</Link>
        <Link to="/Notificacoes">Notificações</Link>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="Estoque">Estoque</option>
          <option value="Categoria">Categoria</option>
        </select>
        {selectedOption && (
          <Link to={`/${selectedOption}`}>{selectedOption}</Link>
        )}
        <Link to="/">Sair</Link>
        </div>
       </>

     );
}

