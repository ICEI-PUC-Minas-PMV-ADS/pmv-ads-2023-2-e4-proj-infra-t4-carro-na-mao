
import { Link } from "react-router-dom";
export function Menu (){
     return (
        <>
        <Link to="/Home">Home</Link>
        <Link to="/Cadastro">Cadastro</Link>
        <Link to="/Vistoria">Vistoria</Link>
        <Link to="/Arruma">ManutencaoTeste</Link>
        <Link to="/">Sair</Link>
        
        </>
     );
}

