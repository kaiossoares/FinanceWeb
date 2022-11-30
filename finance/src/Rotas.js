import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Main from './components/template/Main'
import img from './assets/images/Mask Group.png'
import CrudGasto from './components/CrudGasto/CrudGasto'
import CrudGanho from './components/CrudGanho/CrudGanho'
import CrudMeta from './components/CrudMeta/CrudMeta'
import AuthService from './services/AuthService'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import './Rotas.css'

export default function Rotas() {

    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (user) {
            setCurrentUser(user)
        }
    }, []);

    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main>
                        <h1 id='title'>Financial Organizer.</h1>
                        <img src={img} alt="Logo" id='imgHome' />
                        <h1 id='description'>A financial organizer
                            that can help you make that long-awaited dream come true.
                            We also help people to never have difficulty at the end of the month again.</h1>
                    </Main>}
            />

            {currentUser ? (
                <Route exact path='/ganhos'
                    element={<CrudGanho />}
                />
            ) : (
                <Route exact path='/ganhos'
                    element={
                        <Main id='autorizado'>
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            {currentUser ? (
                <Route exact path='/gastos'
                    element={
                        <Main>
                            <div>Página de gastos...</div>
                        </Main>
                    }
                />
            ) : (
                <Route exact path='/gastos'
                    element={
                        <Main>
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            <Route exact path='/metas'
                element={
                    <Main>
                        <div>Não autorizado! Assine para ter acesso!</div>
                    </Main>
                }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />

        </Routes>
    )
}