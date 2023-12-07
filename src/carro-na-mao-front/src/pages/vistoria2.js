import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/vistoria.css';

function BuscarVistorias() {
  const [veiculo, setVeiculo] = useState('');
  const [vistorias, setVistorias] = useState([]);
  const [token, setToken] = useState(null);

  const [editingVistoriaId, setEditingVistoriaId] = useState(null);
  const [formData, setFormData] = useState({
    descricao: '',
    observacoes: '',
    veiculo: '',
    tipo: '0',
    data: '', // Corrigido para "data"
    cria_ordem_manut: 'true',
  });
  const [editingVeiculo, setEditingVeiculo] = useState('');
  const [editingTipo, setEditingTipo] = useState('0');
  const [editingData, setEditingData] = useState('');
  const [editingCriaOrdemManut, setEditingCriaOrdemManut] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwtToken = await RecuperaToken();
        setToken(jwtToken);
      } catch (error) {
        console.error('Erro ao recuperar token:', error);
      }
    };
    fetchToken();
  }, []);

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

      const ultimas20Vistorias = response.data.slice(0, 20);
      setVistorias(ultimas20Vistorias);

      if (ultimas20Vistorias.length > 0) {
        setEditingData(ultimas20Vistorias[0].data);
      }
    } catch (error) {
      console.error('Erro ao buscar vistorias:', error);
    }
  };

  const handleEditVistoria = (vistoriaId, descricao, observacoes, veiculo, tipo, data, cria_ordem_manut) => {
    setEditingVistoriaId(vistoriaId);
    setFormData({
      descricao,
      observacoes,
      veiculo,
      tipo,
      data,
      cria_ordem_manut,
    });
    setEditingVeiculo(veiculo);
    setEditingTipo(tipo);
    setEditingData(data);
    setEditingCriaOrdemManut(cria_ordem_manut);
  };

  const handleCancelEdit = () => {
    setEditingVistoriaId(null);
  };

  const handleSaveEdit = async (vistoriaId) => {
    try {
      const jwtToken = await RecuperaToken();
      setToken(jwtToken);

      const response = await axios.put(
        `https://api-carronamao.azurewebsites.net/api/Vistorias/${vistoriaId}`,
        {
          descricao: formData.descricao,
          observacoes: formData.observacoes,
          veiculo: formData.veiculo,
          tipo: formData.tipo,
          data: formData.data, // Corrigido para "data"
          cria_ordem_manut: formData.cria_ordem_manut,
        },
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      if (response.status === 200) {
        alert('Vistoria atualizada com sucesso.');
        setEditingVistoriaId(null);
        buscarVistorias();
      }
    } catch (error) {
      alert('Erro ao atualizar a vistoria:', error);
    }
  };

  const handleDeleteVistoria = async (vistoriaId) => {
    try {
      const jwtToken = await RecuperaToken();
      setToken(jwtToken);

      const response = await axios.delete(
        `https://api-carronamao.azurewebsites.net/api/Vistorias/${vistoriaId}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      if (response.status === 200) {
        alert('Vistoria excluída com sucesso.');
        buscarVistorias();
      }
    } catch (error) {
      alert('Erro ao excluir a vistoria:', error);
    }
  };

  return (
    <div id="fundoVistoria2">
      <Menu />

      <section id="camposVistoria2">
        <h3>Buscar Vistorias por Veículo</h3>
        <label>Digite o ID do Veículo:</label>
        <input id="inputPesquisaVistoria2" type="text" value={veiculo} onChange={(e) => setVeiculo(e.target.value)} />
        <button id="buttontoria2" onClick={buscarVistorias}>Buscar Vistorias</button>

        <h4>Últimas 20 Vistorias do Veículo:</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID da Vistoria</th>
                <th>ID do Veículo</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Observações</th>
                <th>Data vistoria</th>
                <th>Criou Manutenção?</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vistorias.map((vistoria) => (
                <tr key={vistoria.id_vistoria}>
                  <td>{vistoria.id_vistoria}</td>
                  {vistoria.id_vistoria === editingVistoriaId ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={formData.veiculo}
                          onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
                        />
                      </td>
                      <td>
                        <select
                          value={editingTipo}
                          onChange={(e) => setEditingTipo(e.target.value)}
                        >
                          <option value="0">Retorno de veículo</option>
                          <option value="1">Saída de veículo</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={formData.descricao}
                          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={formData.observacoes}
                          onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editingData}
                          onChange={(e) => setEditingData(e.target.value)}
                        />
                      </td>
                      <td>
                        <select
                          value={editingCriaOrdemManut ? 'true' : 'false'}
                          onChange={(e) => setEditingCriaOrdemManut(e.target.value === 'true')}
                        >
                          <option value="true">Sim</option>
                          <option value="false">Não</option>
                        </select>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{vistoria.id_veiculo}</td>
                      <td>
                        {vistoria.tipo === 0 ? 'Retorno de veículo' : 'Saída de veículo'}
                      </td>
                      <td>{vistoria.descricao}</td>
                      <td>{vistoria.observacoes}</td>
                      <td>{vistoria.data}</td>
                    </>
                  )}
                  <td>{vistoria.cria_ordem_manut ? 'Sim' : 'Não'}</td>
                  <td>
                    {vistoria.id_vistoria === editingVistoriaId ? (
                      <>
                        <button onClick={() => handleSaveEdit(vistoria.id_vistoria)}>Salvar</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditVistoria(vistoria.id_vistoria, vistoria.descricao, vistoria.observacoes, vistoria.id_veiculo, vistoria.tipo, vistoria.data, vistoria.cria_ordem_manut)}>
                          Editar
                        </button>
                        <button onClick={() => handleDeleteVistoria(vistoria.id_vistoria)}>Excluir</button>
                      </>
                    )}
                  </td>
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
    </div>
  );
}

export default BuscarVistorias;
