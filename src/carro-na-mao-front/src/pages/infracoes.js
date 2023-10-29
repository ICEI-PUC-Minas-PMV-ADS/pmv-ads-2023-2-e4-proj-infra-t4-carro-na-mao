import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
//import '../estilos/infracoes.css';

function Infracoes() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [detalhe, setDetalhe] = useState('');
  const [infração, setInfracao] = useState(null);

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

  const buscarInfracao = async () => {
    try {
      const response = await axios.get(`https://api-seu-backend.com/api/infracoes/${detalhe}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      if (response.status === 200) {
        setInfracao(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar infração:', error);
    }
  };

  return (
    <>
      <Menu />

      <section>
        <div class="container">
          <div>
            <h3 >Infrações de trânsito</h3>
          </div>
        </div >
        <div class="container">
          <h5 >Dados do Veículo e Infração:</h5>
        </div>

        <div>
          <div class="container">
            <div>
              <label>Digite o numero do seu contrato:</label>
              <input
                type="text"
                id="detalhe"
                placeholder='Número do contrato'
                value={detalhe}
                onChange={(e) => setDetalhe(e.target.value)}
              />
            </div>
          </div>
        </div>

        <hr />

        <div >
          <button id="btnCadastrar" onClick={buscarInfracao}>Buscar Infração</button>
        </div>

        {infração && (
          <div>
            <h2>Detalhes da Infração:</h2>
            <p>Descrição: {infração.descricao}</p>
            <p>Data da Infração: {infração.data}</p>
            <p>Valor da Multa: R$ {infração.valor}</p>
            <p>Local da Infração: {infração.local}</p>
          </div>
        )}

        <br />
        <Link to="/">Voltar</Link>
      </section>
    </>
  );
}

export default Infracoes;
