import React from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Install et import "js-cookie" permettant d'utiliser
// et supprimer les cookies a la deconexion
import cookie from "js-cookie";

const Logout = () => {

    // instance de 'useNavigate
    // const navigate = useNavigate();

    const removeCookies = (key) => {
        if(window !== "undefined"){
            cookie.remove(key, {expires: 1} );
        }
    }

    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
        .then(() => removeCookies('tokenJwt'))
        .catch(err => console.log(err))

        // Rédirection sur la page d'accueil
        // navigate("/");
        window.location = "/";
    }

    return (
        
        <div>
          
            <button onClick={logout} className='btn'>
                Déconnexion
            </button>   
                              
        </div>
    );
};

export default Logout;