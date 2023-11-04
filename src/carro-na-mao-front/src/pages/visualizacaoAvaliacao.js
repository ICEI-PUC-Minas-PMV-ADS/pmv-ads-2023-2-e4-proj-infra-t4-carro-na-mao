import axios from "axios";
import React,{useEffect,useState} from "react";
import { RecuperaToken } from "../autenticação/chave_de_acesso";
import { useNavigate, Link} from 'react-router-dom';
import { Menu } from "./menu";

const  VisualizarAvaliacoes= ()=>{

    const[dadosRequisitados, setDadosRequisitdos] = useState([])
   // const foco = useIsFocused()

    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                recuparandoAvaliacoes(jwtToken)
             }catch (error) {
                console.error('Erro ao recuperar token:', error);
             }
          }

            fetchData()
        },[]);


 function recuparandoAvaliacoes(jwtToken){
    const headers ={
        "Content-Type":"application/json",
        "Authorization": 'Bearer ' + jwtToken
       } 

   axios.get('https://api-carronamao.azurewebsites.net/api/Avaliacao',{headers})
       .then(response =>{
           if(response.status===200){
            setDadosRequisitdos(response.data)
              }
          }
        ).catch(error => {}) 
  }
console.log(dadosRequisitados)
    return(
        <>
        <Menu/>
        <button>
        <Link color="#000"to="/avaliacoes">Adicionar uma nova avaliação</Link>
        </button>
        </>
    )
}

export default VisualizarAvaliacoes