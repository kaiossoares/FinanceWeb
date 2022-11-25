import './Logo.css'
import React from 'react'
import logo from '../../assets/images/Group 31.svg'

export default function Logo(props) {
    return (
        <aside className="logo">
            <a href="/" className="logo">
                <img src={logo} alt="Logo" />
            </a>
            <h2 className="logoLetra">FinanceWeb</h2>
        </aside>
    )
}