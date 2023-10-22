
import { Link } from "react-router-dom";
import '../estilos/Menu.css'
export function Menu (){
     return (
      <>
        <div id="menu">
         <Link to="/Home">Home</Link>
         <Link to="Casdatro">Cadastro</Link>
         <Link to="/">Sair</Link>
        </div>
      </>
     );
}

