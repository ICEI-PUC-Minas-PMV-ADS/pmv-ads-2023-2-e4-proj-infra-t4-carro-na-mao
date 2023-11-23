import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { FAB, IconButton } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import estiloLocacao from "../../estilos/estiloLocacao";
import { format } from 'date-fns';

const Locacao = () => {
  const navigation = useNavigation();
  const foco = useIsFocused();
  const [locacao, setLocacao] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const jwtToken = await RecuperaToken();
        recuparandoLocacoes(jwtToken);
      } catch (error) {
        console.error('Erro ao recuperar token:', error);
      }
    }
    fetchData();
  }, [foco]);

  function recuparandoLocacoes(jwtToken) {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + jwtToken
    };

    axios.get('https://api-carronamao.azurewebsites.net/api/Locacao', { headers })
      .then(response => {
        if (response.status === 200) {
          setLocacao(response.data);
        }
      })
      .catch(error => {
        console.error('Erro ao recuperar locações:', error);
      });
  }

  const handleDelete = async (id) => {
    console.log('ID da reserva a ser excluída:', id);
    try {
      const jwtToken = await RecuperaToken();

      Alert.alert(
        'Confirmar exclusão',
        'Deseja realmente excluir esta reserva?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              const headers = {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + jwtToken
              };

              try {
                const response = await axios.delete(`https://api-carronamao.azurewebsites.net/api/Locacao/${id}`, { headers });

                if (response.status === 200) {
                  alert('Reserva excluída com sucesso');
                  navigation.navigate('viewLocacao');
                }
              } catch (error) {
                if (error.response && error.response.status === 400) {
                  console.error('Erro 404 ao excluir reserva:', error.response.data);
                  alert('Erro 404 ao excluir reserva: ' + error.response.data.message);
                } else {
                console.error('Erro ao excluir reserva:', error);
                alert('Erro ao excluir reserva' + error.message);
                }
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
    }
  };

  const Item = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('editarLocacao', { id: item.id })} >
        
        <View style={estiloLocacao.informacoe}>
          <Text>{'Local: ' + item.id_local}</Text>
          <Text>{'Categoria: ' + item.id_categoria}</Text>
          <Text>{'Modelo Veículo: ' + item.modelo_veiculo}</Text>
          <Text>{'Hora Retirada: ' + item.hora_retirada}</Text>
          <Text>{'Data Retirada: ' + format(new Date(item.data_retirada), 'dd/MM/yyyy')}</Text>
          <Text>{'Valor da diaria: ' + item.vl_categoria}</Text>
          <IconButton
            icon="delete"
            style={estiloLocacao.exclui}
            iconColor='#8B0000'
            onPress={() => handleDelete(item.id)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={estiloLocacao.body}>
      <FlatList
        style={estiloLocacao.topicos}
        data={locacao}
        renderItem={Item}
        keyExtractor={item => (item.id ? item.id.toString() : null)}
      />

      <FAB
        style={estiloLocacao.adic}
        icon="plus"
        onPress={() => navigation.navigate('cadastrarLocacao')}
      />
    </View>
  );
}

export default Locacao;