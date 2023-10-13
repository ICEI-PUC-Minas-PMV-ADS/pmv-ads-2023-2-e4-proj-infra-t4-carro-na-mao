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
  const data = {
    'email': document.querySelector('input[type="email"]').value,
    'senha' : document.querySelector('input[type="password"]').value
  }
  const headers ={
    "content-type":"application/json",
    "Authorization":"Beare "+token
  }
  
console.log(data)
console.log(headers)
 const result = axios.post('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-email',data,{headers})
 console.log(result)
 
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
