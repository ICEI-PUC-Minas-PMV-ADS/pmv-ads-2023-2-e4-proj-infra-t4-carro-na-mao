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
        <nav class= "drop-menu">
          <ul>
          <li><a href="#">Menu</a>
          <ul>
          <li><Link to="/Home2">Home</Link></li>        
          <li><Link to="/Dashboard">Dashboard</Link></li>
          <li><Link to="/Locacao">Alugar</Link></li>
          <li><Link to="/Vistoria">Cadastrar Vistoria</Link></li>
          <li><Link to="/Vistoria2">Consultar Vistorias</Link></li>  
          <li><Link to="/Localizacao">Localização</Link></li>   
          <li><Link to="/Manutencao">Manutencao</Link></li>
          <li><Link to="/Infracoes">Infrações</Link></li>
          <li><Link to="/Historico">Histórico</Link></li>
          <li><Link to="/Notificacoes">Notificações</Link></li>
          </ul>
          </li>
          <li><select id="selectAdm" value={selectedOption} onChange={handleOptionChange}>
            <option>Adm</option>
            <option value="Estoque">Estoque</option>
            <option value="Categoria">Categoria</option>
          </select>
          </li>
          <Apps />
          <li id="sairButton"><Link to="/">Sair</Link></li>
          </ul>
        </nav>
       </>

     );
}