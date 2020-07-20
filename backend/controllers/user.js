const bcrypt = require("bcrypt"); //Plug in pour hasher les passwords //
const jwt = require("jsonwebtoken"); //Plug in pour sécuriser la connection avec des tokens uniques //
const User = require("../models/user"); //Importation du model User
const passwordvalidator= require ('password-validator'); // Sécurité password // 
require('dotenv').config();

const schema= new passwordvalidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

//Inscription // 

exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)){ // Si schéma correspond pas alors -> error //
    res.status(401).json({
      error: Error.message= 'Schéma incorrect ! '
    });
  }
  else if (schema.validate(req.body.password)){ // Schéma correct exact le script //
    bcrypt.hash(req.body.password, 10) // "Salage" mdp 10 fois (plus la valeur élevée -> plus de sécurité mais exec fonction lente) //
      .then(hash => {
          const user = new User({ //Création de l'utilisateur // 
              email: req.body.email,
              password: hash
          });
          user.save() // Enregistrer dans la BDD //
              .then(() => res.status(201).json({
                  message: 'Utilisateur créé !'
              }))
              .catch(error => res.status(400).json({
                  error
              }));
      })
      .catch(error => res.status(500).json({
          error
      }));
  } 
};

// Connection  //

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // Utilisation models user pour check si l'email existe déjà dans la BDD // 
    .then((user) => { 
      if (!user) {// Renvoi message error si l'adresse n'existe pas //
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt // Utilisation fonction compare of bcript // 
        .compare(req.body.password, user.password) //Compare le password avec celui de la BDD //
        .then((valid) => {
          if (!valid) { // Mdp incorrect --> renvoi error //
            return res.status(401).json({ error: "Login ou Mot de passe incorrect" });
          }
          res.status(200).json({ // Mpd correct --> renvoi ID utilisateur & TOKEN // 
            userId: user._id,
            token: jwt.sign({ userId: user._id }, `${process.env.DB_TOKEN}`, { //TOKEN de 24h qui est généré //
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
