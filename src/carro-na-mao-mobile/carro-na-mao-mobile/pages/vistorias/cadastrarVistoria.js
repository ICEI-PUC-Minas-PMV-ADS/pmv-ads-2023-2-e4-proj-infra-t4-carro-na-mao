import axios from "axios";
import React, { useState, useEffect } from "react";
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { View, StyleSheet, Text, Alert } from "react-native";
import { useNavigation, useIsFocused, Link } from "@react-navigation/native";
import { TextInput, Button, DatePicker } from 'react-native-paper'
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
    //const [tipo,setTipo]= useState()
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

    //async function recuperarDadosLocal(){
    //const dadosSalvos = await AsyncStorage.getItem('dados_user')
    // setDados(JSON.parse(dadosSalvos))
    // }
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
                navigation.navigate('Avalicao')
            }
        }).catch(erro => {
            alert("Ops, encontramos um problema!");
        })
    }

    return (
        <View style={estiloPerfil.body}>
            <Text style={styles.label}>ID do Veiculo:</Text>
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
                    <Text style={styles.label}>Tipo de Vistoria:</Text>
                    <Picker
                        selectedValue={tipo}
                        onValueChange={(value) => setTipo(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Retorno de veiculo" value="0" />
                        <Picker.Item label="Saída de veiculo" value="1" />
                    </Picker>
                </View>

                <View style={styles.column}>
                    <Text style={styles.label}>Data da Vistoria:</Text>
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

            <Text style={styles.label}>Descrição da Vistoria:</Text>
            <TextInput
                placeholder="Descrição"
                mode='outlined'
                label='Descrição'
                style={styles.input}
                value={descricao}
                onChangeText={descricao => setDescricao(descricao)}
            />

            <Text style={styles.label}>Observações da Vistoria:</Text>
            <TextInput
                placeholder="Insira as Observações Caso Houver"
                mode='outlined'
                label='Insira as Observações Caso Houver'
                style={styles.input}
                value={observacoes}
                onChangeText={observacoes => setObservacoes(observacoes)}
            />

            <Text style={styles.label}>Cria Manutenção no sistema?</Text>
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
    }
});

export default cadastrarVistoria;