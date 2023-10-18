import axios from 'axios';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import './vistoria.css';

class VistoriaVeiculo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Id_vistoria: 0,
        id_veiculo: 0,
        tipo: false,
        data: '',
        descricao: '',
        observacoes: '',
        cria_manutencao: false,
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
          <h1>Tela de Vistoria de Veículo</h1>
          <form>
            <div>
              <label>ID de Vistoria:</label>
              <input
                type="number"
                name="Id_vistoria"
                value={this.state.Id_vistoria}
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
              <label>Tipo:</label>
              <input
                type="checkbox"
                name="tipo"
                checked={this.state.tipo}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label>Data:</label>
              <input
                type="date"
                name="data"
                value={this.state.data}
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
              <label>Observações:</label>
              <input
                type="text"
                name="observacoes"
                value={this.state.observacoes}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label>Criar Manutenção:</label>
              <input
                type="checkbox"
                name="cria_manutencao"
                checked={this.state.cria_manutencao}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit">Salvar</button>
          </form>
        </div>
      );
    }
  }
  

export default VistoriaVeiculo;