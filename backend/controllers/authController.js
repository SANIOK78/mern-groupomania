const UserModel = require('../models/modelUser');
// install et import "jsonwebtoken" pour créer un jeton de connexion
const jwt = require("jsonwebtoken");
// configuration "dotenv" pour utiliser les variable d'environnement
require('dotenv').config({path: './config/.env'});
const { signUpErrors, signInErrors } = require('../utils/errorsUtils');

// Création d'un terme de validité du "token" ( 3 jours)
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Création d'un token 
const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.KEY_SECRET_TOKEN,
        { expiresIn: maxAge }
    )
};

// CONNEXION
module.exports.signIn = async (req, res) => {
    // récup info de connexion attendu, depuis interface front
    const { email, password } = req.body;

    try {
        // La function "login()" importé depuis "UserModel" va verifier déjà
        // si "user" et "password" correspond avec selui de la BD
        const user = await UserModel.login(email, password);
        console.log("Connexion : ", user)
        // Création token de connexion ("_id" depuis mongoDb)
        const token = createToken(user._id);

        // Enregistrement du "token" en locale, dans les cookie navigateur
        res.cookie('tokenJwt', token, { httpOnly: true, maxAge});
        res.status(200).json({
            user: user._id,
            // pseudo: user.pseudo,
            token
        });
    } catch(err) {
        console.log(err)
        const errors = signInErrors(err);
        return res.status(200).json({errors})
    }
}

// INSCRIPTION ("http://localhost:4400/api/user/register")
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body  // infos  front

    try {
        // création "user" et la reponse du serveur
        const user = await UserModel.create({pseudo, email, password });

        res.status(201).json({            
            message: "Utilisateur créé !",
            user: user._id                         
        });
    } catch(err) {
        // On capte les erreurs survenus a l'inscription
        const errors = signUpErrors(err);
        // Renvoit de l'erreur dans la reponse 
        res.status(200).send({errors})
    }
}

// DECONNEXION
module.exports.logout = (req, res) => {
    // suppression cookie
    res.cookie('tokenJwt', '', {maxAge: 1});
    // res.clearCookie('tokenJwt');
    res.status(200).send({message: "Utilisateur deconnecté "})
    // res.redirect('/');
}