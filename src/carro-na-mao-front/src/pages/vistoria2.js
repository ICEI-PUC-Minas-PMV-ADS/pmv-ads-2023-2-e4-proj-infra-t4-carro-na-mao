import React, { useState } from 'react';
import axios from 'axios';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/vistoria.css';

function BuscarVistorias() {
  const [veiculo, setVeiculo] = useState('');
  const [vistorias, setVistorias] = useState([]);
  const [token, setToken] = useState(null);

  const buscarVistorias = async () => {
    try {
      const jwtToken = await RecuperaToken();
      setToken(jwtToken);

      const response = await axios.get(
        `https://api-carronamao.azurewebsites.net/api/Vistorias?veiculo=${veiculo}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      const ultimas50Vistorias = response.data.slice(0, 50);
      setVistorias(ultimas50Vistorias);
    } catch (error) {
      console.error('Erro ao buscar vistorias:', error);
    }
  }

  return (
  <>
    <Menu />

      <section id="cmp">        
          <h3>Buscar Vistorias por Veículo</h3>
          <label>Digite o ID do Veículo:</label>
          <input
            type="text"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
          />
          <button onClick={buscarVistorias}>Buscar Vistorias</button>

          <h4>Últimas 50 Vistorias do Veículo:</h4>
          <div >
          <table>
            <thead>
              <tr>
                <th>ID da Vistoria</th>
                <th>ID do Veículo</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Observações</th>
                <th>Criou Manutenção?</th>
              </tr>
            </thead>
            <tbody>
              {vistorias.map((vistoria) => (
                <tr key={vistoria.id_vistoria}>
                  <td>{vistoria.id_vistoria}</td>
                  <td>{vistoria.id_veiculo}</td>
                  <td>{vistoria.tipo}</td>
                  <td>{vistoria.descricao}</td>
                  <td>{vistoria.observacoes}</td>
                  <td>{vistoria.cria_ordem_manut ? 'Sim' : 'Não'}</td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
<div>
     <a href="javascript:history.back()">Voltar</a>
     </div>
      </section>
      <br></br>
    
      </>
      );
      
}

      export default BuscarVistorias;

