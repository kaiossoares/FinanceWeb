import './App.css'
import React from 'react'
import Logo from './components/template/Logo'
import Menu from './components/template/Menu'
import Rotas from './Rotas'

import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Menu />
        <Rotas />
      </div>
    </BrowserRouter>
  );
}

export default App;
