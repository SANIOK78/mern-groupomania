const mongoose = require('mongoose');
// require('dotenv').config({path: './.env'})

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connexion a mongoDB réussie "))
.catch((err) => console.log("Connexion échoué : " , err ))