import React from 'react';
import Logo from '../../assets/images/logo.png'
import Logo1 from '../../assets/images/logo1.png'

const Log = () => {
    
    return (
        <div className='log-container'>
            <div className="log-header">
                <img src={Logo} alt="logo" />           
            </div>
            <div className="log-body">
                <div className="log-contenu">
                    <div className="log-titre">
                        <h1>Réseau social interne</h1>
                        <h2>Envie d'échanger entres collègues...</h2>
                    </div>
                    <div className="log-connexion">
                        <div className="block bloc-gauche">
                            <p>Vous avez déjà un compte </p>
                            <button>Connectez-vous</button>
                        </div>

                        <div className="bloc-centre"></div>

                        <div className="block bloc-droit">
                            <p>Vous n'avez pas de compte </p>
                            <button>Créer votre compte</button>
                        </div>
                    </div>
                </div>
              
            </div>
            <div className="log-footer">
                <img src={Logo1} alt="logo" />              
                <a href="#">Mentions légales</a>
                <a href="#">Recommandations de sécurité</a>
                <a href="#">Protection des données personnelles</a>
                       
            </div>
        </div>
    );
};

export default Log;