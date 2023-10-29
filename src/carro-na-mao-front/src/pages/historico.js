import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RecuperaToken } from '../autenticação/chave_de_acesso';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from './menu';
import '../estilos/historico.css';

function Historico() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [input, setInput] = useState('');
  const [historico, setHistorico] = useState(null);

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

  const consultarHistorico = async () => {
    try {
      // Realize uma solicitação ao seu servidor (back-end) para buscar informações no banco de dados com base no número do contrato.
      const response = await axios.get(`https://api-carronamao.azurewebsites.net/api/Historico=${input}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      // Se a solicitação for bem-sucedida, atualize o estado 'historico' com os dados recebidos.
      setHistorico(response.data);
    } catch (error) {
      console.error('Erro ao consultar o histórico:', error);
      // Lidar com erros, por exemplo, exibindo uma mensagem de erro.
    }
  };

  return (
    <>
      <Menu />

      <section>
        <div className="containerh1">
          <div>
            <h3>Historico de suas locações</h3>
          </div>
        </div>
        <div className="containerh2">
          <h5>Historico do Cliente:</h5>
        </div>

        <div>
          <div className="containerh3">
            <div>
              <label>Número de contrato</label>
              <input
                type="text"
                id="contrato"
                placeholder='Digite o número do contrato'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={consultarHistorico}>
                Consultar Histórico
              </button>
            </div>
            <div>
              <Link to="/">Voltar</Link>
            </div>
          </div>
        </div>

        <hr />

        {historico && (
          <div>
            <h2>Número do contrato: {historico.Contrato}</h2>
            <span>Data de Encerramento: {historico.Encerramento}</span>
            <span>Veículo: {historico.Veiculo}</span>
            <span>Valor da Locação: R$ {historico.Valores}</span>
            <span>Observação: {historico.Observacao || 'Nenhuma observação disponível'}</span>
          </div>
        )}
      </section>

      <main className="main">
        {/* Seus outros elementos aqui */}
      </main>
    </>
  );
}

export default Historico;
