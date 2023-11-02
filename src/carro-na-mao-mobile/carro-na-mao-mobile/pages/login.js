import axios from "axios";
import React, {useState,useEffect} from "react";
import { RecuperaToken } from "../Autenticação/autenticacao";
import { useNavigation, Link } from "@react-navigation/native";
import { TextInput,View,Text,StyleSheet,Button } from "react-native";
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

        <View style={style.div}>
            <Text>Cadastre-se</Text>
                <TextInput
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={email=>setEmail(email)}
                    style={style.input}
                />
                <TextInput
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={senha => setSenha(senha)}
                    style={style.input}
                />
                <Button onPress={()=>validarUsuario()} title="Entre"></Button>
                <Link to='/Cadastro'>Cadastro</Link>
        </View>
    )
}

const style = StyleSheet.create({
    div:{
        position:"relative",
        top:90
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  
  })
  
  

export default login