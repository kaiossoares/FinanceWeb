import './Menu.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu(props) {
    return (
        <nav className='menu'>
            <Link to="/ganhos">
                Ganhos
            </Link>
            <Link to="/gastos">
                Gastos
            </Link>
            <Link to="/metas">
                Metas/Objetivos
            </Link>
        </nav>
    )
}