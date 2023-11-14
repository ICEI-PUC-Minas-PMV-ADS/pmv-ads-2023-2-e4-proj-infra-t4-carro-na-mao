import{View,StyleSheet,Pressable,Alert, Modal,FlatList, TouchableOpacity} from "react-native"
import axios from "axios";
import React, {useState,useEffect} from "react";
import { Button, FAB } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation,useIsFocused,Link } from '@react-navigation/native';
import { Dialog, Portal, Text } from 'react-native-paper';

const AvaliacaoUsaurios =({route})=>{
    const [minhasAvaliacoes,setMinhasAvaliacao]= useState([])
    const foco = useIsFocused() 
    const {id} = route.params; 
    const navigation = useNavigation()
    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                carregarAvaliacoesdoUsuaroi(jwtToken,id)
                
            }catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()

    },[foco]);


    async function carregarAvaliacoesdoUsuaroi(token,id){
        const headers={
        "Content-Type":"application/json",
        "Authorization": 'Bearer ' + token
    }
    axios.get('https://api-carronamao.azurewebsites.net/api/Avaliacao/find-by-avaliacao?id_user='+id+'',{headers}).then(response=>{
            if(response.status===200){
                alert(response.status)
                setMinhasAvaliacao(response.data)
            }
        }).catch(error=>{
            
        })
    }      
    //console.log(minhasAvaliacoes)


    const Item = ({item}) => (
        <TouchableOpacity >
      <View>
      <Text>{'Nota: '+item.nota+'/5'}</Text>
        <Text>{'Descrição: '+item.observaceo}</Text>
      </View>
  </TouchableOpacity>

       )
    return(

        <View>
            {console.log(minhasAvaliacoes)}
            <Text>{minhasAvaliacoes.id}</Text>
        <FlatList
        data={minhasAvaliacoes}
        renderItem={Item}
        keyExtractor={item => item.data}
      />
        </View>
    )
}

export default AvaliacaoUsaurios