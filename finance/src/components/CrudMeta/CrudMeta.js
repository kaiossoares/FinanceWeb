import React, { Component } from 'react'
import axios from 'axios'
import './CrudMeta.css'
import Main from '../template/Main'
import editButton from '../../assets/images/editButton.svg'
import deleteButton from '../../assets/images/deleteButton.svg'

const urlAPI = "http://localhost:5165/api/meta"

const initialState = {
    meta: { id: 0, nomeMeta: '', valorMeta: 0, valorDestinadoMes: 0 },
    lista: []
}

export default class CrudMeta extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar() {
        this.setState({ meta: initialState.meta })
    }

    salvar() {
        const meta = this.state.meta
        const metodo = meta.id ? 'put' : 'post'
        const url = meta.id ? `${urlAPI}/${meta.id}` : urlAPI

        axios[metodo](url, meta)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ meta: initialState.meta, lista })
            })
    }

    getListaAtualizada(meta, add = true) {
        const lista = this.state.lista.filter(g => g.id !== meta.id)
        if (add) lista.unshift(meta)
        return lista
    }

    atualizaCampo(event) {
        const meta = { ...this.state.meta }
        meta[event.target.name] = event.target.value
        this.setState({ meta })
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

    carregar(meta) {
        this.setState({ meta })
    }

    remover(meta) {
        const url = urlAPI + "/" + meta.id;
        if (window.confirm("Confirma remoção do meta: " + meta.nomeMeta)) {
            console.log("entrou no confirm");

            axios['delete'](url, meta)
                .then(resp => {
                    const lista = this.getListaAtualizada(meta, false)
                    this.setState({ meta: initialState.meta, lista })
                })
        }
    }

    renderTable() {

        return (
            <div className="financeCardMeta">
                <div className="inclui-container">
                    <label> Nome da Meta: </label>
                    <input
                        type="text"
                        id="nomeMeta"
                        placeholder="Nome do Meta"
                        className="form-input"
                        name="nomeMeta"

                        value={this.state.meta.nomeMeta}

                        onChange={e => this.atualizaCampo(e)}
                    />

                    <label> Valor da Meta: </label>
                    <input
                        type="text"
                        id="valorMeta"
                        placeholder="Valor da Meta"
                        className="form-input"
                        name="valorMeta"
                        onInput={e => this.mascaraMoeda(e)}

                        value={this.state.meta.valorMeta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

                        onChange={e => this.atualizaCampo(e)}
                    />

                    <label> Valor Destinado: </label>
                    <input
                        type="text"
                        id="valorMeta"
                        placeholder="Valor Destinado"
                        className="form-input"
                        name="valorDestinadoMes"
                        onInput={e => this.mascaraMoeda(e)}

                        value={this.state.meta.valorDestinadoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

                        onChange={e => this.atualizaCampo(e)}
                    />

                    <button className="btnMeta"
                        onClick={e => this.salvar(e)} >
                        Salvar
                    </button>
                    <button className="btnMeta"
                        onClick={e => this.limpar(e)} >
                        Cancelar
                    </button>
                </div>

                <div className="listagem">
                    <table className="listaMeta" id="tblListaMeta">
                        <thead>
                            <tr className="cabecTabela">
                                <th className="tabTituloNome" id='tab'>Nome da Meta</th>
                                <th className="tabTituloValor" id='tab'>Valor da Meta</th>
                                <th className="tabTituloValor" id='tab'>Valor Destinado/Mês</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.lista.map(
                                (meta) =>
                                    <tr key={meta.id}>
                                        <td id='nomeMeta'>{meta.nomeMeta}</td>
                                        <td id='valorMeta'>{meta.valorMeta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td id='valorMeta'>{meta.valorDestinadoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td id='editButton'>
                                            <div className="edit-button" onClick={() => this.carregar(meta)}>
                                                <img src={editButton} alt="Editar" />
                                            </div>
                                        </td>
                                        <td id='deleteButton'>
                                            <div className="delete-button" onClick={() => this.remover(meta)}>
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