import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import {RecuperaToken} from './autenticação/chave_de_acesso'

function App() {
const [token,setToken]=useState(null)
useEffect(() => {
  async function fetchData() {
    try {
      const jwtToken = await RecuperaToken();
      setToken(jwtToken);
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
    }
  }
  fetchData();
}, []);

const validarUsuario =()=>{
 
    const email= document.querySelector('input[type="email"]').value
    const senha = document.querySelector('input[type="password"]').value
    const headers ={
      "Content-Type":"application/json",
      "Authorization": 'Bearer ' + token
    } 
  axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-email/?email='+email+'&senha='+senha+'',{headers})
    .then(response =>{
        console.log(response.status)
        if(response.status===200){
          alert('ok')
        }
        //console.log(response.data)
        }
    ).catch(error => {
        alert(error.status)
    })

 
}
  return (
        <>
        <section>
        <input id = "email"type='email'></input>
        <input type='password'></input>
        <button onClick={validarUsuario}>Login</button>
        </section>

      </>
    );
  }


export default App;
