import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png'

const NavBar = () => {
    // si User est authentifié
    const isAuth = false;

    return (
        <nav className='navbar-container'>
            <Link to="/" >
                <img src={Logo} alt="logo" />
            </Link>

            <>
                { isAuth ? (
                    <>
                        <h1>Bienvenu "profil"</h1>

                        <div className="navbar">                           
                            <button className='btn'>Créer un post</button>
                            <button className='btn'>Déconnexion</button>                                                
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