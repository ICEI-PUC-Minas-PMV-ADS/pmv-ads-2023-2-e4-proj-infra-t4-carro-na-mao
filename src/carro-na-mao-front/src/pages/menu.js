
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import '../estilos/Menu.css'
import { useNavigate } from 'react-router-dom';
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
      <nav id="menu">
        <Link to="/Home2">Home</Link>
        <Link to="/visualizarAvaliacao">Avaliações</Link>
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Locacao">Alugar</Link>
        <Link to="/Vistoria">Cadastrar Vistorias</Link>
        <Link to="/Vistoria2">Consultar Vistorias</Link>
        <Link to="/Localizacao">Localizações</Link>
        <Link to="/Manutencao">Manutenções</Link>
        <Link to="/Notificacoes">Notificações</Link>
        <Link to="/Estoque">Estoques</Link>
        <Link to="/Categoria">Categorias</Link>
        <Apps />

        <Link id="sairButton" to="/">Sair</Link>

      </nav>

    </>

  );
}