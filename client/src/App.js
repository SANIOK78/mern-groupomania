import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profil from './pages/Profil';
import NotFound from './pages/NotFound';
import Login from './composants/Login';
import Register from './composants/Register';
import NavBar from './composants/NavBar';


function App() {
  
  return (
    
    <>
      <NavBar />
      
      <Routes>
        <Route exact path='/' element={<Home />} /> 
        <Route path='/profil' element={ <Profil /> } /> 
        <Route path='/login' element={ <Login /> } /> 
        <Route path='/register' element={ <Register /> } /> 
        <Route  path='*' element={ <NotFound /> } /> 
      </Routes>
          
    </>
  );
}

export default App;
