import axios from "axios";
import React, {useState,useEffect} from "react";
import { RecuperaToken } from "../Autenticação/autenticacao";
import { useNavigation, Link } from "@react-navigation/native";
import { TextInput,Button } from 'react-native-paper'
import { View,Text,StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const login = ()=> {
   
    const [email,setEmail] = useState()
    const [senha,setSenha] = useState()
    const [token,setToken]=useState(null)
    const navigation = useNavigation()
    
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
                    salvarDadosLocal(response.data.nome,response.data.id)
                    navigation.navigate("Avalicao")
            }
            else if(response.status===204){
                alert("Usurario não cadastrado")
            }
            }).catch(error => {
                 alert("Usurario não cadastrado")
        })
    }

    async function salvarDadosLocal (nome,id){
        const dados_user = {
            'id':id,
            'nome':nome
        }
        AsyncStorage.setItem('dados_user',JSON.stringify(dados_user))
        
      }


    return (

        <View>
            <Text style={style.titulo}>Cadastre-se</Text>
            <View style={style.div}>
                <TextInput
                    mode='outlined'
                    label="Email"
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={email=>setEmail(email)} 
                    style={style.input}
                    />
                <TextInput
                    mode='outlined'
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={senha => setSenha(senha)}
                    style={style.inputemail}
                    />
                <Button style={style.botao} mode="contained" onPress={()=>validarUsuario()} title="Entre">Entre</Button>
                <Link style={style.link} to='/Cadastro'>Cadastre-se</Link>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    titulo:{
        position:'relative',
        top:150,
        fontSize:40,
        left:10
    },
    div:{
       position:'relative',
       top:190,
       padding:5

    },
    input: {
        position:'relative',
        left:5,
        width:370
    },
    inputemail:{
            position:'relative',
            top:10,
            width:370,
            left:5,
    },
    botao:{
        width:200,
        top:100,
        left:90

   },
   link:{
        position:'relative',
        top:120,
        left:160
   }

})
  
  

export default login