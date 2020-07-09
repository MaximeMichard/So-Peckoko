const bcrypt = require("bcrypt"); //Plug in pour hasher les passwords
const jwt = require("jsonwebtoken"); //Plug in pour sécuriser la connection avec des tokens uniques
const User = require("../models/user"); //Importation du model User

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = new User({
              email: req.body.email,
              password: hash
          });
          user.save()
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
};

//Connection à un compte existant
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password) //compare le password soumis avec le password de la base de données
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { //TOKEN de 24h qui est généré
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
