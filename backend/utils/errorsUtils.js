// Erreurs rélevé a l'inscription (signUp)
module.exports.signUpErrors = (err) => {
    // l'objet "errors" avec les paramétre attendu( vide au debut)
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo: min 3 lettres";

  if (err.message.includes("email")) 
    errors.email = "Format email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  // Cas avec des éléments en double(code 11000) ET que la clé de l'objet
  // contient "pseudo"
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email est déjà enregistré";

  return errors;
};


// Erreurs rélevés a la connexion (login)
module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) 
    errors.email = "Email inconnu";
  
  if (err.message.includes("password")) 
    errors.password = "Le mot de passe incorrect";
  
  return errors;  
}

// erreurs de chargement d'image
module.exports.uploadErrors = (err) => {
  
  // On remonte erreurs de "format" ou "maxSize"
  let errors = { format: '', maxSize: ""};

  if (err.message.includes('invalid file'))
    errors.format = "Format incompatabile";

  if (err.message.includes('max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors
}
