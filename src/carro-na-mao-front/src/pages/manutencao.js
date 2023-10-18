import React, { Component } from 'react';
import './manutencao.css';
class ManutencaoVeiculo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_manutencao: 0,
      id_veiculo: 0,
      data_inicio: '',
      tipo: false,
      descricao: '',
      valor_nf: '',
      hora_oficina: '',
      previsao_termino: '',
      id_vistoria: 0,
    };
  }

  handleInputChange = (e) => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  }

  render() {
    return (
      <div>
        <h1>Tela de Manutenção de Veículo</h1>
        <form>
          <div>
            <label>ID de Manutenção:</label>
            <input
              type="number"
              name="id_manutencao"
              value={this.state.id_manutencao}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>ID de Veículo:</label>
            <input
              type="number"
              name="id_veiculo"
              value={this.state.id_veiculo}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Data de Início:</label>
            <input
              type="date"
              name="data_inicio"
              value={this.state.data_inicio}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Tipo:</label>
            <input
              type="checkbox"
              name="tipo"
              checked={this.state.tipo}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Descrição:</label>
            <input
              type="text"
              name="descricao"
              value={this.state.descricao}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Valor da Nota Fiscal:</label>
            <input
              type="text"
              name="valor_nf"
              value={this.state.valor_nf}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Hora na Oficina:</label>
            <input
              type="text"
              name="hora_oficina"
              value={this.state.hora_oficina}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Previsão de Término:</label>
            <input
              type="date"
              name="previsao_termino"
              value={this.state.previsao_termino}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>ID de Vistoria:</label>
            <input
              type="number"
              name="id_vistoria"
              value={this.state.id_vistoria}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }
}

export default ManutencaoVeiculo;
