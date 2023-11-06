import{View,StyleSheet,Pressable,Alert, Modal,FlatList, TouchableOpacity} from "react-native"
import axios from "axios";
import React, {useState,useEffect} from "react";
import { Button, FAB } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation,useIsFocused,Link } from '@react-navigation/native';
import { Dialog, Portal, Text } from 'react-native-paper';

const avaliacaoUsaurios =({route})=>{
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
            if(response.status==200){
                setMinhasAvaliacao(response.data)
               
            }
        }).catch(error=>{
            carregarAvaliacoesdoUsuaroi(jwt)
        })
    }      

    console.log(minhasAvaliacoes)

    const Item = ({item}) => (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    return(
        <>
        <FlatList
        data={minhasAvaliacoes}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
        </>
    )
}

export default avaliacaoUsaurios