import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
      } catch (error) {
        console.error('Erro ao recuperar token:', error);
      }
    }

    fetchData();
  }, []);

  const consultarHistorico = async () => {
    try {
      setLoading(true);
      console.log('Consultando histórico...');
      
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get('https://api-carronamao.azurewebsites.net/api/Historico', { headers });

      if (response.status === 200) {
        console.log('Resposta bem-sucedida:', response.data);
        setHistorico(response.data);
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

      {historico && (
        <ScrollView style={estiloHistorico.resultContainer}>
          <Text style={estiloHistorico.resultText}>Número de contrato: {historico.historicoContrato}</Text>
          <Text style={estiloHistorico.resultText}>Data de encerramento: {historico.encerramento}</Text>
          <Text style={estiloHistorico.resultText}>Veículo: {historico.veiculo}</Text>
          <Text style={estiloHistorico.resultText}>Valor da Locação: {historico.valores}</Text>
          <Text style={estiloHistorico.resultText}>Observação: {historico.historicoObservacao}</Text>
        </ScrollView>
      )}
    </View>
  );
}

export default Historico;
