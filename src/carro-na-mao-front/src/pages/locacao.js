import React, { useEffect, useState } from "react";
import axios from 'axios';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/locacao.css';

function Locacao() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [diaria, setDiaria] = useState(0);
    const [total, setTotal] = useState(0);
    const [diffInDays, setDiffInDays] = useState(0);
    const [reserva, setReservar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectLocacao, setSelectLocacao] = useState(null);


    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = await RecuperaToken();
                setToken(jwtToken);

                const response = await axios.get('https://api-carronamao.azurewebsites.net/api/Locacao', {
                    headers: {
                        "Authorization": 'Bearer ' + jwtToken
                    }
                });
                setReservar(response.data)
                setIsLoading(false);

            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        }
        fetchData();
    }, []);



    const reservar = () => {
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
            "data_entrega": dataEntrega
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }


        if (selectLocacao && selectLocacao.id_locacao) {
            axios.put(`https://api-carronamao.azurewebsites.net/api/Locacao?id=${selectLocacao.id_locacao}`, data, { headers })
                .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                        alert("Solicitação de locação realizado com sucesso!");
                        return navigate("/Locacao");
                    }
                })
                .catch(error => {
                    alert(error.status);
                });
        } else {
            axios.post('https://api-carronamao.azurewebsites.net/api/Locacao', data, { headers })
                .then(response => {
                    console.log(response.status)
                    if (response.status === 200) {
                        alert('Reserva Cadastrada com sucesso')
                        return navigate("/Locacao")
                    }
                }
                ).catch(error => {
                    alert(error.status)
                })
        }
    }

    const excluir = () => {
        if (selectLocacao && selectLocacao.id_locacao) {
            axios.delete(`https://api-carronamao.azurewebsites.net/api/Locacao?id=${selectLocacao.id_locacao}`, {
                headers: {
                    "Authorization": 'Bearer ' + token
                }
            })
                .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                        alert("Reserva excluída com sucesso!");
                        return navigate("/Locacao");
                    }
                })
                .catch(error => {
                    alert(error);
                });
        }
    }

    const handleLocacaoClick = (reservar) => {
        setSelectLocacao(reservar);
        document.querySelector("#localRetirada").value = reservar.id_local;
        document.querySelector("#categoriaRetirada").value = reservar.id_categoria;
        document.querySelector("#modeloRetirada").value = reservar.modelo_veiculo;
        document.querySelector("#horaRetirada").value = reservar.hora_retirada;
        document.querySelector("#horaEntrega").value = reservar.hora_entrega;
        document.querySelector("#valorCategoria").value = reservar.vl_categoria;
        document.querySelector("#custosAd").value = reservar.custos_ad;
        document.querySelector("#dataRetirada").value = reservar.data_retirada;
        document.querySelector("#dataEntrega").value = reservar.data_entrega;
    }

    const limparCampos = () => {
        document.querySelector("#localRetirada").value = ''
        document.querySelector("#categoriaRetirada").value = ''
        document.querySelector("#modeloRetirada").value = ''
        document.querySelector("#horaRetirada").value = ''
        document.querySelector("#horaEntrega").value = ''
        document.querySelector("#valorCategoria").value = ''
        document.querySelector("#custosAd").value = ''
        document.querySelector("#dataRetirada").value = ''
        document.querySelector("#dataEntrega").value = ''
    }


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

    return (
    <div id="fundoLocacao">
            <Menu />

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading"></div>
                </div>
            ) : (

                <>
                    <div id="divLocacoes">
                        <ul>
                            {reserva.map(reservar => (
                                <li key={reservar.id_locacao} onClick={() => handleLocacaoClick(reservar)}
                                >{reservar.data_retirada}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            <section id="campos">



                <label id="labLocal">Selecione o local para retirada</label>
                <select id="localRetirada">
                    <option id="SelecLoc">Selecione um local</option>
                    <option value="001">Av. Afonso Pena, 1.000 - Centro - BH/MG</option>
                    <option value="002">Av. Antonio Carlos, 1.001 - Pampulha - BH/MG</option>
                </select>

                <label id="labCategoria">Selecione a categoria de veículos desejada</label>
                <select id="categoriaRetirada">
                    <option id="selecCat">Selecione uma categoria</option>
                    <option value="SUV's">SUV's</option>
                    <option value="Sedans">Sedans</option>
                    <option value="Hatches">Hatches</option>
                    <option value="Premium">Premium</option>
                </select>

                <label id="labModelo">Selecione o modelo de veículo desejado</label>
                <select id="modeloRetirada" onChange={handleModeloChange}>
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

                <label id="labHrRetirada">Selecione a hora da retirada</label>
                <input type="time" id="horaRetirada"></input>

                <label id="labHrEntrega">Selecione a hora da entrega</label>
                <input type="time" id="horaEntrega"></input>

                <label id="labValor">Valor/dia (Selecione um Modelo)</label>
                <input type="number" id="valorCategoria"></input>

                <label id="labCustos">Se preferir, contrate um adicional</label>
                <select id="custosAd">
                    <option value="0">Não, obrigado</option>
                    <option value="499">Proteção adicional para vidros (R$499,00)</option>
                    <option value="249">Assento para crianças (R$249,00)</option>
                    <option value="99">GPS (R$99,00)</option>
                </select>

                <label id="labDtRetirada">Selecione a data da retirada</label>
                <input type="date" id="dataRetirada"></input>

                <label id="labDtEntrega">Selecione a data da entrega</label>
                <input type="date" id="dataEntrega" placeholder='Selecione a data de entrega'></input>

                <h3 id="vlTotal">O valor total da(s) diária(s) é de R$ <span>{total}</span></h3>

                <div>
                    <button id="btnReservar" onClick={reservar}>Reservar</button>
                </div>
               <br />
                <div>
                    <button id="calc" onClick={calculateTotal}>Calcular Total</button>
             
                    <button id="btnRegistro" onClick={limparCampos}>Novo Registro</button>
       
                    <button id="btnExcluir" onClick={excluir}>Excluir</button>
                    <br />

                </div>

            </section>
        </div>
    )
}
export default Locacao;