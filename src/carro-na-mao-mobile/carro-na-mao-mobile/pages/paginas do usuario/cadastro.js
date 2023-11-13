import axios from "axios";
import React, {useState,useEffect} from "react";
import { View,Text,StyleSheet } from "react-native";
import { TextInput,Button } from 'react-native-paper'
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation } from "@react-navigation/native";

const Cadastro =()=>{
    
          const [nome,setNome] =useState()
          const [dataNasc,setNascimento]=useState()
          const [endereco,setEndereco]=useState()
          const [cpf,setCpf]=useState()
          const [telefone,setTelefone]=useState()
          const [email,setEmail]=useState()
          const [senha,setSenha]=useState()
          const [categoriaHab,setCategoriaHab]=useState()
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

const enviar =()=>{
        const data = {
                "nome": nome,
                "dataNacimento": dataNasc,
                "endereco":endereco,
                "cpf":cpf,
                "telefone": telefone,
                "email":email,
                "senha":senha,
                "restricoes": "string",
                "categoriaHabilitacao":categoriaHab,
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
                     alert('cadastrado')
                     navigation.navigate("login")
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
        <View>
            <Text style={styles.titulo}>Cadastre-se</Text>
        <View style={styles.campos}>
            <TextInput
                mode='outlined'
                placeholder="Nome"
                label="Nome"
                value={nome}
                onChangeText={nome=>setNome(nome)}
                style={styles.input}
            />
            <TextInput
                mode='outlined'
                placeholder="Data de nascimento"
                label="Data de nascimento"
                value={dataNasc}
                onChangeText={dataNasc=>setNascimento(dataNasc)}
                style={styles.input}
            />
            <TextInput
                mode='outlined'
                label="Endereco"
                placeholder="Digite seu endereço completo. exp: Rua dos bobs,nº0"
                value={endereco}
                onChangeText={endereco=>setEndereco(endereco)}
                style={styles.input}
            />
            <TextInput
                mode='outlined'
                placeholder="CPF"
                label="CPF"
                value={cpf}
                onChangeText={cpf=>setCpf(cpf)}
                style={styles.input}
                />
            <TextInput
                mode='outlined'
                placeholder="Telefone"
                label="Telefone"
                value={telefone}
                onChangeText={telefone=>setTelefone(telefone)}
                style={styles.input}
            />
            <TextInput
                mode='outlined'
                placeholder="Categotia Habilitação"
                label="Categoria Habilitação"
                value={categoriaHab}
                onChangeText={categoriaHab=>setCategoriaHab(categoriaHab)}
                style={styles.input}
                />
            <TextInput
                mode='outlined'
                placeholder="Email"
                label="Email"
                value={email}
                onChangeText={email=>setEmail(email)}
                style={styles.input}
            />
            <TextInput
                mode='outlined'
                placeholder="Senha"
                label="Senha"
                value={senha}
                onChangeText={senha=>setSenha(senha)}
                style={styles.input}
            />
            <Button style={styles.botao} mode="contained" onPress={()=>enviar()}>Cadastre-se</Button>
         </View>
     </View>
    )
}
const styles = StyleSheet.create({
   titulo:{
    position:'relative',
    top:60,
    fontSize:30,
    left:10
   },
    campos:{
        position:'relative',
        top:90
    },
    input: {
      height: 40,
      margin: 12
    },
    botao:{
        width:200,
        top:50,
        left:90
   }
  });
export default Cadastro