import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Box from '@mui/material/Box';
import  '../estilos/Cadastro.css'

function Cadastro(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
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
        fetchData()
      },[]);

    const cadastrar =()=>{
        const email= document.querySelector('#emailCadastro').value
        const senha = document.querySelector('#senhaCadastro').value
        const nome = document.querySelector('#nomeCadastro').value
        const dataNasc = document.querySelector("#dataNasc").value
        const cpf = document.querySelector("#cpf").value
        const telefone = document.querySelector("#telefone").value
        const endereco = document.querySelector("#endereco").value
        const categoria = document.querySelector("#categoria").value
        
        const data = {
                "nome": nome,
                "dataNacimento": dataNasc,
                "endereco":endereco,
                "cpf":cpf,
                "telefone": telefone,
                "email":email,
                "senha":senha,
                "restricoes": "string",
                "categoriaHabilitacao":categoria,
                "usuarioAtivo": true
             }
        
        const headers ={
          "Content-Type":"application/json",
          "Authorization": 'Bearer ' + token
         } 
         if(email !=='' && senha !==''){
             axios.post('https://api-carronamao.azurewebsites.net/api/Cadastro',data,{headers})
             .then(response =>{
                 if(response.status===200){
                     setLoading(false)
                     return navigate("/")
                    }
                }
                ).catch(error => {
                    alert(error.status)
                })
            }else {
                alert('Verifique se todos os campos estão preenchidos corretamente')
            } 
    }
    return(
        <>
         {loading ? (
            <Box id="carregamento" sx={{ display: 'flex' }}>
                <CircularProgress sx={{color:'black'}} />
            </Box>
            ) : (
                <>
                <section id="cmp">
                    <h3 id="tituloCadastro">Faça seu Cadastro !</h3>
                     <h5 id="tituloDadosPessoais">Dados Pessoias</h5>
                    <div id='camposParaLoginParteUm'>
                        <input type="text" id="nomeCadastro" placeholder='Name'></input>
                        <input type="date" id="dataNasc" placeholder='Data de nascimento'></input>
                        <input type="text" id="cpf" placeholder='CPF'></input>
                        <input type="text" id="telefone" placeholder='Telefone'></input>
                        <input type="text" id="endereco" placeholder='Endereço'></input>
                        <input type="text" id="categoria" placeholder='Categoria Habilitação'></input>
                    </div>
                    <hr></hr>
                    <h5>Dados para login</h5>
                    <div id='camposParaLoginParteDois'>
                        <input type="email" id='emailCadastro' placeholder='Digite seu email...'></input>
                        <input type="password" id="senhaCadastroConfirma"placeholder='Digite sua senha...'></input>
                        <input type="password" id="senhaCadastro" placeholder='Repita sua senha'></input>
                    </div>

                    <div>
                        <button id="btnCadastrarUsuario"onClick={cadastrar}>Cadastre-se</button>                
                    </div>
                </section>
              </>
            )}
          </>
         );
}

export default Cadastro;