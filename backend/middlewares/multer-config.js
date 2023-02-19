const multer = require('multer');
const { uploadErrors } = require("../utils/errorsUtils");

// dictionnaire d'extensions d'images
// const MIME_TYPES = { 
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// Stockage des images
const storage = multer.diskStorage({
    destination: (req, file, callback) => { // destination des images
        callback(null, '../client/public/uploads/profil');
    },
    // nouveau nom du fichier image pour éviter les doublons
    filename: (req, file, callback) => { 
        const name = file.originalname.split(' ').join('_');
        // const name = req.body.pseudo ;
        // const extension = MIME_TYPES[file.mimetype];
        // callback(null, name + Date.now() + '.' + extension);
        callback(null, name + Date.now() + '.jpg');
    }
});

// Filtre les erreur
const fileFilter = (req, file, callback) => {
    try {
        // Vérification du format fichier
        if (
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/jpeg" &&
            req.file.mimetype !== "image/png" 
        ) {            
            throw Error("invalid file");  //envoit erreur)
        } else {
            callback(null, true)
        }
            
        // // Vérification de la taille de l'image
        // if (file.size > 50000) {
        //     callback(new Error("max size"));
        // }

    } catch (err) {
        console.log(err)
        const errors = uploadErrors(err);
        res.status(201).json({errors});
    }
}

module.exports = multer({ storage: storage, fileFilter }).single('image');
