import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from "axios";
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation } from '@react-navigation/native';
import estiloHistorico from '../../estilos/estiloHistorico';
 
export function Historico() {
  const navigate = useNavigation();
  const [token, setToken] = useState('');
  const [input, setInput] = useState('');
  const [historico, setHistorico] = useState(null);
  const [loading, setLoading] = useState(false);
 
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
 
const consultarHistorico = async () => {
  try {
    setLoading(true);
 
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
 
    const response = await axios.get('https://api-carronamao.azurewebsites.net/api/Historico', {
      headers
    });
 
    if (response.status === 200) {
      console.log('Resposta bem-sucedida:', response.data);
 
      // Realiza a filtragem no cliente com base no número do contrato
      const historicoFiltrado = Array.isArray(response.data)
        ? response.data.filter(item => item.historicoContrato === input)
        : [];
 
      setHistorico(historicoFiltrado);
 
      // Adiciona alerta quando nenhum contrato é encontrado
      if (historicoFiltrado.length === 0) {
        Alert.alert('Nenhum contrato encontrado', 'Verifique o número do contrato e tente novamente.');
      }
 
    } else {
      console.error('Resposta inesperada do servidor:', response.status, response.data);
    }
  } catch (error) {
    console.error('Erro durante a solicitação:', error);
  } finally {
    setLoading(false);
  }
};
 
return (
  <View style={estiloHistorico.container}>
    <Text style={estiloHistorico.title}>Histórico de suas locações</Text>
 
    <View style={estiloHistorico.inputContainer}>
      <TextInput
        style={estiloHistorico.input}
        value={input}
        onChangeText={input => setInput(input)}
        placeholder="Digite número do contrato..."
      />
      <TouchableOpacity
        style={estiloHistorico.button}
        onPress={() => consultarHistorico()}
        disabled={loading || input.trim() === ''}
      >
        <Text>Consultar Histórico</Text>
      </TouchableOpacity>
    </View>
 
    {loading && <Text>Loading...</Text>}
 
    {historico && Array.isArray(historico) && historico.length > 0 ? (
      <ScrollView style={estiloHistorico.resultContainer}>
        {historico.map((item, index) => (
          <View key={index}>
            <Text style={estiloHistorico.resultText}>Número de contrato: {item.historicoContrato}</Text>
            <Text style={estiloHistorico.resultText}>Data de encerramento: {item.encerramento}</Text>
            <Text style={estiloHistorico.resultText}>Veículo: {item.veiculo}</Text>
            <Text style={estiloHistorico.resultText}>Valor da Locação: {item.valores}</Text>
            <Text style={estiloHistorico.resultText}>Observação: {item.historicoObservacao}</Text>
          </View>
        ))}
      </ScrollView>
    ) : (
      <Text>Nenhum histórico disponível.</Text>
    )}
  </View>
);
 
}
 
export default Historico;