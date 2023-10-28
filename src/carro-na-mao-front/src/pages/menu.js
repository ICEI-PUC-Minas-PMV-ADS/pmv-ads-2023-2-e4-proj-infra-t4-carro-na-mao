
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import '../estilos/Menu.css'
import { useNavigate } from 'react-router-dom';
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
        <Link to="/Reservas">Reservas</Link>
        <Link to="/Infracoes">Infrações</Link>
        <Link to="/Historico">Histórico</Link>
        <Link to="/Avaliacoes">Avaliações</Link>        
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Locacao">Locacao</Link>
        <Link to="/Vistoria">Vistoria</Link>
        <Link to="/Arruma">ManutencaoTeste</Link>
        <Link to="/Localizacao">Localização</Link>
        <Link to="/Manutencao">Manutencao</Link>
        <Link to="/Notificacoes">Notificações</Link>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option>Adm</option>
          <option value="Estoque">Estoque</option>
          <option value="Categoria">Categoria</option>
        </select>
        <Link to="/">Sair</Link>
        </div>
       </>

     );
}

