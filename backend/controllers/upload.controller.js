const UserModel = require("../models/modelUser");
// "fs" pour gérer des fichiers avec express
const fs = require("fs");
const { uploadErrors } = require("../utils/errorsUtils");

module.exports.uploadProfil = async (req, res) => {

  // On aura un "req.file", envoyé par "multer", a traiter
  try {
    // Vérification du format fichier
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png"
    )
      throw Error("invalid file");  //envoit erreur

    // Vérification de la taille de l'image
    if (req.file.size > 500000) throw Error("max size");

  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({errors});
  }

  // Le nom de fichier 
  const fileName = req.body.name + ".jpg";

  // Le chemine de stockage du fichier
  let writeStream = fs.createWriteStream(
    `${__dirname}/../../client/public/uploads/profil/${fileName}`
  );

  writeStream.write(req.file.buffer);
  writeStream.on("finish", () => {
    console.log("Fichier mis à jour !");
  });

  writeStream.end();

  // Envois du chemain d'image vers BD
  try {
    await UserModel.findByIdAndUpdate(
      // 1ér argument : "userId" récupéré depuis "body"
      req.body.userId,
      // 2éme element: met en place ce chemin 
      { $set: { avatar: "./../uploads/profil/" + fileName } },
      // 3. Paramétre obligatoir pour ça
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if( !err) return res.send(docs);
        else return res.status(500).send({message: err})
      }       
    )       
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};


