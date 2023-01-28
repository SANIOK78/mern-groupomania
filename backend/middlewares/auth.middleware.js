// "jwt" pour vérification token
const jwt = require("jsonwebtoken");
const UserModel = require('../models/modelUser');

// Verification si l'utilisateur est connecté (s'il a un token)
module.exports.checkUser = (req, res, next) => {
    // recup token depuis cookies
    const token = req.cookies.token;
    // s'il y a un token, verif s'il correspond avec celui enregistré
    if(token) {
        // func "verify" prend 2 params: "token" et "cle secrete"
        jwt.verify(token, process.env.KEY_SECRET_TOKEN,  async (err, decodedToken) => {
            if(err) {
                // s'il y erreur, suppresion du cookies
                res.locals.user = null;
                res.cookies('token', "", {maxAge: 1});
                res.status(401).send(err);
                // next();

            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                // console.log(user);
                next();
            }
        });                   
    } else {   //si pas de token trouvé
        res.locals.user = null;
        res.status(500).json("Vous n'êtes pas identifié");
    }
}

// Authentification de conexion: verif si le token obtenu a a connection
// correspond avec quelqun enregistré dans la BD
module.exports.requireAuth = (req, res, next) => {
    // recup token depuis cookies
    const token = req.cookies.token;
    // s'il y a un token, verif s'il correspond avec celui enregistré
    if(token) {
        // func "verify" prend 2 params: "token" et "cle secrete"
        jwt.verify(token, process.env.KEY_SECRET_TOKEN, async (err, decodedToken) => {
            if(err) {
               console.log(err);
                res.status(500).json("No token");

            } else {
                console.log(decodedToken.id);
                next();
            }
        });                   
    } else {   //si pas de token trouvé
        console.log("No token");
        // return res.status(401).send(Error);
        res.status(500).json("Aucun token trouvé");
    }
}
