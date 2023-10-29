import { Link } from "react-router-dom";
import '../estilos/Menu.css'
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
        <Link to="/Vistoria">Vistoria</Link>
        <Link to="/Estoque">Estoque</Link>
        <Link to="/Categoria">Categoria</Link>
        <Link to="/Localização">Localização</Link>
        <Link to="/Manutencao">Manutenção</Link>
        <Link to="/Notificacoes">Notificações</Link>
        <Apps />
        <Link to="/">Sair</Link>
        </div>
       </>

     );
}