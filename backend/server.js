const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config({path: './config/.env'});
require('./config/connectDb');
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const userRoutes = require('./routes/routerUser');
// import "multer" pout telecharger des fichier
// const multer = require("./middlewares/multer-config");

const port = process.env.PORT || 4400 ;

const app = express();

// CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  // origin:  `http://localhost:3000`,
  credentials: true,
  "allowedHeaders" : ['sessionId', 'Content-Type'],
  "exposedHeaders" : ["sessionId"],
  "methods" : 'GET, POST, HEAD, PUT, PATCH, DELETE',
  "preflightContinue" : false
}
app.use(cors(corsOptions));


// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Sécurisation des routes : vérif si "user" a un token
app.get("*", checkUser);

// Route pour vérifier si User a un token
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/user', userRoutes);

// Route pour les fichier static
// route "upload" ("/api/user/upload")
// app.post("/upload", multer, (req, res) => {
//   res.json({
//       url: `/uploads/profil/${req.file.filename}`
//   });
// });


app.listen(port , (err) => {
  if (err) console.log(err)
  else console.log(`Serveur tourne sur le port : ${port}`);
})
