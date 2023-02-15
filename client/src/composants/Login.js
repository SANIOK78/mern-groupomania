import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Img from '../assets/images/reseauxSociaux.jpg';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    //Afficher le bouton seulement si tous les champs sont remplis
    const showBtn = email !== "" && password !== "" ? 
    <button type="submit"> Se connecter</button> 
    : 
    <button type="submit" disabled > Se connecter</button>

    // Logique connexion
    const handleLogin = async (e) => {
        e.preventDefault();

        // requête au Serveur
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            // url: "http://localhost:4400/api/user/login",
            withCredentials: true,           
            data: {                 // envoit "email" et "password"
                email: email,
                password: password
            }
        })
        .then(res => {            
            if(res.data.errors) {                
                setErrorEmail(res.data.errors.email);
                setErrorPassword( res.data.errors.password );

            } else {
                window.location = "/";
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='main-container'>
            <div className="imgBox">
                <img src={Img} alt="reseau social" />
            </div>

            <div className="contentBox">
                <div className="formBox">
                    <h2>Connexion</h2>

                    <form action="" onSubmit={handleLogin} >

                        <div className="inputBox">
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' name='email' 
                                autoComplete='off' required
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className='error'>{ errorEmail }</p>
                        </div>
                        
                        <div className="inputBox">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id='password' name='password' 
                                autoComplete='off' required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className='error'>{ errorPassword }</p>
                        </div>

                      {/* Button qui va s'afficher seulement si les champs sont renseignés */}
                        { showBtn }                           
                                             
                    </form>

                    <div className="inputBox">                           
                        <p>Nouveau sur l'application ?{" "}
                            <Link to="/register">Inscrivez-vous.</Link>
                        </p>                       
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;