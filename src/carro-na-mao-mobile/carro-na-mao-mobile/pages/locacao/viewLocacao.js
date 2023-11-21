import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { FAB } from 'react-native-paper';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { useNavigation, useIsFocused } from '@react-navigation/native';

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
                const response = await axios.delete(`https://api-carronamao.azurewebsites.net/api/Locacao?id=${id}`, { headers });

                if (response.status === 200) {
                  alert('Reserva excluída com sucesso');
                  navigation.navigate('viewLocacao');
                }
              } catch (error) {
                alert('Erro ao excluir reserva');
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
      <TouchableOpacity onLongPress={() => handleDelete(item.id)}>
        <View style={styles.informacoe}>
          <Text>{'Local ' + item.id_local}</Text>
          <Text>{'Categoria ' + item.id_categoria}</Text>
          <Text>{'Modelo Veículo ' + item.modelo_veiculo}</Text>
          <Text>{'Hora Retirada ' + item.hora_retirada}</Text>
          <Text>{'Data Retirada ' + item.data_retirada}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        style={styles.lista}
        data={locacao}
        renderItem={Item}
        keyExtractor={item => (item.id ? item.id.toString() : null)}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('cadastrarLocacao')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  lista: { padding: 3 },
  informacoe: {
    padding: 35,
    width: 370,
    left: 10,
    position: 'relative',
    backgroundColor: '#eee',
    marginBottom: 10,
  }
});

export default Locacao;