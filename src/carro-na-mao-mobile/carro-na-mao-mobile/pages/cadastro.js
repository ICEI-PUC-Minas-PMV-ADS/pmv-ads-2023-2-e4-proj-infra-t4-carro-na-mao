import axios from "axios";
import React, {useState,useEffect} from "react";
import { TextInput,View,Text,StyleSheet,Button } from "react-native";
import { RecuperaToken } from "../Autenticação/autenticacao";
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
            <Text>Cadastre-se</Text>

            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={nome=>setNome(nome)}
                style={styles.input}
            />
            <TextInput
                placeholder="Data de nascimento"
                value={dataNasc}
                onChangeText={dataNasc=>setNascimento(dataNasc)}
                style={styles.input}
            />
            <TextInput
                placeholder="Digite seu endereço completo. exp: Rua dos bobs,nº0"
                value={endereco}
                onChangeText={endereco=>setEndereco(endereco)}
                style={styles.input}
            />
            <TextInput
                placeholder="CPF"
                value={cpf}
                onChangeText={cpf=>setCpf(cpf)}
                style={styles.input}
            />
            <TextInput
                placeholder="Telefone"
                value={telefone}
                onChangeText={telefone=>setTelefone(telefone)}
                style={styles.input}
            />
            <TextInput
                placeholder="Categotia Habilitação"
                value={categoriaHab}
                onChangeText={categoriaHab=>setCategoriaHab(categoriaHab)}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={email=>setEmail(email)}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={senha=>setSenha(senha)}
                style={styles.input}
            />
         <Button onPress={()=>enviar()} title="Enviar"></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
export default Cadastro