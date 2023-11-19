import axios from "axios";
import React, {useState,useEffect} from "react";
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation, Link } from "@react-navigation/native";
import { TextInput,Button } from 'react-native-paper'
import { View,Text,Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import estiloLogin from "../../estilos/estiloLogin";
const login = ()=> {
   
    const [email,setEmail] = useState()
    const [senha,setSenha] = useState()
    const [token,setToken]=useState(null)
    const navigation = useNavigation()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
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
    
    function validarUsuario (){
        
        const headers ={
            "Content-Type":"application/json",
            "Authorization": 'Bearer ' + token
            }
         axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-email/?email='+email+'&senha='+senha+'',{headers})
            .then(response =>{
                if(response.status===200){
                    salvarDadosLocal(response.data.nome,response.data.id,response.data.email,response.data.telefone,response.data.dataNacimento,response.data.endereco)
                    navigation.navigate("menu")
    
            }
            else if(response.status===204){
                alert("Usurario não cadastrado")
            }
            }).catch(error => {
                 alert("Ocorreu um erro interno.")
                 console.error(error)
        })
    }

    async function salvarDadosLocal (nome,id,email,telefone,dataNascimento,endereco){
        const dados_user = {
            'id':id,
            'nome':nome,
            'endereceo':endereco,
            'email':email,
            'telefone':telefone,
            'dataNascimento':dataNascimento
        }
        AsyncStorage.setItem('dados_user',JSON.stringify(dados_user))
        
      }


    return (
        <View style={estiloLogin.body}>
            <Image
                source={require('../../img/logo.png')}
                style={estiloLogin.logo}
            />
            <Text style={estiloLogin.titulo}>Entre na sua conta !</Text>
            <View style={estiloLogin.div}>
                <TextInput
                    mode='outlined'
                    label="Email"
                    keyboardType={'email-address'}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={email=>setEmail(email)} 
                    style={estiloLogin.input}
                    activeOutlineColor="#fff"
                    textColor="#fff"
                    underlineColor="#fff"
                    outlineColor="#fff"
                    />
                <TextInput
                    mode='outlined'
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={senha => setSenha(senha)}
                    style={estiloLogin.inputemail}
                    secureTextEntry={true}
                    activeOutlineColor="#fff"
                    textColor="#fff"
                    underlineColor="#fff"
                    outlineColor="#fff"
                    />
                <Button style={estiloLogin.botao} mode="contained" onPress={()=>validarUsuario()} title="Entre">Entre</Button>
                <Link style={estiloLogin.link} to='/Cadastro'>Cadastre-se</Link>
            </View>
        </View>
    )
}


export default login