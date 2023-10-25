
import { Link } from "react-router-dom";
import '../estilos/Menu.css'
export function Menu (){
     return (

      <>
        <div id="menu">
        <Link to="/Home2">Home</Link>
        <Link to="/Reservas">Reservas</Link>
        <Link to="/Infracoes">Infrações</Link>
        <Link to="/Localização">Localização</Link>
        <Link to="/Historico">Histórico</Link>
        <Link to="/Avaliacoes">Avaliações</Link>        
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Vistoria">Vistoria</Link>
        <Link to="/Arruma">ManutencaoTeste</Link>
        <Link to="/Estoque">Estoque</Link>
        <Link to="/Categoria">Categoria</Link>
        <Link to="/Localizacao">Localizacao</Link>
        <Link to="/Manutencao">Manutencao</Link>
        <Link to="/Notificacoes">Notificações</Link>
        <Link to="/">Sair</Link>
        </div>
       </>

     );
}

