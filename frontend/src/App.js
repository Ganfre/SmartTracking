import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageHome from './paginas/PageHome';
import EstilosGlobais from './componentes/EstilosGlobais';
import Medidas from './paginas/Medidas';
import Admin from './paginas/Admin';
import Mensagens from './paginas/Mensagens';
import Menu from './componentes/Menu';
import Notificacao from './paginas/Notificacao';
import DetalhesDevice from './componentes/DetalhesDevices';
import { SignupForm } from './componentes/autenticacao/Autenticacao';
import Logout from './paginas/Logout';
import PrivateRoute from "./componentes/PrivateRoute";
import Login from "./componentes/Login"

function App() {
  const [menuRetracted, setMenuRetracted] = useState(false);
  const handleMenuToggle = (isRetracted) => {
    setMenuRetracted(isRetracted);
  };

  return (
    <Router>
      <EstilosGlobais />
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: menuRetracted ? '0px' : '200px' }}>
          <Menu onMenuToggle={handleMenuToggle} />
        </div>
        <div style={{ flex: 1, height: '100%' }}>
          <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path='/medidas' element={<PrivateRoute element={<Medidas/>} />} />
            <Route path='/medidas/:id' element={<PrivateRoute element={<DetalhesDevice/>} />} />
            <Route path='/admin' element={<PrivateRoute element={<Admin/>} />} />
            <Route path='/mensagens' element={<PrivateRoute element={<Mensagens/>} />} />
            <Route path='/cadastro' element={<PrivateRoute element={<SignupForm/>} />} />
            <Route path='/notificacao' element={<PrivateRoute element={<Notificacao/>} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
