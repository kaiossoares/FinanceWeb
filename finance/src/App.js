import './App.css'

import Logo from './components/template/Logo'
import Menu from './components/template/Menu'
import Main from './components/template/Main'
import img from './assets/images/Mask Group.png'

function App() {
  return (
    <div className="App">
      <Logo />
      <Menu />

      <Main>
        <h1 id='title'>Financial Organizer.</h1>
        <img src={img} alt="Logo" id='imgHome'/>
        <h1 id='description'>A financial organizer 
        that can help you make that long-awaited dream come true. 
        We also help people to never have difficulty at the end of the month again.</h1>
      </Main>

    </div>
  );
}

export default App;
