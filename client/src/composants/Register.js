import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Img from '../assets/images/reseauxSociaux.jpg';
// import "axios" pour interagir aven la "BD"
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    // Objet qui contient tous les elements du formulaire
    const data = {
        pseudo: "",
        email: "",
        password: "",
        confirmPwd: ""
    }

    // State qui va gérer l'inscription
    const [registerData, setRegisterData] = useState(data);
    // State pour gérer la validité des saisi des inputs
    const [errorPseudo, setErrorPseudo] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPwd, setErrorPwd] = useState('');
    const [validPwd, setValidPwd] = useState('');

    // Mise a jour du state: on cible tous les élément qui ont un "ID"  
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.id] : e.target.value });
    }

    // Récup des state via destructuring
    const { pseudo, email, password, confirmPwd } = registerData;

    // Activation bouton seulement si tous les champs sont remplis
    const btnSubmit = pseudo === "" || email === ""  || password === "" ?
    <button disabled type='submit'> S'Inscrire</button> 
    : 
    <button type='submit'> S'Inscrire</button> 
 
    // Soumission formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorPseudo("");
        setErrorEmail("");
        setErrorPwd("");    //vider les champs "erreur"
        setValidPwd(" ");

        if(password !== confirmPwd ) {
            setValidPwd("Les mots de passe ne correspond pas")               
            
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                // url: "http://localhost:4400/api/user/register",
                data: {
                    pseudo: pseudo,
                    email: email,
                    password: password
                }
            })
            .then(res => {           
                if(res.data.errors) {
                    setErrorPseudo(res.data.errors.pseudo);
                    setErrorEmail(res.data.errors.email);
                    setErrorPwd(res.data.errors.password);                  

                } else { 
                    // console.log(res)
                    alert("Inscription reusit, connectez-vous !")
                    navigate("/login");       
                }
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <>           
            <div className='main-container'>
                <div className="imgBox"><img src={Img} alt="reseau social" /></div>                   
                <div className="contentBox">
                    <div className="formBox">
                        <h2>Inscription</h2>

                        <form action="" onSubmit={handleSubmit} >
                            <div className="inputBox">
                                <label htmlFor="pseudo">Pseudo</label>
                                <input type="text" id='pseudo' name='pseudo' autoComplete='off' 
                                    required placeholder='Min 3 lettres'
                                    value={pseudo} onChange={handleChange}
                                />                               
                                <p className='error'>{errorPseudo}</p>
                            </div>

                            <div className="inputBox">
                                <label htmlFor="email">Email</label>
                                <input type="email" id='email' name='email' autoComplete='off' 
                                    required placeholder='ex: toto@test.fr'
                                    value={email} onChange={handleChange} 
                                />
                                <p className='error'>{errorEmail} </p>
                            </div>

                            <div className="inputBox">
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" id='password' name='password' autoComplete='off' 
                                    required placeholder='Min 6 caractères'
                                    value={password} onChange={handleChange} 
                                />
                                <p className='error'>{errorPwd} </p>
                            </div>

                            <div className="inputBox">
                                <label htmlFor="confirmPwd">Confirmer mot de passe</label>
                                <input type="password" id='confirmPwd' name='controlPwd' autoComplete='off' 
                                    required 
                                    value={confirmPwd} onChange={handleChange} 
                                /> 
                                <p className='error'>{ validPwd } </p>
                            </div>

                           {/* Bouton qui va s'afficher seulement si tous les champs sont remplis */}
                            { btnSubmit }                                                   
                        </form>

                        {/* Création d'un lien pemettant la connexion si ona déjà un compte */}
                        <div className="inputBox">                           
                            <p>Déjà inscrit ?{" "}<Link to="/login">Connectez-vous.</Link> </p>                                                         
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Register;