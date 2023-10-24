
import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()

  const [token, setToken] = useState(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const jwtToken = await RecuperaToken();
        setToken(jwtToken);
      } catch (error) {
        console.error('Erro ao recuperar token:', error);
      }
    }
    fetchData()
  }, []);

  const validarUsuario = () => {
    const email = document.querySelector('input[type="email"]').value
    const senha = document.querySelector('input[type="password"]').value
    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }
    axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-email/?email=' + email + '&senha=' + senha + '', { headers })
      .then(response => {
        console.log(response.status)
        if (response.status === 200) {
          return navigate("Home2")
        }
      }
      ).catch(error => {
        alert(error.status)
      })


  }
  return (
    <>
      

      <div class="container">
        <img src="src/img/logo-carro-na-mao.png" alt="Logo Carro na Mão"></img>
      </div>

      <section id="campos">
        <h3>Faça o seu login !</h3>
        <input id="email" type='email' placeholder='Email'></input>
        <input id="senha" type='password' placeholder='Senha'></input>
        <button onClick={validarUsuario}>Entrar</button>
        <Link id="link" to="Cadastro">Cadastre-se</Link>
      </section>

    </>
  );
}


export default Home;
