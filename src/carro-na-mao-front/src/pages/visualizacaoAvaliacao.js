import axios from "axios";
import React,{useEffect,useState} from "react";
import { RecuperaToken } from "../autenticação/chave_de_acesso";
import { useNavigate, Link} from 'react-router-dom';
import { Menu } from "./menu";
import FlatList from 'flatlist-react';
import '../estilos/avaliacoes.css';


const  VisualizarAvaliacoes= ()=>{
    const[dadosRequisitados, setDadosRequisitdos] = useState([])
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
    const carregarAvaliacoes = (dadosRequisitados,index) =>{
        return(
            <div id="cardAvaliacoes" key={index}>
                <p id="registroNota">{dadosRequisitados.data}</p>
                <p>{dadosRequisitados.nomeUsaurio}</p>
                <p>Nota: {dadosRequisitados.nota}</p>
                <p>Observação: {dadosRequisitados.observaceo}</p>
            </div>
    
        )
    }
    return(
        <>
        <Menu/>
       
        <div id="listaAvaliacao">
            <FlatList
            list={dadosRequisitados}
            renderItem={carregarAvaliacoes}   
            horizontal={true}  
            />
        </div>
       

        <button id="adicionarNovaAvaliacao">
        <Link color="#000"to="/avaliacoes">+</Link>
        </button>
        </>
    )
}

export default VisualizarAvaliacoes