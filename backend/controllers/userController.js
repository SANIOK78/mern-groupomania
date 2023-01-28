const UserModel = require("../models/modelUser");
// Controler si les "id" sont reconneu par BD
const ObjectID = require("mongoose").Types.ObjectId;


// Afficher tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    // if("ADMIN")
    // affiche tous les user sans le MDP
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
};

// Un user
module.exports.userInfo = (req, res) => {
  // test si l'ID est connu dans la BD
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID inconnu : " + req.params.id);

  // Si ID existe
  UserModel.findById(req.params.id, (err, docs) => {
  // pas d'erreurs on affiche la Data
  if (!err) res.send(docs);
  // en cas d'erreur, on l'affiche dans la console
  else console.log("ID inconnu : " + err);
  }).select("-password");

}

// modification et mise a jour d'un User
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      // chercher un user en fonction des elements.. et le mettre a jour
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },          //element: "_id"
        {
          $set: {                       //"$set" => on modifie
            bio: req.body.bio,
            pseudo: req.body.pseudo,
            avatar: req.body.avatar,
            job: req.body.job
          }
        },
        // paramétre obligatoir pour faire un "PUT"
        { new: true, upsert: true, setDefaultsOnInsert: true },
        // la function qui va s'executer
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(500).send({ message: err });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};

// Suppression User
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.remove({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};

// S'abonner a un utilisateur
module.exports.follow = async (req, res) => {
  // test si les ID qui circule sont connu dans la BD
  if (
    !ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)      
    
  )
    return res.status(400).send("ID pas connu : " + req.params.id);

  try {
    // ajouter à la liste des personne suivis:
    // on trouve l'user corespondant a l'ID transmit en paramétre
    // et onfait la mise a jour
    await UserModel.findByIdAndUpdate(
      req.params.id,                                     
      { $addToSet: { following: req.body.idToFollow } },  
      { new: true, upsert: true },                       
      (err, docs) => {                                   
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // ajouter à la liste des personne qui suive
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,                           
      { $addToSet: { followers: req.params.id } },    
      { new: true, upsert: true },                    
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Functionqui va gérer le désabonnement d'une personne
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
