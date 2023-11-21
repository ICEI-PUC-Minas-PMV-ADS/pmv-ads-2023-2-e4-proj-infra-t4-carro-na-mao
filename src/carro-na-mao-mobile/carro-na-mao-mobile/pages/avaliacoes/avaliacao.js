import axios from "axios";
import { View,Text, Button,StyleSheet,FlatList, TouchableOpacity} from "react-native";
import React, {useState,useEffect} from "react";
import { FAB } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation,useIsFocused,Link } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import estiloAvaliacoes from "../../estilos/estiloAvaliacoes";


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
      <View style={estiloAvaliacoes.informacoe}>
      <Text style={estiloAvaliacoes.usuarioAvaliacao}>{item.nomeUsaurio}</Text>
      <Text style={estiloAvaliacoes.dataAvaliacao}>{item.data}</Text>
      <StarRating
            disabled={false}
            maxStars={5}
            rating={item.nota}
            fullStarColor="#c5be11"
            />
       
        <Text style={estiloAvaliacoes.obs}>{'Descrição: '+item.observaceo}</Text>
      
      </View>
      <Text>{'\n'}</Text>
  </TouchableOpacity>
 
);
    
    return(
        <View  style={estiloAvaliacoes.body}>
            <FlatList
                style={estiloAvaliacoes.lista}
                data={avaliacoes}
                renderItem={Item}
                keyExtractor={item => item.id}
              
                />
            <FAB
                style={estiloAvaliacoes.fab2}
                icon="plus"
                onPress={()=>navigation.navigate('cadastrarAvaliacao')}
            />
          
        </View>

    )
}

export default Avaliacao