import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput, Button } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import estiloLocacao from "../../estilos/estiloLocacao";
import { RecuperaToken } from "../../Autenticação/autenticacao";

const formatDate = (date) => {
    if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    } else {
        return 'Data inválida';
    }
};



const EditarLocacao = ({ route, navigation }) => {
    const [token, setToken] = useState(null);

    const [locacaoData, setLocacaoData] = useState({

        id_local: "",
        id_categoria: "",
        modelo_veiculo: "",
        hora_retirada: "",
        hora_entrega: "",
        vl_categoria: "",
        data_retirada: new Date().toISOString(),
        data_entrega: new Date().toISOString(),
        custos_ad: "",
        total: 0,
    });
    const [id_local, setId_Local] = useState();
    const [id_categoria, setId_Categoria] = useState();
    const [modelo_veiculo, setModelo_Veiculo] = useState();
    const [hora_retirada, setHora_Retirada] = useState();
    const [hora_entrega, setHora_Entrega] = useState();
    const [vl_categoria, setVl_Categoria] = useState();
    const [custos_ad, setCustos_Ad] = useState();
    const [data_retirada, setData_Retirada] = useState();
    const [data_entrega, setData_Entrega] = useState();

    const [showDatePickerRetirada, setShowDatePickerRetirada] = useState(false);
    const [showDatePickerEntrega, setShowDatePickerEntrega] = useState(false);
    const [showTimePickerRetirada, setShowTimePickerRetirada] = useState(false);
    const [showTimePickerEntrega, setShowTimePickerEntrega] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);

                const response = await axios.get('https://api-carronamao.azurewebsites.net/api/Locacao?id=' + route.params.id + '', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + jwtToken
                    }
                });
                console.log(route.params.id)
                if (response.status === 200) {
                    setLocacaoData(response.data);
                    setId_Local(response.data.id_local);
                    setId_Categoria(response.data.id_categoria);
                    setModelo_Veiculo(response.data.modelo_veiculo);
                    setHora_Retirada(response.data.hora_retirada);
                    setHora_Entrega(response.data.hora_entrega);
                    setVl_Categoria(response.data.vl_categoria);
                    setCustos_Ad(response.data.custos_ad);
                    setData_Retirada(response.data.data_retirada);
                    setData_Entrega(response.data.data_entrega);
                }
                console.log('depois de passar set', response.data)
            } catch (error) {
                console.error('Erro ao recuperar token ou detalhes da locação:', error);
            }
        }
        fetchData();
    }, [route.params.id]);

    const handleDateRetiradaChange = (event, date) => {
        setShowDatePickerRetirada(Platform.OS === 'ios' ? true : false);
        if (date) {
            setLocacaoData({ ...locacaoData, data_retirada: date.toISOString() });
        }
    };

    const handleDateEntregaChange = (event, date) => {
        setShowDatePickerEntrega(Platform.OS === 'ios' ? true : false);
        if (date) {
            setLocacaoData({ ...locacaoData, data_entrega: date.toISOString() });
        }
    };

    const handleTimeRetiradaChange = (event, date) => {
        setShowTimePickerRetirada(Platform.OS === "ios" ? true : false);
        if (date) {
            setLocacaoData({ ...locacaoData, hora_retirada: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), data_retirada: date.toISOString() });
        }
    };

    const handleTimeEntregaChange = (event, date) => {
        setShowTimePickerEntrega(Platform.OS === "ios" ? true : false);
        if (date) {
            setLocacaoData({ ...locacaoData, hora_entrega: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), data_entrega: date.toISOString() });
        }
    };


    const calculateTotal = () => {
        const valorAdicional = parseFloat(locacaoData.custos_ad);
        const valorDiario = calculateDiaria(parseFloat(locacaoData.vl_categoria));
        const calculatedTotal = valorAdicional + valorDiario;
        setLocacaoData({ ...locacaoData, total: calculatedTotal });
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
            "id_local": id_local,
            "id_categoria": id_categoria,
            "modelo_veiculo": modelo_veiculo,
            "hora_retirada": hora_retirada,
            "hora_entrega": hora_entrega,
            "vl_categoria": vl_categoria,
            "custos_ad": custos_ad,
            "data_retirada": data_retirada,
            "data_entrega": data_entrega,
        };

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        };

        axios.put('https://api-carronamao.azurewebsites.net/api/Locacao?id=' + route.params.id + '', data, { headers })
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
                    selectedValue={id_local}
                    onValueChange={(value) => setId_Local(value)}
                    mode="dropdown"
                    prompt="Selecione um local para retirada"
                >
                    <Picker.Item label="Selecione um local" value="" />
                    <Picker.Item label="Av. Afonso Pena, 1.000 - Centro - BH/MG" value="001" />
                </Picker>

                <Picker
                    id="categoriaRetirada"
                    selectedValue={locacaoData.id_categoria}
                    style={estiloLocacao.select}
                    onValueChange={(itemValue) => setLocacaoData({ ...locacaoData, id_categoria: itemValue })}
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
                    value={locacaoData.modelo_veiculo}
                    onValueChange={(itemValue) => setLocacaoData({ ...locacaoData, modelo_veiculo: itemValue })}
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
                        value={locacaoData.hora_retirada}
                        onChangeText={(text) => setLocacaoData({ ...locacaoData, hora_retirada: text })}
                        style={estiloLocacao.select}
                        mode="outlined"
                        label="Hora da Retirada"
                        editable={false}
                        id="horaRetirada"
                    />

                </TouchableOpacity>
                {showTimePickerRetirada && (
                    <DateTimePicker
                        value={locacaoData.data_retirada}
                        mode="time"
                        display="default"
                        onChange={handleTimeRetiradaChange}
                    />
                )}

                <TouchableOpacity onPress={() => setShowTimePickerEntrega(true)}>
                    <TextInput
                        placeholder="Selecione a hora da entrega"
                        value={locacaoData.hora_entrega}
                        style={estiloLocacao.select}
                        mode="outlined"
                        label="Hora da Entrega"
                        editable={false}
                        id="horaEntrega"
                    />
                </TouchableOpacity>
                {showTimePickerEntrega && (
                    <DateTimePicker
                        value={locacaoData.data_entrega}
                        mode="time"
                        display="default"
                        onChange={handleTimeEntregaChange}
                    />
                )}

                <TextInput
                    form="disabled"
                    placeholder="Valor Diária"
                    id="valorCategoria"
                    label='Valor/dia (Selecione um Modelo)'
                    mode='outlined'
                    style={estiloLocacao.input}
                    value={locacaoData.vl_categoria}
                />

                <Picker
                    id="custosAd"
                    selectedValue={locacaoData.custos_ad}
                    onValueChange={(itemValue) => setLocacaoData({ ...locacaoData, custos_ad: itemValue })}
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
                        value={formatDate(locacaoData.data_retirada)}
                        style={estiloLocacao.select}
                        mode="outlined"
                        label="Data da Retirada"
                        editable={false}
                    />
                </TouchableOpacity>
                {showDatePickerRetirada && (
                    <DateTimePicker
                        value={locacaoData.data_retirada}
                        mode="date"
                        display="default"
                        onChange={handleDateRetiradaChange}
                    />
                )}

                <TouchableOpacity onPress={() => setShowDatePickerEntrega(true)}>
                    <TextInput
                        placeholder="Selecione a data da entrega"
                        id="dataEntrega"
                        value={formatDate(locacaoData.data_entrega)}
                        style={estiloLocacao.select}
                        mode="outlined"
                        label="Data da Entrega"
                        editable={false}
                    />
                </TouchableOpacity>
                {showDatePickerEntrega && (
                    <DateTimePicker
                        value={locacaoData.data_entrega}
                        mode="date"
                        display="default"
                        onChange={handleDateEntregaChange}
                    />
                )}

                <Text style={estiloLocacao.vlTotal} id="vlTotal">O valor total da(s) diária(s) é de R$ {locacaoData.total}</Text>
                <Button style={estiloLocacao.botaoLocalizacao} mode="contained" onPress={localizacao}>Localização</Button>
                <Button style={estiloLocacao.calculateTotal} mode="contained" onPress={calculateTotal}>Calcular Total</Button>
                <Button style={estiloLocacao.botaoSave} mode="contained" onPress={atualizarLocacao}>Salvar Edições</Button>
            </View>
        </ScrollView>
    )


}


export default EditarLocacao;