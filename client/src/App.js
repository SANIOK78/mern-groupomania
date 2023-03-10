import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserIdContext } from './context/AppContext';

import Home from './pages/Home';
import Profil from './pages/Profil';
import NotFound from './pages/NotFound';
import Login from './composants/Login';
import Register from './composants/Register';
import NavBar from './composants/NavBar';

import axios from 'axios';
import { getUser } from './redux/actions/userAction';

function App() {
  // State qui va stoker l'id de user connecté
  const [userId, setUserId] = useState("");
  // instance de "useDispatch"
  const dispatch = useDispatch();

  // A chaque connexion a l'appli on va verifier si 
  // l'user a déjà un "token" enregistré (donc un ID) 
  useEffect(() => {

    // function qui va chercher le "token"
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid `,
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setUserId(res.data);
      })
      .catch(err => console.log("Pas de token : ", err))
    }
    fetchToken();

    // Récupération "data" utilisateur depuis BD
    if(userId) {
      dispatch(getUser(userId));
    }

  }, [userId, dispatch] );
  
  return ( 
    <UserIdContext.Provider value={userId}>
      <NavBar />
      
      <Routes>
        <Route exact path='/' element={<Home />} /> 
        <Route path='/profil' element={ <Profil /> } /> 
        <Route path='/login' element={ <Login /> } /> 
        <Route path='/register' element={ <Register /> } /> 
        <Route  path='*' element={ <NotFound /> } /> 
      </Routes> 

    </UserIdContext.Provider>
  );
}
export default App;
