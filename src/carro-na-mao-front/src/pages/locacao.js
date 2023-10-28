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

             const headers ={
                "Content-Type":"application/json",
                "Authorization": 'Bearer ' + token
               }

               axios.post('https://api-carronamao.azurewebsites.net/api/Locacao',data,{headers})
              .then(response =>{
                  console.log(response.status)
                  if(response.status===200){
                      alert('Reserva Cadastrada com sucesso')
                     return navigate("/Locacao")
                  }
                }
                ).catch(error => {
                  alert(error.status)
              })
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
    };

    return (
        
        <>
            <Menu />
            <section id="campos">
            <input type="text" id="localRetirada" placeholder='Escolha o Local'></input>
        <input type="text" id="categoriaRetirada" placeholder='Escolha a Categoria' ></input>
        <input type="text" id="modeloRetirada" placeholder='Escolha o Modelo'></input>
        <input type="time" id="horaRetirada" placeholder='Selecione a hora da retirada'></input>
        <input type="time" id="horaEntrega" placeholder='Selecione a hora da entrega'></input>
        <input type="number" id="valorCategoria" placeholder='Valor'></input>
        <input type="number" id="custosAd" placeholder='Adicionais'></input>
        <input type="date" id="dataRetirada" placeholder='Selecione a data de retirada'></input>
        <input type="date" id="dataEntrega" placeholder='Selecione a data de entrega'></input>
                <h1 id="vlTotal">R$ <span>{diaria}</span></h1>

                <div>
                    <button id="btnReservar" onClick={reservar}>Reservar</button>
                </div>

                <div>
                    <button id="calc" onClick={calculateDiaria}>Calcular Total</button>
                </div>
            </section>
        </>
    );

    }
export default Locacao;