import { View,Text, Button } from "react-native";
import React, {useState,useEffect} from "react";
import axios from "axios";
import { RecuperaToken } from "../Autenticação/autenticacao";
import { useNavigation,useIsFocused } from '@react-navigation/native';


const Avaliacao =()=>{
    const navigation = useNavigation()
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
        },[]);


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


    return(
        <View>
            <Text>ola</Text>
            <Button onPress={()=>navigation.navigate('cadastrarAvaliacao')} title="click"></Button>
        </View>

    )


}

export default Avaliacao