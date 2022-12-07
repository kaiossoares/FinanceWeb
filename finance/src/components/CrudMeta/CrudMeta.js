import React, { useState, useEffect } from 'react'
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
    lista: [],

    ganho: { id: 0, nomeGanho: '', valorGanho: 0 },
    listaGanho: [],

    gasto: { id: 0, nomeGasto: '', valorGasto: 0 },
    listaGasto: []
}

export default function CrudMeta(props) {

    const [lista, setLista] = useState([])
    const [listaGanho, setListaGanho] = useState([])
    const [mens, setMens] = useState([])
    const [meta, setMeta] = useState('')
    const [state, setState] = useState(initialState)

    useEffect(() => {
        console.log(state)
        UserService.getAssinanteBoard().then(
            (response) => {
                console.log("useEffect getAssinanteBoard: " + response.data)
                setLista(response.data)
                setListaGanho(response.data)
                setMens(null)
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                setMens(_mens)
                console.log("_mens: " + _mens)
            }
        )
    }, [])
    

    const limpar = () => {
        setState({ meta: initialState.meta })
    }

    const salvar = () => {
        const meta = state.meta
        const metodo = meta.id ? 'put' : 'post'
        const url = meta.id ? `${urlAPI}/${meta.id}` : urlAPI

        axios[metodo](url, meta)
            .then(resp => {
                const lista = getListaAtualizada(resp.data)
                setState({ meta: initialState.meta, lista })
            })
    }

    const getListaAtualizada = (meta, add = true) => {
        const lista = state.lista.filter(g => g.id !== meta.id)
        if (add) lista.unshift(meta)
        return lista
    }

    const atualizaCampo = (event) => {
        const meta = { ...state.meta }
        meta[event.target.name] = event.target.value
        setState({ ...state, meta })
    }

    const carregar = (meta) => {
        const valorTotalGanho = initialState.lista.map(valor => valor.valorMeta)
        console.log(valorTotalGanho)
        setState({ ...state, meta })
    }

    const remover = (meta) => {
        const url = urlAPI + "/" + meta.id
        if (window.confirm("Confirma remoção do meta: " + meta.nomeMeta)) {
            console.log("entrou no confirm")

            axios['delete'](url, meta)
                .then(resp => {
                    const lista = getListaAtualizada(meta, false)
                    setState({ meta: initialState.meta, lista })
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

                        value={state.meta.nomeMeta}

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

                        value={state.meta.valorMeta}

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

                        value={state.meta.valorDestinadoMes}

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
            {(mens) ? <div className='msgAutenticacao'>Assine o site para ter acesso a essa aba.</div> : renderTable()}
        </Main>
    )

}