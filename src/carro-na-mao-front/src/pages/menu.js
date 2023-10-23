
import { Link } from "react-router-dom";
import '../estilos/Menu.css'
export function Menu (){
     return (

      <>
        <div id="menu">
        <Link to="/Home">Home</Link>
        <Link to="/Cadastro">Cadastro</Link>
        <Link to="/Vistoria">Vistoria</Link>
        <Link to="/Arruma">ManutencaoTeste</Link>
        <Link to="/">Sair</Link>
        </div>
       </>

     );
}

