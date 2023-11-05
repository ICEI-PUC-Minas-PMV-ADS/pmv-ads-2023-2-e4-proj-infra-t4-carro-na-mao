import{View,StyleSheet,Pressable,Alert, Modal,FlatList, TouchableOpacity} from "react-native"
import axios from "axios";
import React, {useState,useEffect} from "react";
import { Button, FAB } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation,useIsFocused,Link } from '@react-navigation/native';
import { Dialog, Portal, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Perfil = ()=> {

    const foco = useIsFocused() 
    const [meusDados, setMeusDados] = useState([]) 
    const [dadosLocais,setDadosLocais]=useState([])
    const [jwt,setjwt] = useState()
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                recuperandoDadosLocais()
                setjwt(jwtToken)
                
            }catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()

    },[foco]);


    async function recuperandoDadosLocais (){
        const dadosSalvos = await AsyncStorage.getItem('dados_user')
        setDadosLocais(JSON.parse(dadosSalvos))
    }

    async function recuparandoInfromacoesUsuario(token,id_user){
         const headers={
            "Authorization": 'Bearer ' + token
        }
        axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-userid?id='+id_user+'',{headers}).then(response=>{
            if(response.status==200){
                setMeusDados(response.data)               // console.log(meusDados)
            }
        }).catch(error=>(
            recuperandoDadosLocais(),
            recuparandoInfromacoesUsuario(jwt,dadosLocais.id)
        ))
    }

    function deletarConta () {
        const headers={
            "Content-Type":"application/json",
            "Authorization": 'Bearer ' + jwt
        }
        axios.delete('https://api-carronamao.azurewebsites.net/api/Cadastro?id='+dadosLocais.id+'',{headers}).then(response=>{
                if(response.status==200){
                    alert('deletada com sucesso')
                    navigation.navigate('login')

                }
        }).catch(error=>{
            alert(error)
        })
    }

    
    
    
    function confirmarExclusão(){
        Alert.alert('Excluir', 'Deseja realmente continuar com a exclusão ?', [
            {
                text: 'Cancelar',
              onPress: () => console.log('Cancel Pressed'),
              style: 'destructive',StyleSheet:{color:'#fff'}
            },
            {text: 'Confirmar', onPress: () => deletarConta()},
        ]);
    }
 
  

    return(

        <> 
            <Text>Bem vindo Sr(a)  { dadosLocais.nome}</Text>
            <Button onPress={()=>confirmarExclusão()}>Deletar conta</Button>
            <Button onPress={()=>navigation.navigate('avaliacaoUsaurios',{id:dadosLocais.id})}>Carregar minhas avaliacões</Button>
    
        </>


    )
}
const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      borderWidth:1
    },
  })
  

export default Perfil;