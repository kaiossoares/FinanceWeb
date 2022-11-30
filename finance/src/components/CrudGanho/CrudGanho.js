import React, { Component } from 'react'
import axios from 'axios'
import './CrudGanho.css'
import Main from '../template/Main'
import editButton from '../../assets/images/editButton.svg'
import deleteButton from '../../assets/images/deleteButton.svg'

const urlAPI = "http://localhost:5165/api/ganho"

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

    controlarInputGanho(evt) {
        this.setState({ ganho: evt })
    }

    limpar() {
        this.setState({ ganho: initialState.ganho })
    }

    salvar() {
        const ganho = this.state.ganho
        const metodo = ganho.id ? 'put' : 'post'
        const url = ganho.id ? `${urlAPI}/${ganho.id}` : urlAPI

        axios[metodo](url, ganho)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ ganho: initialState.ganho, lista })
            })
    }

    getListaAtualizada(ganho, add = true) {
        const lista = this.state.lista.filter(g => g.id !== ganho.id)
        if (add) lista.unshift(ganho)
        return lista
    }

    atualizaCampo(event) {
        const ganho = { ...this.state.ganho }
        ganho[event.target.name] = event.target.value
        this.setState({ ganho })
    }

    mascaraMoeda(value) {
        const onlyDigits = value.toString()
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        return this.maskCurrency(digitsFloat)
    }

    maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }

    carregar(ganho) {
        this.setState({ ganho })
    }

    remover(ganho) {
        const url = urlAPI + "/" + ganho.id;
        if (window.confirm("Confirma remoção do ativo: " + ganho.nomeGanho)) {
            console.log("entrou no confirm");

            axios['delete'](url, ganho)
                .then(resp => {
                    const lista = this.getListaAtualizada(ganho, false)
                    this.setState({ ganho: initialState.ganho, lista })
                })
        }
    }

    renderTable() {

        return (
            <div className="financeCard">
                <div className="inclui-container">
                    <label> Nome do Ativo: </label>
                    <input
                        type="text"
                        id="nomeGanho"
                        placeholder="Nome do Ativo"
                        className="form-input"
                        name="nomeGanho"

                        value={this.state.ganho.nomeGanho}

                        onChange={e => this.atualizaCampo(e)}
                    />

                    <label> Valor do Ativo: </label>
                    <input
                        type="text"
                        id="valorGanho"
                        placeholder="Valor do Ativo"
                        className="form-input"
                        name="valorGanho"
                        //onInput={e => this.mascaraMoeda(e)}

                        value={this.mascaraValor(this.state.ganho)}

                        onChange={this.controlarInputGanho }
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
                    <table className="listaGanhos" id="tblListaGanhos">
                        <thead>
                            <tr className="cabecTabela">
                                <th className="tabTituloNome" id='tab'>Nome do Ativo</th>
                                <th className="tabTituloValor" id='tab'>Valor do Ativo</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.lista.map(
                                (ganho) =>
                                    <tr key={ganho.id}>
                                        <td id='nomeGanho'>{ganho.nomeGanho}</td>
                                        <td id='valorGanho'>{ganho.valorGanho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td id='editButton'>
                                            <div className="edit-button" onClick={() => this.carregar(ganho)}>
                                                <img src={editButton} alt="Editar" />
                                            </div>
                                        </td>
                                        <td id='deleteButton'>
                                            <div className="delete-button" onClick={() => this.remover(ganho)}>
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