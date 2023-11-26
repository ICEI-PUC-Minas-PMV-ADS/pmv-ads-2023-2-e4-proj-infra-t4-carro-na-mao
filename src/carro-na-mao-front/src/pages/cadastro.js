import { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Box from '@mui/material/Box';
import '../estilos/Cadastro.css'

function Cadastro() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
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

    function verificarUsuarioExistente(){   
        const email = document.querySelector('#emailCadastro').value
        const headers ={
            "Content-Type":"application/json",
            "Authorization": 'Bearer ' + token
            }
         axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-emailExistente/?email='+email+'',{headers})
            .then(response =>{
                if(response.status!==200){
                 cadastrar()
    
            }
            else if(response.status===200){
                alert("Usurario já cadastrado")
            }
            }).catch(error => {
                 alert(error)
                 console.error(error)
        })

    }

    const cadastrar = () => {
        const email = document.querySelector('#emailCadastro').value
        const senha = document.querySelector('#senhaCadastro').value
        const nome = document.querySelector('#nomeCadastro').value
        const dataNasc = document.querySelector("#dataNasc").value
        const cpf = document.querySelector("#cpf").value
        const telefone = document.querySelector("#telefone").value
        const cidade = document.querySelector("#endereco").value/*cIDADE*/
        const categoria = document.querySelector("#categoria").value
        const municipio = document.querySelector("#Municipio").value
        const rua = document.querySelector("#Rua").value
        const bairro = document.querySelector("#bairro").value
        const Numero = document.querySelector("#Numero").value
        const endereco = cidade + ', ' + municipio + ', ' + rua + ', ' + bairro + ', Nº ' + Numero
        const data = {
            "nome": nome,
            "dataNacimento": dataNasc,
            "endereco": endereco,
            "cpf": cpf,
            "telefone": telefone,
            "email": email,
            "senha": senha,
            "restricoes": "string",
            "categoriaHabilitacao": categoria,
            "usuarioAtivo": true
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
        if (email !== '' && senha !== '') {
            axios.post('https://api-carronamao.azurewebsites.net/api/Cadastro', data, { headers })
                .then(response => {
                    if (response.status === 200) {
                        setLoading(false)
                        return navigate("/")
                    }
                }
                ).catch(error => {
                    alert(error.status)
                })
        } else {
            alert('Verifique se todos os campos estão preenchidos corretamente')
        }
    }
    return (
        <div id="fundoCadastro">
        {loading ? (
                <Box id="carregamento" sx={{ display: 'flex' }}>
                    <CircularProgress sx={{ color: 'black' }} />
                </Box>
            ) : (
                <>
                    <section id="cmp">

                        <div id='camposParaLoginParteUm'>
                            <h3 id="titulo1">Seja bem-vindo, sua experiência começa aqui.</h3>
                            <h5 id="titulo2">Criar conta</h5>
                            <hr id="linha1"></hr>
                            <input type="text" id="nomeCadastro" placeholder='Nome completo'></input>
                            <input type="date" id="dataNasc" placeholder='Data de nascimento'></input>
                            <input type="text" id="cpf" placeholder='CPF'></input>
                            <input type="text" id="telefone" placeholder='Celular'></input>
                            <input type="text" id="categoria" placeholder='Categoria Habilitação'></input>
                            <input type="text" id="rua" placeholder='Logradouro'></input>
                            <input type="text" id="numero" placeholder='Número'></input>
                            <input type="text" id="bairro" placeholder='Bairro'></input>
                            <input type="text" id="endereco" placeholder='Cidade'></input>
                            <input type="text" id="municipio" placeholder='Municipio'></input>

                            <hr id="linha2"></hr>
                            <h5 id="titulo3">Criar E-mail</h5>
                            <input type="email" id='emailCadastro' placeholder='Digite seu email'></input>
                            <input type="password" id="senhaCadastro" placeholder='Digite sua senha'></input>
                            <input type="password" id="senhaCadastroConfirma" placeholder='Repita a sua senha'></input>

                            <button id="btnCadastrarUsuario" onClick={verificarUsuarioExistente}>Cadastre-se</button>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default Cadastro;