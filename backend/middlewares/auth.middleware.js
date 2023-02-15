// "jwt" pour vérification token
const jwt = require("jsonwebtoken");
const UserModel = require('../models/modelUser');

// // Verification si l'utilisateur est connecté (s'il a un token)
module.exports.checkUser = (req, res, next) => {
    // recup token depuis cookies
    const token = req.cookies.tokenJwt;
    // console.log("Auth User token : ", token);

    // s'il y a un token, verif s'il correspond avec celui enregistré
    if(token) {
        // func "verify" prend 2 params: "token" et "cle secrete"
        jwt.verify(token, process.env.KEY_SECRET_TOKEN, async (err, decodedToken) => {
            if(err) {
                // s'il y erreur, suppresion du cookies
                res.locals.user = null;
                res.cookies('tokenJwt', '', {maxAge: 1});
                console.log("Erreur : res.locals.user = NULL");
                return res.status(401).send("Verify token : ", err);
                // next();

            } else {
                let user = await UserModel.findById(decodedToken.id);
                // On va enregistrer le "user" dans variable locale
                res.locals.user = user;
                next();
            }
        });                         
    } else {   //si pas de token trouvé
        res.locals.user = null;   
        next();   
    }
}

// Authentification de conexion: verif si le token obtenu a la connection
// correspond avec quelqun enregistré dans la BD
module.exports.requireAuth = (req, res, next) => {
    // recup token depuis cookies
    const token = req.cookies.tokenJwt;
    console.log("Require Auth : ", token);
    // s'il y a un token, verif s'il correspond avec celui enregistré
    if(token) {
        // func "verify" prend 2 params: "token" et "cle secrete"
        jwt.verify(token, process.env.KEY_SECRET_TOKEN, async (err, decodedToken) => {
            if(err) {
               console.log(err);
                res.status(200).json("Require Auth : token incorrect");

            } else {
                // console.log("requireAuth, decodedToken.id : ", decodedToken.id);
                next();
            }
        });                   
    } else {   //si pas de token trouvé
        console.log("No token");
        return res.status(401).send(Error);
    }
}


