import axios from "axios";
import { View,Text, Button,StyleSheet,FlatList, TouchableOpacity} from "react-native";
import React, {useState,useEffect} from "react";
import { FAB } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation,useIsFocused,Link } from '@react-navigation/native';


const verLocacao =()=>{
    const navigation = useNavigation()
    const foco = useIsFocused()
    const [locacao,setLocacao]= useState([]) 
    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                recuparandoLocacoes(jwtToken)
             }catch (error) {
                console.error('Erro ao recuperar token:', error);
             }
          }
            fetchData()
        },[foco]);


 function recuparandoLocacoes(jwtToken){
    const headers ={
        "Content-Type":"application/json",
        "Authorization": 'Bearer ' + jwtToken
       } 

   axios.get('https://api-carronamao.azurewebsites.net/api/Locacao',{headers})
       .then(response =>{
           if(response.status===200){
                setLocacao(response.data)
              }
          }
        ).catch(error => {}) 
  }
  const Reserva = ({reserva}) => (
    <TouchableOpacity >
      <View style={styles.informacoe}>
        <Text>{'Local '+reserva.localRetirada}</Text>
        <Text>{'Categoria '+reserva.categoriaRetirada}</Text>
        <Text>{'Modelo Veiculo '+reserva.modeloRetirada}</Text>
        <Text>{'Hora Retirada '+reserva.horaRetirada}</Text>
        <Text>{'Data Retirada '+reserva.dataRetirada}</Text>
        <Text>{'Valor '+reserva.vlTotal}</Text>
      </View>
  </TouchableOpacity>
);

    return(
        <View>
            <FlatList
                style={styles.lista}
                data={locacao}
                renderItem={Reserva}
                keyExtractor={reserva => reserva.id}
                />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={()=>navigation.navigate('cadastrarLocacao')}
            />
            <FAB
                //style={styles.fab}
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
      top: 550,
    },
    lista:{padding:3},
    informacoe:{
        padding:35,
        width:370,
        left:10,
        position:'relative',
    }
  })
export default verLocacao