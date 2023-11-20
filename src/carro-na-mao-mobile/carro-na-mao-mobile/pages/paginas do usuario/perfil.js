import{View,Alert} from "react-native"
import axios from "axios";
import React, {useState,useEffect} from "react";
import { Card,Button,Avatar, Icon, MD3Colors,Divider } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation,useIsFocused,Link} from '@react-navigation/native';
import {Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import estiloPerfil from "../../estilos/estiloPerfil";


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
                setjwt(jwtToken)
                recuperandoDadosLocais()

                
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

    async function recuparandoInfromacoesUsuario(token){
        const headers={
            "Authorization": 'Bearer ' + token
        }
        axios.get('https://api-carronamao.azurewebsites.net/api/Cadastro/find-by-userid?id='+dadosSalvos.id+'',{headers}).then(response=>{
            if(response.status==200){
                setMeusDados(response.data)              
            }
        }).catch(error=>(

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
        <View style={estiloPerfil.body}> 
            <Card  style={estiloPerfil.card}>
                <Card.Content type={'contained'}>
                    <Avatar.Icon style={estiloPerfil.fotoUsuario } color={'#fff'}size={80} icon="account" />
                    <Text style={estiloPerfil.title}> { dadosLocais.nome}</Text>
                    <Icon source="email" color={'#fff'}size={20}/>
                    <Text style={estiloPerfil.email}>{dadosLocais.email}</Text>
                    <Icon source="phone" color={'#fff'} size={20}/>
                    <Text style={estiloPerfil.telefone}>{dadosLocais.telefone}</Text>
                    <Icon source="calendar-month-outline"color={'#fff'} size={20}/>
                    <Text style={estiloPerfil.dataNascimento}>{dadosLocais.dataNascimento}</Text>
                </Card.Content>
            </Card>
            <View style={estiloPerfil.acessoRapido}>
                <Text style={{color:'#fff',fontSize:26}}>Acesso Rápido</Text>
                <Text>{'/n'}</Text> 
                <Link  style={{color:'#fff'}} to='/Avalicao'>Avaliações</Link> 
                <Text>{'/n'}</Text>
                <Divider />
                <Text>{'/n'}</Text>
                <Link  style={{color:'#fff'}} to='/cadastrarVistoria'>Vistorias</Link>      
            </View>
            <Button style={estiloPerfil.apagar} onPress={()=>confirmarExclusão()} textColor={'red'} title="Deletar minha conta">Deletar minha conta</Button>
        </View>
    )
}

export default Perfil;