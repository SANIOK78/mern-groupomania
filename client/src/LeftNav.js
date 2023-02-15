import React from 'react';
import { NavLink } from 'react-router-dom';
import home from './assets/images/home.svg'
import rocket from './assets/images/rocket.svg'
import user from './assets/images/user.svg'

const LeftNav = () => {

    return (
        <div className='container-left-nav'>
            <div className="icons">
                <NavLink to="/profil">
                    <img src={user}  alt="Profil Utilisateur" />
                </NavLink>

                <NavLink to="/">
                    <img src={home} alt="Accueil" />
                </NavLink> 

                <NavLink to="/tendance">
                    <img src={rocket} alt="Tendance" />
                </NavLink>
            </div>
        </div>
    );
};

export default LeftNav;