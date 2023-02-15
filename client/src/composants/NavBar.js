import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// Utilisation de "UserIdContext"
import { UserIdContext } from '../context/AppContext';
// recup infos depuis Store
import { useSelector } from 'react-redux';
import AjoutPost from './AjoutPost';
import Logout from './Logout';
import Logo from '../assets/images/logo.png'

const NavBar = () => {
    // si User est authentifié
    const isAuth = useContext(UserIdContext);
    // recup infos depuis Store
    const infoUser = useSelector(state => state.userReducer);

    return (
        <nav className='navbar-container'>
            <Link to="/" > <img src={Logo} alt="logo" /> </Link>

            <>
                { isAuth ? (
                        <>
                            <Link to="/profil" >
                                <h1>Bienvenu {infoUser.pseudo}</h1>
                            </Link>
                            
                            <div className="navbar">
                                <AjoutPost />
                                <Logout />                                                                            
                            </div>
                        </>
                    ) : (  
                        <>
                            <h1>Connectez-vous et échanger entre collègues</h1>
                            <div className="navbar">
                                <Link to="/login">
                                    <button className='btn'>Connexion</button>    
                                </Link>

                                <Link to="/register" >
                                    <button className='btn'>Inscription</button>
                                </Link>                                                                                                        
                            </div> 
                        </>
                    )
                }               
            </> 
        </nav>
    );
};
export default NavBar;