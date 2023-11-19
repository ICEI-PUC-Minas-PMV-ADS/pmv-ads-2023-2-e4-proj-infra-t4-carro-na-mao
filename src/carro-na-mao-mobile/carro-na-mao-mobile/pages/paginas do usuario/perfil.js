import{View,Alert} from "react-native"
import axios from "axios";
import React, {useState,useEffect} from "react";
import { Card,Button,Avatar, Icon, MD3Colors,Divider,Modal,TextInput } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation,useIsFocused,Link} from '@react-navigation/native';
import {Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import estiloPerfil from "../../estilos/estiloPerfil";


const Perfil = ()=> {

    const foco = useIsFocused() 
    const [meusDados, setMeusDados] = useState([]) 
    const [dadosLocais,setDadosLocais]=useState([])
    const [dadosCompletos,setDadosCompletos] = useState([])
    const [jwt,setjwt] = useState()
    const navigation = useNavigation()

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
        const dadosCompletos = await AsyncStorage.getItem('dadosCompletos')
        setDadosLocais(JSON.parse(dadosSalvos))
        setDadosCompletos(JSON.parse(dadosCompletos))
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

    const showModal = () => {setVisible(true),  
        setEmail(dadosCompletos.email),
        setTelefone(dadosCompletos.telefone),
        setCPF(dadosCompletos.cpf),
        setEndereco(dadosCompletos.endereco),
        setdtNasc(dadosCompletos.dataNacimento),
        setcatHab(dadosCompletos.categoriaHabilitacao),
        setSenha(dadosCompletos.senha)};
    const hideModal = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
    
    const [email,setEmail] = useState()
    const [senha,setSenha] = useState()
    const [telefone,setTelefone] = useState()
    const [endereceo,setEndereco] = useState()
    const [dtNasc,setdtNasc] = useState()
    const [cpf,setCPF] = useState()
    const [catHab,setcatHab] = useState()
    

    function editarDados(){
        const data = {
            "id":dadosCompletos.id,
            "nome": dadosCompletos.nome,
            "dataNacimento": dtNasc,
            "endereco":endereceo,
            "cpf":cpf,
            "telefone": telefone,
            "email":email,
            "senha":senha,
            "restricoes": dadosCompletos.restricoes,
            "categoriaHabilitacao":catHab,
            "usuarioAtivo": dadosCompletos.usuarioAtivo
         }
    const headers ={
      "Content-Type":"application/json",
      "Authorization": 'Bearer ' + jwt
     } 

     axios.put('https://api-carronamao.azurewebsites.net/api/Cadastro/editar-usuario?id=+'+dadosCompletos.id+'',data,{headers}).then(response=>{
        if(response.status==200){
            alert('alterado com sucesso')
            

            }
        }).catch(error=>{
            alert(error)
        })

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
                    <Button onPress={showModal}>Show</Button>
                </Card.Content>
            </Card>
            <View style={estiloPerfil.acessoRapido}>
                <Text style={{color:'#fff',fontSize:26}}>Acesso Rápido</Text>
                <Text>{'/n'}</Text> 
                <Link  style={{color:'#fff'}} to='/Avaliacao'>Avaliações</Link> 
                <Text>{'/n'}</Text>
                <Divider />
                <Text>{'/n'}</Text>
                <Link  style={{color:'#fff'}} to='/cadastrarVistoria'>Vistorias</Link>      
            </View>
            <Modal visible={visible} onDismiss={hideModal}>
            <TextInput
                    mode='outlined'
                    label="Email"
                    keyboardType={'email-address'}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={email=>setEmail(email)} 
                   
                    activeOutlineColor="#fff"
                    textColor="#000"
                    underlineColor="#fff"
                    outlineColor="#fff"
            />
            <TextInput
                    mode='outlined'
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={senha => setSenha(senha)}
                    secureTextEntry={true}
                    activeOutlineColor="#fff"
                    textColor="#000"
                    underlineColor="#fff"
                    outlineColor="#fff"
                />
                <TextInput
                    mode='outlined'
                    label="Telefone"
                    keyboardType={'email-address'}
                    placeholder="Digite seu email"
                    value={telefone}
                    onChangeText={telefone=>setTelefone(telefone)} 
        
                    activeOutlineColor="#fff"
                    textColor="#000"
                    underlineColor="#fff"
                    outlineColor="#fff"
            />
              <TextInput
                    mode='outlined'
                    label="CPF"
                    keyboardType={'email-address'}
                    placeholder="Digite seu email"
                    value={cpf}
                    onChangeText={cpf=>setCPF(cpf)} 
        
                    activeOutlineColor="#fff"
                    textColor="#000"
                    underlineColor="#fff"
                    outlineColor="#fff"
            />
              <TextInput
                    mode='outlined'
                    label="Endereço"
                    keyboardType={'email-address'}
                    placeholder="Digite seu email"
                    value={endereceo}
                    onChangeText={endereceo=>setEndereco(endereceo)} 
        
                    activeOutlineColor="#fff"
                    textColor="#000"
                    underlineColor="#fff"
                    outlineColor="#fff"
            />
              <TextInput
                    mode='outlined'
                    label="Data de nascimento"
                    keyboardType={'email-address'}
                    placeholder="Digite seu email"
                    value={dtNasc}
                    onChangeText={dtNasc=>setdtNasc(dtNasc)} 
        
                    activeOutlineColor="#fff"
                    textColor="#000"
                    underlineColor="#fff"
                    outlineColor="#fff"
            />
              <TextInput
                    mode='outlined'
                    label="categoria habilitação"
                    keyboardType={'email-address'}
                    placeholder="Digite seu email"
                    value={catHab}
                    onChangeText={catHab=>setcatHab(catHab)} 
        
                    activeOutlineColor="#fff"
                    textColor="#000"
                    underlineColor="#fff"
                    outlineColor="#fff"
            />
                    
                 <Button onPress={()=>editarDados()}>Editar</Button>
            </Modal>
            <Button style={estiloPerfil.apagar} onPress={()=>confirmarExclusão()} textColor={'red'} title="Deletar minha conta">Deletar minha conta</Button>
        </View>
    )
}

export default Perfil;