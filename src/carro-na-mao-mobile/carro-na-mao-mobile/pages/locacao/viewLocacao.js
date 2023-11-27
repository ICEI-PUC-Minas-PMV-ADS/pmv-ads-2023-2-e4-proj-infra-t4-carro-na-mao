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

  const handleDelete = async (id_locacao) => {
    console.log('ID da reserva a ser excluída:', id_locacao);
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
            }
            axios.delete('https://api-carronamao.azurewebsites.net/api/Locacao?id_locacao=' + id_locacao + '', { headers })
              .then(response => {
                if (response.status == 200) {
                  alert('Reserva cancelada com sucesso')
                  setLocacao(prevLocacao => prevLocacao.filter(item => item.id_locacao !== id_locacao));
                }
              }).catch(error => {
                alert(error)
              })
          }
        }
      ])
  }

  const listaDeLocais = [
    { id: 1, label: 'Av. Afonso Pena, 1.000 - Centro - BH/MG' },
  ];
  const obterRotuloLocal = (id_local) => {
    const local = listaDeLocais.find(local => local.id === id_local);
    return local ? local.label : 'Local Desconhecido';
  };

  const Item = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('editarLocacao', { id: item })} >

          <View style={estiloLocacao.informacoe}>
            <Text>{'Local: ' + obterRotuloLocal(item.id_local)}</Text>
            <Text>{'Categoria: ' + item.id_categoria}</Text>
            <Text>{'Modelo Veículo: ' + item.modelo_veiculo}</Text>
            <Text>{'Hora Retirada: ' + item.hora_retirada}</Text>
            <Text>{'Data Retirada: ' + format(new Date(item.data_retirada), 'dd/MM/yyyy')}</Text>
            <Text>{'Valor da diaria: ' + item.vl_categoria}</Text>
            <IconButton
              icon="delete"
              style={estiloLocacao.exclui}
              iconColor='#8B0000'
              onPress={() => handleDelete(item.id_locacao)}
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
            keyExtractor={item => (item.id_locacao ? item.id_locacao.toString() : null)}
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