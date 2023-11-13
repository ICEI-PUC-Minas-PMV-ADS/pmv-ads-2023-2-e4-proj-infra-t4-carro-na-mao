import axios from "axios";
import React, { useState,useEffect } from "react";
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { View,StyleSheet } from "react-native";
import { useNavigation, Link } from "@react-navigation/native";
import { TextInput,Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
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
        <View>
            <TextInput
            placeholder="Observação"
            mode='outlined'
            label='Observação'
            style={styles.input}
            value={observacao}
            onChangeText={observacao=>setObservao(observacao)}
            />
            <TextInput
            placeholder="Nota de 0 a 10"
            label='Nota'
            mode='outlined'
            style={styles.input}
            value={nota}
            onChangeText={nota=>setNotas(nota)}
            />

            <TextInput
            placeholder="Telefone"
            label='Telefone'
            mode='outlined'
            style={styles.input}
            value={telefone}
            onChangeText={telefone=>setTelefone(telefone)}
            
            />
            <Button style={styles.botao} mode="contained" onPress={()=>registrarAvaliacao()}>Salvar</Button>
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
export default cadastrarAvaliacao;