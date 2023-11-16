import axios from "axios";
import React, { useState,useEffect } from "react";
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { View,StyleSheet } from "react-native";
import { useNavigation, Link } from "@react-navigation/native";
import { TextInput,Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import estiloAvaliacoes from "../../estilos/estiloAvaliacoes";
const cadastrarAvaliacao =()=> {

    const [token,setToken]=useState(null)
    const [dados_user,setDados] = useState([])
    const navigation = useNavigation()
    const [observacao,setObservao]= useState()
    const [nota,setNotas] =useState()
    const [telefone,setTelefone] = useState()
 
    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);
                recuperarDadosLocal()
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()
    },[]);
    
    async function recuperarDadosLocal(){
          const dadosSalvos = await AsyncStorage.getItem('dados_user')
          setDados(JSON.parse(dadosSalvos))
      }
    function registrarAvaliacao(){
        const data = {
            "observaceo": observacao,
            "nota": nota,
            "nomeUsaurio":dados_user.nome,
            "id_usuario": dados_user.id,
            "data":format(new Date(),'dd/MM/yyyy')
        }
        const headers={
            "Content-Type":"application/json",
            "Authorization": 'Bearer ' + token
        }

        axios.post('https://api-carronamao.azurewebsites.net/api/Avaliacao',data,{headers}).then(response=>{
                if(response.status==200){
                    alert('Cadastrado com sucesso')
                    navigation.navigate('Avalicao')
                }
        }).catch(erro=>{

        })
    }
    
    return(
        <View style={estiloAvaliacoes.body}>
            <View style={estiloAvaliacoes.camposCadastroAvalaicao}>

            <TextInput
            placeholder="Observação"
            mode='outlined'
            label='Observação'
            style={estiloAvaliacoes.input}
            value={observacao}
            onChangeText={observacao=>setObservao(observacao)}
            activeOutlineColor="#fff"
            textColor="#fff"
            underlineColor="#fff"
            outlineColor="#fff"
            />
            <TextInput
            placeholder="Nota de 0 a 5"
            label='Nota'
            mode='outlined'
            style={estiloAvaliacoes.input}
            value={nota}
            onChangeText={nota=>setNotas(nota)}
            maxLength={1}
            keyboardType="numeric"
            activeOutlineColor="#fff"
            textColor="#fff"
            underlineColor="#fff"
            outlineColor="#fff"
            />

            <TextInput
            placeholder="Telefone"
            label='Telefone'
            mode='outlined'
            style={estiloAvaliacoes.input}
            value={telefone}
            onChangeText={telefone=>setTelefone(telefone)}
            activeOutlineColor="#fff"
            textColor="#fff"
            underlineColor="#fff"
            outlineColor="#fff"
            
            />
            <Button style={estiloAvaliacoes.botao} mode="contained" onPress={()=>registrarAvaliacao()}>Salvar</Button>
            </View>
        </View>
    )

}

export default cadastrarAvaliacao;