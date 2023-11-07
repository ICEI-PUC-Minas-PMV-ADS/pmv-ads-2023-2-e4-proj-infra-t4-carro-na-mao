
import { Link } from "react-router-dom";
import '../estilos/Menu.css'
export function Menu (){
     return (

      <>
        <div id="menu">
<<<<<<< Updated upstream
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Vistoria">Vistoria</Link>
        <Link to="/Arruma">ManutencaoTeste</Link>
        <Link to="/">Sair</Link>
=======
          <Link to="/Home2">Home</Link>        
          <Link to="/Avaliacoes">Avaliações</Link>        
          <Link to="/Dashboard">Dashboard</Link>
          <Link to="/Locacao">Alugar</Link>
          <Link to="/Vistoria">Cadastrar Vistoria</Link>
          <Link to="/Vistoria2">Consultar Vistorias</Link>     
          <Link to="/Localizacao">Localização</Link>   
          <Link to="/Manutencao">Manutencao</Link>
          <Link to="/Multa">Multa</Link>
          <Link to="/Historico">Histórico</Link>
          <Link to="/Notificacoes">Notificações</Link>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option>Adm</option>
            <option value="Estoque">Estoque</option>
            <option value="Categoria">Categoria</option>
          </select>
          <Apps />
          <Link to="/">Sair</Link>
>>>>>>> Stashed changes
        </div>
       </>

     );
}

