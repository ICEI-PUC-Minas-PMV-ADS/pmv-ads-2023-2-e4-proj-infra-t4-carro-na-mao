
import axios from 'axios';
import '../estilos/home.css';
import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate,Link } from 'react-router-dom'
import logo from'../img/logo.png'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Home() {
  
  const navigate = useNavigate()
  const [token,setToken]=useState(null)
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

const validarUsuario =()=>{
    
    setLoading(true);
    const email= document.querySelector('input[type="email"]').value
    const senha = document.querySelector('input[type="password"]').value
  
    const headers ={
      "Content-Type":"application/json",
      "Authorization": 'Bearer ' + token
    } 

    if(email!='' && senha!=''){
      setLoading(false)
       axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-email/?email='+email+'&senha='+senha+'',{headers})
        .then(response =>{
          if(response.status===200){
            setLoading(false)
            return navigate("home2")
          }
          else if(response.status===204){
            setLoading(false)
            alert("Usurario não cadastrado")
       
          }
        })
        .catch(error => {
          alert("Usurario não cadastrado")
        })
      }
    else{
      alert('Por favor preencher todos os campos')
      setLoading(false)
    }
  }

  return (
        <>
         {loading ? (
            <Box id="carregamento" sx={{ display: 'flex' }}>
              <CircularProgress sx={{color:'black'}} />
            </Box>
            ) : (
              <>
              <img id="logoHome"src={logo}></img>  
              <section id="camposHome">
              <h3 id="tituloHome">Faça o seu login !</h3>
              <div id="elementosCampos">
                <input  id = "emailHome"type='email' placeholder='Email'></input>
                <input  id="senhaHome"type='password' placeholder='Senha'></input>
                <button id="btnEntrar" onClick={validarUsuario}>Entrar</button>
                <Link id="link"to="Cadastro">Cadastre-se</Link>
              </div>
              </section>
            </>
            )}
      </>
    );
  }


export default Home;
