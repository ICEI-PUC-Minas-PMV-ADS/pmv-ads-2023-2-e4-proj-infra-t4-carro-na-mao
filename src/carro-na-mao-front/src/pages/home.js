
import axios from 'axios';
import '../estilos/home.css';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom'
import logo from '../img/logo2.png'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { json } from 'react-router-dom/dist';

function Home() {

  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
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

    setLoading(true);
    const email = document.querySelector('input[type="email"]').value
    const senha = document.querySelector('input[type="password"]').value

    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }

    if (email != '' && senha != '') {
      setLoading(false)
      axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-email/?email=' + email + '&senha=' + senha + '', { headers })
        .then(response => {
          if (response.status === 200) {
            setLoading(false)
            salvarDadosLocais(response.data.nome, response.data.id)
            return navigate("home2")
          }
          else if (response.status === 204) {
            setLoading(false)
            alert("Usurario não cadastrado")

          }
        })
        .catch(error => {
          alert("Atenção, Usuário não cadastrado!")
        })
    }
    else {
      alert('Atenção, por favor preencher todos os campos!')
      setLoading(false)
    }
  }

  function salvarDadosLocais(nome, id) {
    const dados_user = {
      'nome': nome,
      'id': id
    }

    localStorage.setItem('dados_user', JSON.stringify(dados_user))


  }
  return (
    <div id="fundoHome">
      {loading ? (
        <Box id="carregamento" sx={{ display: 'flex' }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      ) : (
        <>
        <section id="camposHome">
            <div id="elementosCampos">
              <img id="logoHome" src={logo}></img>

              <h3 id="tituloHome"></h3>

              <input id="emailHome" type='email' placeholder='Email'></input>
              <input id="senhaHome" type='password' placeholder='Senha'></input>
              <button id="btnEntrar" onClick={validarUsuario}>Entrar</button>
              
              <h4 id="naoTemCadastro">Não tem cadastro?</h4>
              <Link id="link" to="Cadastro">Cadastre-se</Link>

              <h5 id="todosOsDireitos">Todos os direitos reservados © CARRO NA MÃO 2023</h5>

            </div>
          </section>
        </>
      )}
    </div>
  );
}


export default Home;

