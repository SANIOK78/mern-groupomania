const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/connectDb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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

// routes
app.use('/api/user', userRoutes);

app.listen(port , (err) => {
  if (err) console.log(err)
  else console.log(`Serveur tourne sur le port : ${port}`);
})
