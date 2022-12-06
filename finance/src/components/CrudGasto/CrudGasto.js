import React, { Component } from 'react'
import axios from 'axios'
import './CrudGasto.css'
import Main from '../template/Main'
import editButton from '../../assets/images/editButton.svg'
import deleteButton from '../../assets/images/deleteButton.svg'

const urlAPI = "http://localhost:5165/api/gasto"

const initialState = {
    gasto: { id: 0, nomeGasto: '', valorGasto: 0 },
    lista: []
}

export default class CrudGasto extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar() {
        this.setState({ gasto: initialState.gasto })
    }

    salvar() {
        const gasto = this.state.gasto
        const metodo = gasto.id ? 'put' : 'post'
        const url = gasto.id ? `${urlAPI}/${gasto.id}` : urlAPI

        axios[metodo](url, gasto)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ gasto: initialState.gasto, lista })
            })
    }

    getListaAtualizada(gasto, add = true) {
        const lista = this.state.lista.filter(g => g.id !== gasto.id)
        if (add) lista.unshift(gasto)
        return lista
    }

    atualizaCampo(event) {
        const gasto = { ...this.state.gasto }
        gasto[event.target.name] = event.target.value
        this.setState({ gasto })
    }

    mascaraMoeda(event) {
        const onlyDigits = event.target.value
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        event.target.value = this.maskCurrency(digitsFloat)
    }

    maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }

    carregar(gasto) {
        this.setState({ gasto })
    }

    remover(gasto) {
        const url = urlAPI + "/" + gasto.id
        if (window.confirm("Confirma remoção do gasto: " + gasto.nomeGasto)) {
            console.log("entrou no confirm")

            axios['delete'](url, gasto)
                .then(resp => {
                    const lista = this.getListaAtualizada(gasto, false)
                    this.setState({ gasto: initialState.gasto, lista })
                })
        }
    }

    renderTable() {

        return (
            <div className="financeCard">
                <div className="inclui-container">
                    <label> Nome do Gasto: </label>
                    <input
                        type="text"
                        id="nomeGasto"
                        placeholder="Nome do Gasto"
                        className="form-input"
                        name="nomeGasto"

                        value={this.state.gasto.nomeGasto}

                        onChange={e => this.atualizaCampo(e)}
                    />

                    <label> Valor do Ativo: </label>
                    <input
                        type="text"
                        id="valorGasto"
                        placeholder="Valor do Gasto"
                        className="form-input"
                        name="valorGasto"
                        onInput={e => this.mascaraMoeda(e)}

                        value={this.state.gasto.valorGasto}

                        onChange={e => this.atualizaCampo(e)}
                    />

                    <button className="btn"
                        onClick={e => this.salvar(e)} >
                        Salvar
                    </button>
                    <button className="btn"
                        onClick={e => this.limpar(e)} >
                        Cancelar
                    </button>
                </div>

                <div className="listagem">
                    <table className="listaGastos" id="tblListaGastos">
                        <thead>
                            <tr className="cabecTabela">
                                <th className="tabTituloNome" id='tab'>Nome do Gasto</th>
                                <th className="tabTituloValor" id='tab'>Valor do Gasto</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.lista.map(
                                (gasto) =>
                                    <tr key={gasto.id}>
                                        <td id='nomeGasto'>{gasto.nomeGasto}</td>
                                        <td id='valorGasto'>{gasto.valorGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td id='editButton'>
                                            <div className="edit-button" onClick={() => this.carregar(gasto)}>
                                                <img src={editButton} alt="Editar" />
                                            </div>
                                        </td>
                                        <td id='deleteButton'>
                                            <div className="delete-button" onClick={() => this.remover(gasto)}>
                                                <img src={deleteButton} alt="Deletar" />
                                            </div>
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main>
                {this.renderTable()}
            </Main>
        )
    }
}
