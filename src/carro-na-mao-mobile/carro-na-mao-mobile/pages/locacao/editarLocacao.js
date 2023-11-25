import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import estiloLocacao from "../../estilos/estiloLocacao";
import { RecuperaToken } from "../../Autenticação/autenticacao";


const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const EditarLocacao = ({ route, navigation }) => {
    console.log(route.params.id);
    const [token, setToken] = useState(null);
  
    const [local, setLocal] = useState("");
    const [categoria, setCategoria] = useState("");
    const [modelo, setModelo] = useState("");
    const [horaRetirada, setHoraRetirada] = useState("");
    const [horaEntrega, setHoraEntrega] = useState("");
    const [valorCategoria, setValorCategoria] = useState("");
    const [dataRetirada, setDataRetirada] = useState(new Date());
    const [dataEntrega, setDataEntrega] = useState(new Date());
    const [adicionais, setAdicionais] = useState("");
    const [total, setTotal] = useState(0);
    const [showDatePickerRetirada, setShowDatePickerRetirada] = useState(false);
    const [showDatePickerEntrega, setShowDatePickerEntrega] = useState(false);
    const [showTimePickerRetirada, setShowTimePickerRetirada] = useState(false);
    const [showTimePickerEntrega, setShowTimePickerEntrega] = useState(false);
  
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
  
      const locacaoData = route.params?.locacaoData;
      if (locacaoData) {
        setLocal(locacaoData.id_local);
        setCategoria(locacaoData.id_categoria);
        setModelo(locacaoData.modelo_veiculo);
        setHoraRetirada(locacaoData.hora_retirada);
        setHoraEntrega(locacaoData.hora_entrega);
        setValorCategoria(locacaoData.vl_categoria.toString());
        setDataRetirada(new Date(locacaoData.data_retirada));
        setDataEntrega(new Date(locacaoData.data_entrega));
        setAdicionais(locacaoData.custos_ad);
        calculateDiaria(parseFloat(locacaoData.vl_categoria));
        calculateTotal();
      }
    }, [route.params?.locacaoData]);
  
    const handleDateRetiradaChange = (event, date) => {
      setShowDatePickerRetirada(Platform.OS === 'ios' ? true : false);
      if (date) {
        setDataRetirada(date);
      }
    };
  

    const handleDateEntregaChange = (event, date) => {
        setShowDatePickerEntrega(Platform.OS === 'ios' ? true : false);
        if (date) {
            setDataEntrega(date);
        }
    };

    const handleTimeRetiradaChange = (event, date) => {
        setShowTimePickerRetirada(Platform.OS === "ios" ? true : false);
        if (date) {
            setHoraRetirada(date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
    };

    const handleTimeEntregaChange = (event, date) => {
        setShowTimePickerEntrega(Platform.OS === "ios" ? true : false);
        if (date) {
            setHoraEntrega(date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
    };

    const renderTimePickerRetirada = () => {
        return showTimePickerRetirada && (
            Platform.OS === 'ios' ?
                <DateTimePicker value={new Date()} mode="time" display="default" onChange={handleTimeRetiradaChange} />
                :
                <></>
        );
    };

    const renderTimePickerEntrega = () => {
        return showTimePickerEntrega && (
            Platform.OS === 'ios' ?
                <DateTimePicker value={new Date()} mode="time" display="default" onChange={handleTimeEntregaChange} />
                :
                <></>
        );
    };

    const renderDatePickerRetirada = () => {
        return showDatePickerRetirada && (
            Platform.OS === 'ios' ?
                <DateTimePicker value={dataRetirada} mode="date" display="default" onChange={handleDateRetiradaChange} />
                :
                <></>
        );
    };

    const renderDatePickerEntrega = () => {
        return showDatePickerEntrega && (
            Platform.OS === 'ios' ?
                <DateTimePicker value={dataEntrega} mode="date" display="default" onChange={handleDateEntregaChange} />
                :
                <></>
        );
    }

    const calculateDateDiff = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffInMilliseconds = Math.abs(dataEntrega - dataRetirada);
        return Math.round(diffInMilliseconds / oneDay);
    };


    const calculateDiaria = (diaria) => {
        const daysDifference = calculateDateDiff();
        const calculatedDiaria = diaria * daysDifference;
        setDiaria(calculatedDiaria);
        return calculatedDiaria;
    };

    const calculateTotal = () => {
        const valorAdicional = parseFloat(adicionais);
        const valorDiario = calculateDiaria(parseFloat(valorCategoria));
        const calculatedTotal = valorAdicional + valorDiario;
        setTotal(calculatedTotal);
    };

    const handleModeloChange = (itemValue) => {
        setModelo(itemValue);
        const valorCategoriaDoModelo = getValorCategoriaFromModelo(itemValue);
        setValorCategoria(valorCategoriaDoModelo.toString());
    };

    const localizacao = () => {
        navigation.navigate('Localização', route.params.id);
    };

    const getValorCategoriaFromModelo = (selectedModelo) => {
        switch (selectedModelo) {
            case "VW Gol":
            case "GM Onix":
            case "Hyundai HB20":
            case "Ford Ka":
                return 50;
            case "GM Prisma":
            case "Hyundai HB20S":
            case "VW Virtus":
                return 70;
            case "VW T-Cross":
            case "Jeep Renegade":
                return 200;
            case "Toyota Corolla":
            case "Honda Civic":
            case "Chevrolet Cruze":
                return 270;
            default:
                return 0;
        }
    };


    const atualizarLocacao = () => {
        const data = {
            "id_local": local,
            "id_categoria": categoria,
            "modelo_veiculo": modelo,
            "hora_retirada": horaRetirada,
            "hora_entrega": horaEntrega,
            "vl_categoria": valorCategoria,
            "custos_ad": adicionais,
            "data_retirada": dataRetirada,
            "data_entrega": dataEntrega,
        };

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        };

        axios.put('https://api-carronamao.azurewebsites.net/api/Locacao?id='+route.params.id+'', data, { headers })
            .then(response => {
                if (response.status === 200) {
                    alert('Locação atualizada com sucesso');
                    navigation.navigate('viewLocacao');
                }
            })
            .catch(erro => {
                console.error('Erro ao atualizar locação:', erro);
            });
    };

    return (
        <ScrollView style={estiloLocacao.scrollView}>
        <View style={estiloLocacao.body}>
            <Picker
                id="localRetirada"
                selectedValue={local}
                onValueChange={(itemValue) => setLocal(itemValue)}
                mode="dropdown"
                prompt="Selecione um local para retirada"
            >
                <Picker.Item label="Selecione um local" value="" />
                <Picker.Item label="Av. Afonso Pena, 1.000 - Centro - BH/MG" value="001" />
                <Picker.Item label="Av. Antonio Carlos, 1.001 - Pampulha - BH/MG" value="002" />
            </Picker>

            <Picker
                id="categoriaRetirada"
                selectedValue={categoria}
                onValueChange={(itemValue) => setCategoria(itemValue)}
                mode="dropdown"
                prompt="Selecione a categoria de veículos desejada"
            >
                <Picker.Item label="Selecione uma categoria" value="" />
                <Picker.Item label="SUV's" value="SUV's" />
                <Picker.Item label="Sedans" value="Sedans" />
                <Picker.Item label="Hatches" value="Hatches" />
                <Picker.Item label="Premium" value="Premium" />
            </Picker>

            <Picker
                id="modeloRetirada"
                selectedValue={modelo}
                onValueChange={(itemValue) => handleModeloChange(itemValue)}
                mode="dropdown"
                prompt="Selecione o modelo de veículo desejado"
            >
                <Picker.Item label="Selecione um modelo" value="" />
                <Picker.Item label="VW Gol" value="VW Gol" />
                <Picker.Item label="GM Onix" value="GM Onix" />
                <Picker.Item label="Hyundai HB20" value="Hyundai HB20" />
                <Picker.Item label="Ford Ka" value="Ford Ka" />
                <Picker.Item label="GM Prisma" value="GM Prisma" />
                <Picker.Item label="Hyundai HB20S" value="Hyundai HB20S" />
                <Picker.Item label="Toyota Corolla" value="Toyota Corolla" />
                <Picker.Item label="Honda Civic" value="Honda Civic" />
                <Picker.Item label="VW T-Cross" value="VW T-Cross" />
                <Picker.Item label="Jeep Renegade" value="Jeep Renegade" />
                <Picker.Item label="Chevrolet Cruze" value="Chevrolet Cruze" />
                <Picker.Item label="VW Virtus" value="VW Virtus" />
                <Picker.Item label="Toyota Yaris" value="Toyota Yaris" />

            </Picker>

            <TouchableOpacity onPress={() => setShowTimePickerRetirada(true)}>
                <TextInput
                    placeholder="Selecione a hora da retirada"
                    value={horaRetirada}
                    style={estiloLocacao.select}
                    mode="outlined"
                    label="Hora da Retirada"
                    editable={false}
                    id="horaRetirada"
                />
            </TouchableOpacity>
            {showTimePickerRetirada && (
                <DateTimePicker
                    value={dataRetirada}
                    mode="time"
                    display="default"
                    onChange={handleTimeRetiradaChange}
                />
            )}

            <TouchableOpacity onPress={() => setShowTimePickerEntrega(true)}>
                <TextInput
                    placeholder="Selecione a hora da entrega"
                    value={horaEntrega}
                    style={estiloLocacao.select}
                    mode="outlined"
                    label="Hora da Entrega"
                    editable={false}
                    id="horaEntrega"
                />
            </TouchableOpacity>
            {showTimePickerEntrega && (
                <DateTimePicker
                    value={dataEntrega}
                    mode="time"
                    display="default"
                    onChange={handleTimeEntregaChange}
                />
            )}

            <TextInput
                form="disabled"
                placeholder="Valor Diaria"
                id="valorCategoria"
                label='Valor/dia (Selecione um Modelo)'
                mode='outlined'
                style={estiloLocacao.input}
                value={valorCategoria}
            />

            <Picker
                id="custosAd"
                selectedValue={adicionais}
                onValueChange={(itemValue) => setAdicionais(itemValue)}
                mode="dropdown"
                prompt="Se preferir, contrate um adicional"
            >
                <Picker.Item label="Não, Obrigado" value="0" />
                <Picker.Item label="Proteção adicional para vidros (R$499,00)" value="499" />
                <Picker.Item label="Assento para crianças (R$249,00)" value="249" />
                <Picker.Item label="GPS (R$99,00)" value="99" />
            </Picker>

            <TouchableOpacity onPress={() => setShowDatePickerRetirada(true)}>
                <TextInput
                    placeholder="Selecione a data da retirada"
                    id="dataRetirada"
                    value={formatDate(dataRetirada)}
                    style={estiloLocacao.select}
                    mode="outlined"
                    label="Data da Retirada"
                    editable={false}
                />
            </TouchableOpacity>
            {showDatePickerRetirada && (
                <DateTimePicker
                    value={dataRetirada}
                    mode="date"
                    display="default"
                    onChange={handleDateRetiradaChange}
                />
            )}

            <TouchableOpacity onPress={() => setShowDatePickerEntrega(true)}>
                <TextInput
                    placeholder="Selecione a data da entrega"
                    id="dataEntrega"
                    value={formatDate(dataEntrega)}
                    style={estiloLocacao.select}
                    mode="outlined"
                    label="Data da Entrega"
                    editable={false}
                />
            </TouchableOpacity>
            {showDatePickerEntrega && (
                <DateTimePicker
                    value={dataEntrega}
                    mode="date"
                    display="default"
                    onChange={handleDateEntregaChange}
                />
            )}

            <Text style={estiloLocacao.vlTotal} id="vlTotal">O valor total da(s) diária(s) é de R$ {total}</Text>
            <Button style={estiloLocacao.botaoLocalizacao} mode="contained" onPress={localizacao}>Localização</Button>
            <Button style={estiloLocacao.calculateTotal} mode="contained" onPress={calculateTotal}>Calcular Total</Button>
            <Button style={estiloLocacao.botaoSave} mode="contained" onPress={atualizarLocacao}>Salvar Edições</Button>
        </View>
        </ScrollView>
    )


}



export default EditarLocacao;