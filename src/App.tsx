import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// css
import './App.css';
import Nav from './components/Nav';

function App() {

  const [login, setLogin] = useState<boolean>(false)
  console.log("log", login)
  return (
    <BrowserRouter>
      <div className="menu">
        <Nav />
      </div>
    </BrowserRouter>
  )
}

export default App;