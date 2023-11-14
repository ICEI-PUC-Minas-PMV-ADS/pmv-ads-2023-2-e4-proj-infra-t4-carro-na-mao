import axios from "axios";
import React, { useState, useEffect } from "react";
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { View, StyleSheet } from "react-native";
import { useNavigation, Link } from "@react-navigation/native";
import { TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const cadastrarLocacao = () => {
    const [token, setToken] = useState(null)
    const navigation = useNavigation()
    const [diaria, setDiaria] = useState(0);
    const [total, setTotal] = useState(0);
    const [diffInDays, setDiffInDays] = useState(0);




    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData()
    }, []);

    const calculateDateDiff = () => {
        const dataRetirada = new Date(document.querySelector("#dataRetirada").value);
        const dataEntrega = new Date(document.querySelector("#dataEntrega").value);

        const diffInTime = Math.abs(dataEntrega - dataRetirada);
        const timeInOneDay = 1000 * 60 * 60 * 24;
        const differenceInDays = diffInTime / timeInOneDay;
        setDiffInDays(differenceInDays);
        return differenceInDays;
    };



    const calculateDiaria = () => {
        const valorCategoria = parseFloat(document.querySelector("#valorCategoria").value);
        const daysDifference = calculateDateDiff();
        const calculatedDiaria = valorCategoria * daysDifference;
        setDiaria(calculatedDiaria);
        return calculatedDiaria;
    };

    const calculateTotal = () => {
        const valorAdicional = parseFloat(document.querySelector("#custosAd").value);
        const valorDiario = calculateDiaria();
        const calculatedTotal = valorAdicional + valorDiario;
        setTotal(calculatedTotal);
    };

    const handleModeloChange = () => {
        const select = document.getElementById('modeloRetirada');
        const input = document.getElementById('valorCategoria');

        const selectedValue = select.value;
        const selectedOption = select.options[select.selectedIndex];

        if (selectedValue !== "Selecione um modelo") {
            input.value = selectedOption.getAttribute('value');
        } else {
            input.value = '';
        }
    };

    const registrarLocacao = () => {
        const local = document.querySelector('#localRetirada').value
        const categoria = document.querySelector('#categoriaRetirada').value
        const modelo = document.querySelector('#modeloRetirada').value
        const horaRetirada = document.querySelector("#horaRetirada").value
        const horaEntrega = document.querySelector('#horaEntrega').value
        const valor = document.querySelector("#valorCategoria").value
        const custosAd = document.querySelector("#custosAd").value
        const dataRetirada = document.querySelector("#dataRetirada").value
        const dataEntrega = document.querySelector("#dataEntrega").value

        const data = {
            "id_local": local,
            "id_categoria": categoria,
            "modelo_veiculo": modelo,
            "hora_retirada": horaRetirada,
            "hora_entrega": horaEntrega,
            "vl_categoria": valor,
            "custos_ad": custosAd,
            "data_retirada": dataRetirada,
            "data_entrega": dataEntrega,
        }
        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }

        axios.post('https://api-carronamao.azurewebsites.net/api/Locacao', data, { headers }).then(response => {
            if (response.status == 200) {
                alert('Cadastrado com sucesso')
                navigation.navigate('viewLocacao')
            }
        }).catch(erro => {

        })

        return (
            <View>
                <select>
                    <label>Selecione um local para retirada</label>
                    <option id="localRetirada">Selecione um local</option>
                    <option value="001">Av. Afonso Pena, 1.000 - Centro - BH/MG</option>
                    <option value="002">Av. Antonio Carlos, 1.001 - Pampulha - BH/MG</option>
                </select>

                <select id="categoriaRetirada">
                    <label id="labCategoria">Selecione a categoria de veículos desejada</label>
                    <option id="selecCat">Selecione uma categoria</option>
                    <option value="SUV's">SUV's</option>
                    <option value="Sedans">Sedans</option>
                    <option value="Hatches">Hatches</option>
                    <option value="Premium">Premium</option>
                </select>

                <select id="modeloRetirada" onChange={handleModeloChange}>
                    <label id="labModelo">Selecione o modelo de veículo desejado</label>
                    <option id="Selec">Selecione um modelo</option>
                    <option id="HatchGol" value="50">VW Gol</option>
                    <option id="HatchOnix" value="50">GM Onix</option>
                    <option id="HatchHB20" value="50">Hyundai HB20</option>
                    <option id="HatchKa" value="50">Ford Ka</option>
                    <option id="SedanPrisma" value="70">GM Prisma</option>
                    <option id="SedanHB20S" value="70">Hyundai HB20S</option>
                    <option id="PremiumCorolla" value="270">Toyota Corolla</option>
                    <option id="PremiumCivic" value="270">Honda Civic</option>
                    <option id="SuvTcross" value="200">VW T-Cross</option>
                    <option id="SuvRenegade" value="200">Jeep Renegade</option>
                </select>

                <TextInput
                    placeholder="Selecione a hora da retirada"
                    id="horaRetirada"
                    type="time"
                    label='Hora da Retirada'
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    placeholder="Selecione a hora da entrega"
                    id="horaEntrega"
                    type="time"
                    label='Hora da Entrega'
                    mode='outlined'
                    style={styles.input}
                />

                <TextInput
                    placeholder="Valor Diaria"
                    id="valorCategoria"
                    label='Valor/dia (Selecione um Modelo)'
                    mode='outlined'
                    style={styles.input}

                />
                <select id="custosAd">
                    <label id="labCustos">Se preferir, contrate um adicional</label>
                    <option value="0">Não, obrigado</option>
                    <option value="499">Proteção adicional para vidros (R$499,00)</option>
                    <option value="249">Assento para crianças (R$249,00)</option>
                    <option value="99">GPS (R$99,00)</option>
                </select>

                <TextInput
                    placeholder="Selecione a data da retirada"
                    id="dataRetirada"
                    type="date"
                    label='Data da Retirada'
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    placeholder="Selecione a data da entrega"
                    id="dataEntrega"
                    type="date"
                    label='Data da Entrega'
                    mode='outlined'
                    style={styles.input}
                />

                <h3 id="vlTotal">O valor total da(s) diária(s) é de R$ <span>{total}</span></h3>
                <Button id="calc" onClick={calculateTotal}>Calcular Total</Button>
                <Button style={styles.botao} mode="contained" onPress={() => registrarLocacao()}>Salvar</Button>
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
}
export default cadastrarLocacao;