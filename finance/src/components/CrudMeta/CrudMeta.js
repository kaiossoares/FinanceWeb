import React, { Component } from 'react'
import axios from 'axios'
import './CrudMeta.css'
import Main from '../template/Main'
import editButton from '../../assets/images/editButton.svg'
import deleteButton from '../../assets/images/deleteButton.svg'
import UserService from '../../services/UserService'

const urlAPI = "http://localhost:5165/api/meta"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    meta: { id: 0, nomeMeta: '', valorMeta: 0, valorDestinadoMes: 0 },
    lista: []
}

const { useState, useEffect } = React

export default function CrudMeta(props) {

    const [lista, setLista] = useState([])
    const [mens, setMens] = useState([])
    const [meta, setMeta] = useState('')
    const [state, setState] = useState(initialState)

    useEffect(() => {
        UserService.getAssinanteBoard().then(
            (response) => {
                console.log("useEffect getAssinanteBoard: " + response.data)
                setLista(response.data);
                setMens(null);
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMens(_mens);
                console.log("_mens: " + _mens);
            }
        );
    }, [])

    const limpar = () => {
        this.setState({ meta: initialState.meta })
    }

    const salvar = () => {
        const meta = this.state.meta
        const metodo = meta.id ? 'put' : 'post'
        const url = meta.id ? `${urlAPI}/${meta.id}` : urlAPI

        axios[metodo](url, meta)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ meta: initialState.meta, lista })
            })
    }

    const getListaAtualizada = (meta, add = true) => {
        const lista = this.state.lista.filter(g => g.id !== meta.id)
        if (add) lista.unshift(meta)
        return lista
    }

    const atualizaCampo = (event) => {
        const meta = setState(meta) 
        meta[event.target.nomeMeta] = event.target.value
        setState(meta)
    }

    const mascaraMoeda = (event) => {
        const onlyDigits = event.target.value
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        event.target.value = this.maskCurrency(digitsFloat)
    }

    const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }

    const carregar = (meta) => {
        setState({ meta })
    }

    const remover = (meta) => {
        const url = urlAPI + "/" + meta.id;
        if (window.confirm("Confirma remoção do meta: " + meta.nomeMeta)) {
            console.log("entrou no confirm");

            axios['delete'](url, meta)
                .then(resp => {
                    const lista = getListaAtualizada(meta, false)
                    this.setState({ meta: initialState.meta, lista })
                })
        }
    }

    const renderTable = () => {

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

                        value={meta}

                        onChange={e => atualizaCampo(e)}
                    />

                    <label> Valor da Meta: </label>
                    <input
                        type="text"
                        id="valorMeta"
                        placeholder="Valor da Meta"
                        className="form-input"
                        name="valorMeta"
                        //onInput={e => mascaraMoeda(e)}

                        value={meta.valorMeta}

                        onChange={e => atualizaCampo(e)}
                    />

                    <label> Valor Destinado: </label>
                    <input
                        type="text"
                        id="valorMeta"
                        placeholder="Valor Destinado"
                        className="form-input"
                        name="valorDestinadoMes"
                        //onInput={e => this.mascaraMoeda(e)}

                        value={meta.valorDestinadoMes}

                        onChange={e => atualizaCampo(e)}
                    />

                    <button className="btnMeta"
                        onClick={e => salvar(e)} >
                        Salvar
                    </button>
                    <button className="btnMeta"
                        onClick={e => limpar(e)} >
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
                            {lista.map(
                                (meta) =>
                                    <tr key={meta.id}>
                                        <td id='nomeMeta'>{meta.nomeMeta}</td>
                                        <td id='valorMeta'>{meta.valorMeta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td id='valorMeta'>{meta.valorDestinadoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td id='editButton'>
                                            <div className="edit-button" onClick={() => carregar(meta)}>
                                                <img src={editButton} alt="Editar" />
                                            </div>
                                        </td>
                                        <td id='deleteButton'>
                                            <div className="delete-button" onClick={() => remover(meta)}>
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

    return (
        <Main>
            {(mens) ? "Problema com conexão ou autorização (contactar administrador)." : renderTable()}
        </Main>
    )

}