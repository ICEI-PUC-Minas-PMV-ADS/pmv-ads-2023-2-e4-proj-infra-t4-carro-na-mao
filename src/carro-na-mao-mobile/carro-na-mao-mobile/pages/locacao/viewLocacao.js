import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { Button } from 'react-native-paper';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import estiloLocacao from "../../estilos/estiloLocacao";
import { RecuperaToken } from "../../Autenticação/autenticacao";

const ListaLocacoes = () => {
  const [locacoes, setLocacoes] = useState([]);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = await RecuperaToken();
        setToken(jwtToken);

        if (jwtToken) {
          const response = await axios.get('https://api-carronamao.azurewebsites.net/api/Locacao', {
            headers: {
              "Authorization": `Bearer ${jwtToken}`
            }
          });
          setLocacoes(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar locações:', error);
      }
    };

    fetchData();
  }, []);

  const editarLocacao = (idLocacao) => {
    navigation.navigate('editarLocacao', { locacaoId: idLocacao });
  };

  return (
    <View style={estiloLocacao.body}>
      <Text style={estiloLocacao.titulo}>Lista de Locações</Text>
      <FlatList
        data={locacoes}
        keyExtractor={(item) => item.id_locacao.toString()}
        renderItem={({ item }) => (
          <View style={estiloLocacao.itemLista}>
            <Text>ID: {item.id_locacao}</Text>
            <Text>Local: {item.id_local}</Text>
            <Text>Categoria: {item.id_categoria}</Text>
            <Text>Modelo: {item.modelo_veiculo}</Text>
            <Text>Data Retirada: {item.data_retirada}</Text>
            <Text>Data Entrega: {item.data_entrega}</Text>
            <Text>Valor Total: R$ {item.total}</Text>
            <TouchableOpacity onPress={() => editarLocacao(item.id_locacao)}>
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ListaLocacoes;
