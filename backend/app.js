const express = require('express'); // Importation package Express //
const bodyParser = require('body-parser'); // Importation package BodyParser//
const mongoose = require('mongoose'); //Importation package mongoose //
const path= require ('path'); //Importation package Path // 

const stuffRoutes = require('./routes/stuff'); //Importation ficher Routes/stuff.js //
const userRoutes = require('./routes/user'); //Importation ficher Routes/user.js //
const app = express(); //Utilisation Express //

app.use((req, res, next) => { // CORS //
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Connection Base de donnée //
mongoose.connect('mongodb+srv://Grodar:shaco9433@cluster0-1l7tk.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
/* app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes); */

module.exports = app;