import { Link } from "react-router-dom";
import '../estilos/Menu.css'
//imports da funcionalidade notificcacao
import Apps from './Apps';

export function Menu (){
     return (

      <>
        <div id="menu">
        <Link to="/Home2">Home</Link>        
        <Link to="/Infracoes">Infrações</Link>
        <Link to="/Historico">Histórico</Link>
        <Link to="/Avaliacoes">Avaliações</Link>        
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Locacao">Locacao</Link>
        <Link to="/Vistoria">Cadastrar Vistoria</Link>
        <Link to="/Vistoria2">Consultar Vistorias</Link>
        <Link to="/Estoque">Estoque</Link>
        <Link to="/Categoria">Categoria</Link>        
        <Link to="/Manutencao">Manutencao</Link>
        <Link to="/Notificacoes">Notificações</Link>
        <Apps />
        <Link to="/">Sair</Link>
        </div>
       </>

     );
}