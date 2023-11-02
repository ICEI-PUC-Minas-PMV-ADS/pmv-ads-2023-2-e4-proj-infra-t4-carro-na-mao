import axios from "axios";
import React, { useState,useEffect } from "react";
import { RecuperaToken } from "../Autenticação/autenticacao";
import { View,TextInput,Button } from "react-native";
import { useNavigation, Link } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
            "id_usuario": dados_user.id
        }
        const headers={
            "Content-Type":"application/json",
            "Authorization": 'Bearer ' + token
        }

        axios.post('https://api-carronamao.azurewebsites.net/api/Avaliacao',data,{headers}).then(response=>{
                if(response.status==200){
                    alert('Cadastrado com sucesso')
                    navigation.navigate('avaliacao')
                }
        }).catch(erro=>{

        })
    }
    
    return(
        <View>
            <TextInput
            placeholder="Observação"
            value={observacao}
            onChangeText={observacao=>setObservao(observacao)}
            />
            <TextInput
            placeholder="Nota"
            value={nota}
            onChangeText={nota=>setNotas(nota)}
            />

            <TextInput
            placeholder="Telefone"
            value={telefone}
            onChangeText={telefone=>setTelefone(telefone)}
            
            />
            <Button onPress={()=>registrarAvaliacao()} title="salvar"/>
        </View>
    )

}
export default cadastrarAvaliacao;