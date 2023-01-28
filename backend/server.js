const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/connectDb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const userRoutes = require('./routes/routerUser');
const cors = require("cors");

const port = process.env.PORT || 4400 ;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

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

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });
// app.use(
//   cors({
//     origin: [
//       `http://localhost:3000`,
//       `http://localhost:5000`,
//       `http://localhost:3306`,
//     ],
//     credentials: "true",
//   })
// );


// Sécurisation des routes : vérif si "user" a un token
app.get("*", checkUser);

// Route pour vérifier si User a un token
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/user', userRoutes);

app.listen(port , (err) => {
  if (err) console.log(err)
  else console.log(`Serveur tourne sur le port : ${port}`);
})
