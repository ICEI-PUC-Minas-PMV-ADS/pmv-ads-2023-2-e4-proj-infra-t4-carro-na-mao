import axios from "axios";
import React, { useState, useEffect } from "react";
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { View, StyleSheet, Text, Alert, TouchableOpacity, Platform  } from "react-native";
import { useNavigation, useIsFocused, Link, view } from "@react-navigation/native";
import { TextInput, Button, DatePicker, Icon } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import estiloPerfil from "../../estilos/estiloPerfil";
//import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';

const cadastrarVistoria = () => {

    const [token, setToken] = useState(null)
    const [dados_user, setDados] = useState([])
    const navigation = useNavigation()
    const [veiculo, setVeiculo] = useState()    
    const [tipo, setTipo] = useState('0');
    const [date, setDate] = useState()
    const [descricao, setDescricao] = useState()
    const [observacoes, setObservacoes] = useState()
    const [manut, setManut] = useState()


    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);
                //recuperarDadosLocal()
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()
    }, []);

  
    function registrarVistoria() {
        const data = {

            "id_veiculo": veiculo,
            "tipo": tipo,
            "data_vistoria": date,
            "descricao": descricao,
            "observacoes": observacoes,
            "cria_ordem_manut": manut,
            "nomeUsuario": dados_user.nome,
            "id_usuario": dados_user.id,
            //"data":format(new Date(),'dd/MM/yyyy')
        }
        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }

        axios.post('https://api-carronamao.azurewebsites.net/api/Vistorias', data, { headers }).then(response => {
            if (response.status == 200) {
                alert('Vistoria Inserida com Sucesso.')
                navigation.navigate('Avaliacao')
            }
        }).catch(erro => {
            alert("Ops, encontramos um problema!");
        })
    }

    return (
        <View style={estiloPerfil.body}>
            
            <Text style={styles.label2}>ID do Veiculo:</Text>
            <TextInput
                placeholder="Veiculo"
                mode='outlined'
                label='Veiculo'
                type="text"
                style={styles.input}
                value={veiculo}
                onChangeText={veiculo => setVeiculo(veiculo)}
            />

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label2}>Tipo de Vistoria:</Text>
                    <Picker
                        selectedValue={tipo}
                        onValueChange={(value) => setTipo(value)}
                        style={styles.picker2}
                    >
                        <Picker.Item label="Retorno de veiculo" value="0" />
                        <Picker.Item label="Saída de veiculo" value="1" />
                    </Picker>
                </View>

                <View style={styles.column}>
                    
                    
                <Icon source="calendar-month-outline"color={'#fff'} size={20} />
                    <Text color={'#fff'} style={styles.label2}>Data da Vistoria:</Text>
                    <TextInput
                        placeholder="Seleciona a Data"
                        mode='outlined'
                        label='Seleciona a Data'
                        type="date"
                        style={styles.input}
                        value={date}
                        onChangeText={date => setDate(date)}
                    />
                </View>
            </View>

            <Text style={styles.label2}>Descrição da Vistoria:</Text>
            <TextInput
                placeholder="Descrição"
                mode='outlined'
                label='Descrição'
                style={styles.input}
                value={descricao}
                onChangeText={descricao => setDescricao(descricao)}
            />

            <Text style={styles.label2}>Observações da Vistoria:</Text>
            <TextInput
                placeholder="Insira as Observações Caso Houver"
                mode='outlined'
                label='Insira as Observações Caso Houver'
                style={styles.input}
                value={observacoes}
                onChangeText={observacoes => setObservacoes(observacoes)}
            />
            <Icon source="email" color={'#fff'}size={20}/>

            <Text style={styles.label2}>Cria Manutenção no sistema?</Text>
            <TextInput
                placeholder="Não Cria Manutenção"
                label='Não Cria Manutenção'
                mode='outlined'
                style={styles.input}
                value={manut}
                onChangeText={manut => setManut(manut)}
            />

            <Button style={styles.botao} mode="contained" onPress={() => registrarVistoria()}>Salvar</Button>
        </View>


    )

}
const styles = StyleSheet.create({
    titulo: {
        position: 'relative',
        top: 60,
        fontSize: 30,
        left: 10
    },
    campos: {
        position: 'relative',
        top: 90
    },
    input: {
        height: 40,
        margin: 12
    },
    botao: {
        width: 200,
        top: 50,
        left: 90
    },
    label2:
    {
        color: '#fff'
    },
    picker2:{
        color: '#000',
        backgroundColor: '#fff'

    }
});

export default cadastrarVistoria;
