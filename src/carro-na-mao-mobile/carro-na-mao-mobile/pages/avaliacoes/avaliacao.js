import axios from "axios";
import { View,Text, Button,StyleSheet,FlatList, TouchableOpacity} from "react-native";
import React, {useState,useEffect} from "react";
import { FAB } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation,useIsFocused,Link } from '@react-navigation/native';


const Avaliacao =()=>{
    const navigation = useNavigation()
    const foco = useIsFocused()
    const [avaliacoes,setAvaliacao]= useState([]) 
    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                recuparandoAvaliacoes(jwtToken)
             }catch (error) {
                console.error('Erro ao recuperar token:', error);
             }
          }
            fetchData()
        },[foco]);


 function recuparandoAvaliacoes(jwtToken){
    const headers ={
        "Content-Type":"application/json",
        "Authorization": 'Bearer ' + jwtToken
       } 

   axios.get('https://api-carronamao.azurewebsites.net/api/Avaliacao',{headers})
       .then(response =>{
           if(response.status===200){
                setAvaliacao(response.data)
              }
          }
        ).catch(error => {}) 
  }
  const Item = ({item}) => (
    <TouchableOpacity >
      <View style={styles.informacoe}>
        <Text>{'Nota: '+item.nota+'/5'}</Text>
        <Text>{'Descrição: '+item.observaceo}</Text>
        <Text style={styles.usuarioAvaliacao}>{item.nomeUsaurio}</Text>
        <Text style={styles.dataAvaliacao}>{item.data}</Text>
      </View>
  </TouchableOpacity>
);

    return(
        <View>
            <FlatList
                style={styles.lista}
                data={avaliacoes}
                renderItem={Item}
                keyExtractor={item => item.id}
              
                />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={()=>navigation.navigate('cadastrarAvaliacao')}
            />
            <FAB
                style={styles.fab2}
                icon="plus"
                onPress={()=>navigation.navigate('Perfil')}
            />
          
        </View>

    )
}
const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      top: 50,
    },
    fab2:{position: 'absolute',
    margin: 16,
    right: 0,
    top: 550,
  },
    lista:{padding:3},
    informacoe:{
        padding:35,
        width:370,
        left:10,
        position:'relative',
    },
    dataAvaliacao:{
        position:'relative',
        left:200
    },
    usuarioAvaliacao:{
        position:'relative',
        top:15
    }
  })
export default Avaliacao