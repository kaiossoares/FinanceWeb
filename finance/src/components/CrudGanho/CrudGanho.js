import React, { Component } from 'react'
import axios from 'axios'
import './CrudGanho.css'
import Main from '../template/Main'

const urlAPI = "http://localhost:5165/api/ganho";
const title = "Ganhos a cada mês";

const initialState = {
    ganho: { id: 0, nomeGanho: '', valorGanho: 0 },
    lista: []
}

export default class CrudGanho extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaGanhos" id="tblListaGanhos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Nome Ganho</th>
                            <th className="tabTituloCurso">Valor Ganho</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (ganho) =>
                                <tr key={ganho.id}>
                                    <td>{ganho.nomeGanho}</td>
                                    <td>{ganho.valorGanho}</td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }
}