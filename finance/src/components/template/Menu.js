import './Menu.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/AuthService'

export default function Menu(props) {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <div>
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
            <nav className='menuLogin'>
                {currentUser ? (
                    <Link to="/logout" id='login'>
                        Logout
                    </Link>
                ) : (

                    <Link to="/login" id='login'>
                        Login
                    </Link>
                )}
            </nav>
        </div>
    )
}