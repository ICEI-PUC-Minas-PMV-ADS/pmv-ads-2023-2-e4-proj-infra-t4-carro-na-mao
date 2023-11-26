import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { TextInput, Button, FAB } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import estiloLocacao from "../../estilos/estiloLocacao";
import { RecuperaToken } from "../../Autenticação/autenticacao";



const EditarLocacao = ({ route, navigation }) => {
    const foco = useIsFocused()
    const [token, setToken] = useState(null);
    const [diaria, setDiaria] = useState(0);
    const [diffInDays, setDiffInDays] = useState(0);

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
    const [total, setTotal] = useState(0);
    const [showDatePickerRetirada, setShowDatePickerRetirada] = useState(false);
    const [showDatePickerEntrega, setShowDatePickerEntrega] = useState(false);
    const [showTimePickerRetirada, setShowTimePickerRetirada] = useState(false);
    const [showTimePickerEntrega, setShowTimePickerEntrega] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                setToken(jwtToken)
                // recuperarDadosParaEdicao(jwtToken)
                //console.log(route.params.id.custos_ad)
                setId_Local(route.params.id.id_local)
                setId_Categoria(route.params.id.id_categoria)
                setModelo_Veiculo(route.params.id.modelo_veiculo)
                setHora_Retirada(route.params.id.hora_retirada)
                setHora_Entrega(route.params.id.hora_entrega)
                setVl_Categoria(route.params.id.vl_categoria)
                setCustos_Ad(route.params.id.custos_ad)
                setData_Retirada(route.params.id.data_retirada)
                setData_Entrega(route.params.id.data_entrega)


            } catch (erro) { console.log('Algo deu errado') }
        }
        fetchData();
        //recuperarDadosParaEdicao(token)
    }, [foco]);

    function recuperarDadosParaEdicao(jwtToken) {
        console.log(route.params.id)
        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + jwtToken
        }
        axios.get('https://api-carronamao.azurewebsites.net/api/Locacao?id=' + route.params.id + '', { headers }).then(
            response => {
                if (response.status === 200) {
                    //console.log(response.data);
                    //setId_Local(response.data.id_local)
                    /* setId_Local(response.data.id_local);
                    setId_Categoria(response.data.id_categoria);
                    setModelo_Veiculo(response.data.modelo_veiculo);
                    setHora_Retirada(response.data.hora_retirada);
                    setHora_Entrega(response.data.hora_entrega);
                    setVl_Categoria(response.data.vl_categoria);
                    setCustos_Ad(response.data.custos_ad);
                    setData_Retirada(response.data.data_retirada);
                    setData_Entrega(response.data.data_entrega);
                    console.log(response.data.id_local)*/
                    //  console.log(response.data)
                    // setId_Categoria(id_local.id_local);
                    //  console.log(response.data.data_entrega)
                }
            }).catch(error => {
                alert(error)
            })

        //setId_Categoria(id_local.id_local);
        //console.log(id_categoria)
    }


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

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = date.getDate();
        const mes = date.getMonth() + 1; // Mês começa do zero
        const ano = date.getFullYear();

        // Adiciona zero à esquerda se o dia ou mês for menor que 10
        const diaFormatado = dia < 10 ? `0${dia}` : dia;
        const mesFormatado = mes < 10 ? `0${mes}` : mes;

        return `${diaFormatado}/${mesFormatado}/${ano}`;
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
                <DateTimePicker value={data_retirada} mode="date" display="default" onChange={handleDateRetiradaChange} />
                :
                <></>
        );
    };

    const renderDatePickerEntrega = () => {
        return showDatePickerEntrega && (
            Platform.OS === 'ios' ?
                <DateTimePicker value={data_entrega} mode="date" display="default" onChange={handleDateEntregaChange} />
                :
                <></>
        );
    }

    const handleTimeEntregaChange = (event, date) => {
        setShowTimePickerEntrega(Platform.OS === "ios" ? true : false);
        if (date) {
            setLocacaoData({ ...locacaoData, hora_entrega: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), data_entrega: date.toISOString() });
        }
    };

    const calculateDateDiff = () => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const diffInMilliseconds = Math.abs(data_entrega - data_retirada);
        return Math.round(diffInMilliseconds / oneDay);
    };


    const calculateDiaria = (diaria) => {
        const daysDifference = calculateDateDiff();
        const calculatedDiaria = diaria * daysDifference;
        setDiaria(calculatedDiaria);
        return calculatedDiaria;
    };


    const calculateTotal = () => {
        const valorAdicional = parseFloat(custos_ad);
        const valorDiario = calculateDiaria(parseFloat(vl_categoria));
        const calculatedTotal = valorAdicional + valorDiario;
        setTotal(calculatedTotal);
    };


    const localizacao = () => {
        navigation.navigate('Localização', route.params.id);
    };

    const handleModeloChange = (itemIdex) => {
        setModelo_Veiculo(itemIdex);
        const valorCategoriaDoModelo = getValorCategoriaFromModelo(itemIdex);
        setVl_Categoria(valorCategoriaDoModelo.toString());
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
        <View style={estiloLocacao.body}>
            <ScrollView style={estiloLocacao.scrollView}>
                <Picker
                    id="localRetirada"
                    selectedValue={id_local}
                    onValueChange={(id_local, itemIdex) => setId_Local(id_local)}
                    mode="dropdown"
                    prompt="Selecione um local para retirada"
                    textColor="#fff"
                    style={estiloLocacao.select}
                    itemStyle={estiloLocacao.selectItem}
                >
                    <Picker.Item label="Selecione um local" value="" />
                    <Picker.Item label="Av. Afonso Pena, 1.000 - Centro - BH/MG" value="001" />
                </Picker>

                <Picker
                    id="categoriaRetirada"
                    selectedValue={id_categoria}
                    onValueChange={(id_categoria, itemIdex) => setId_Categoria(id_categoria)}
                    mode="dropdown"
                    prompt="Selecione a categoria de veículos desejada"
                    textColor="#fff"
                    style={estiloLocacao.select}
                    itemStyle={estiloLocacao.selectItem}
                >
                    <Picker.Item label="Selecione uma categoria" value="" />
                    <Picker.Item label="SUV's" value="SUV's" />
                    <Picker.Item label="Sedans" value="Sedans" />
                    <Picker.Item label="Hatches" value="Hatches" />
                    <Picker.Item label="Premium" value="Premium" />
                </Picker>

                <Picker
                    id="modeloRetirada"
                    selectedValue={modelo_veiculo}
                    onValueChange={(modelo_veiculo, itemIdex) => handleModeloChange(modelo_veiculo)}
                    mode="dropdown"
                    prompt="Selecione o modelo de veículo desejado"
                    textColor="#fff"
                    style={estiloLocacao.select}
                    itemStyle={estiloLocacao.selectItem}
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


                <TextInput
                    placeholder="Selecione a hora da retirada"
                    value={hora_retirada}
                    onChangeText={(hora_retirada) => setLocacaoData(hora_retirada)}
                    style={estiloLocacao.input}
                    mode="outlined"
                    label="Hora da Retirada"
                    editable={true}
                    id="horaRetirada"
                    textColor="#fff"
                    outlineColor="#fff"
                    display="default"
                    onChange={handleTimeRetiradaChange}
                />


                <TextInput
                    placeholder="Selecione a hora da entrega"
                    value={hora_entrega}
                    onChangeText={(hora_entrega) => setLocacaoData(hora_entrega)}
                    style={estiloLocacao.input}
                    mode="outlined"
                    label="Hora da Entrega"
                    editable={true}
                    id="horaEntrega"
                    textColor="#fff"
                    outlineColor="#fff"
                    display="default"
                    onChange={handleTimeEntregaChange}
                />

                <TextInput
                    form="disabled"
                    placeholder="Valor Diária"
                    id="valorCategoria"
                    label='Valor/dia (Selecione um Modelo)'
                    mode='outlined'
                    style={estiloLocacao.input}
                    textColor="#fff"
                    outlineColor="#fff"
                    value={vl_categoria}
                />

                <Picker
                    id="custosAd"
                    selectedValue={custos_ad}
                    onValueChange={(custos_ad, itemIdex) => setCustos_Ad(custos_ad)}
                    mode="dropdown"
                    prompt="Se preferir, contrate um adicional"
                    textColor="#fff"
                    style={estiloLocacao.select}
                    itemStyle={estiloLocacao.selectItem}
                >
                    <Picker.Item label="Não, Obrigado" value="0" />
                    <Picker.Item label="Proteção adicional para vidros (R$499,00)" value="499" />
                    <Picker.Item label="Assento para crianças (R$249,00)" value="249" />
                    <Picker.Item label="GPS (R$99,00)" value="99" />
                </Picker>

                <TextInput
                    placeholder="Selecione a data da retirada"
                    id="dataRetirada"
                    value={formatarData(data_retirada)}
                    onChangeText={(data_retirada) => setLocacaoData(data_retirada)}
                    style={estiloLocacao.input}
                    mode="outlined"
                    textColor="#fff"
                    outlineColor="#fff"
                    label="Data da Retirada"
                    editable={true}
                    onChange={handleDateRetiradaChange}
                    display="default"
                />

                <TextInput
                    placeholder="Selecione a data da entrega"
                    id="dataEntrega"
                    value={formatarData(data_entrega)}
                    onChangeText={(data_entrega) => setLocacaoData(data_entrega)}
                    style={estiloLocacao.input}
                    mode="outlined"
                    textColor="#fff"
                    outlineColor="#fff"
                    label="Data da Entrega"
                    editable={true}
                    display="default"
                    onChange={handleDateEntregaChange}
                />

                <Text style={estiloLocacao.vlTotal} id="vlTotal">O valor total da(s) diária(s) é de R$ {total}</Text>
                <FAB style={estiloLocacao.botaoLocalizacao} icon="map-marker-outline" onPress={localizacao}></FAB>
                <Button style={estiloLocacao.calculateTotal} mode="contained" onPress={calculateTotal}>Calcular Total</Button>
                <Button style={estiloLocacao.botaoSave} mode="contained" onPress={atualizarLocacao}>Salvar Edições</Button>
            </ScrollView >
        </View >

    )


}


export default EditarLocacao;