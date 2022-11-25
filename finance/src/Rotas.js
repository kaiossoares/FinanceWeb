import React from 'react'
import { Routes, Route } from "react-router-dom"
import Main from './components/template/Main'
import img from './assets/images/Mask Group.png'
import CrudGasto from './components/CrudGasto/CrudGasto'
import CrudGanho from './components/CrudGanho/CrudGanho'

export default function Rotas() {
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

            <Route path='/ganhos' element={<CrudGanho />} />
            <Route path='/gastos' element={<CrudGasto />} />
            <Route path='*' element={

                <Main title="Bem Vindo!">
                    <div>Página não encontrada</div>
                </Main>} />

        </Routes>
    )
}