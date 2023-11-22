import axios from "axios";
import React, {useState,useEffect} from "react";
import { View,Text,StyleSheet,TextInput } from "react-native";
import { Button } from 'react-native-paper'
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation } from "@react-navigation/native";
import {TextInputMask} from'react-native-masked-text'
import estiloCadastro from "../../estilos/estiloCadastro";

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

    function verificarUsuarioExistente(){   
        const headers ={
            "Content-Type":"application/json",
            "Authorization": 'Bearer ' + token
            }
         axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-emailExistente/?email='+email+'',{headers})
            .then(response =>{
                if(response.status!==200){
                 console.log('nao entra')
                enviar()
    
            }
            else if(response.status===200){
                alert("Usurario já cadastrado")
            }
            }).catch(error => {
                 alert("Usurario já cadastrado")
                 console.error(error)
        })
    }
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
                 if(response.status===200 ){
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
        <View style={estiloCadastro.body}>
            <Text style={estiloCadastro.titulo}>Cadastre-se</Text>
        <View style={estiloCadastro.campos}>
            <TextInput
                mode='outlined'
                placeholder="Nome"
                label="Nome"
                value={nome}
                onChangeText={nome=>setNome(nome)}
                style={estiloCadastro.input}
                placeholderTextColor="#fff"
            />
            <TextInputMask
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }}
                mode='outlined'
                placeholder="Data de nascimento"
                label="Data de nascimento"
                value={dataNasc}
                onChangeText={dataNasc=>setNascimento(dataNasc)}
                style={estiloCadastro.input}
                placeholderTextColor="#fff"
            />
            <TextInput
                mode='outlined'
                label="Endereco"
                placeholder="Digite seu endereço completo"
                value={endereco}
                onChangeText={endereco=>setEndereco(endereco)}
                style={estiloCadastro.input}
                placeholderTextColor="#fff"
            />
            <TextInputMask
                type={"cpf"}
                mode='outlined'
                placeholder="CPF"
                label="CPF"
                value={cpf}
                onChangeText={cpf=>setCpf(cpf)}
                style={estiloCadastro.input}
                placeholderTextColor="#fff"
                />
            <TextInputMask
                type={'cel-phone'}
                options={{
                    maskType:'BRL',
                    withDDD:true,
                    dddMask:'(99)'
                    }}
                mode='outlined'
                placeholder="Telefone"
                label="Telefone"
                value={telefone}
                onChangeText={telefone=>setTelefone(telefone)}
                style={estiloCadastro.input}
                placeholderTextColor="#fff"
            />
            <TextInput
                mode='outlined'
                placeholder="Categotia Habilitação"
                label="Categoria Habilitação"
                value={categoriaHab}
                onChangeText={categoriaHab=>setCategoriaHab(categoriaHab)}
                style={estiloCadastro.input}
                placeholderTextColor="#fff"
                />
            <TextInput
                mode='outlined'
                placeholder="Email"
                textContentType={'emailAddress'}
                label="Email"
                value={email}
                onChangeText={email=>setEmail(email)}
                style={estiloCadastro.input}
                placeholderTextColor="#fff"
            />
            <TextInput
                mode='outlined'
                placeholder="Senha"
                label="Senha"
                value={senha}
                onChangeText={senha=>setSenha(senha)}
                secureTextEntry={true}
                style={estiloCadastro.input}
                placeholderTextColor="#fff"
            />
            <Button style={estiloCadastro.botao} mode="contained" onPress={()=>verificarUsuarioExistente()}>Cadastre-se</Button>
         </View>
     </View>
    )
}

export default Cadastro