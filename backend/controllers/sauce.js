const Sauce = require("../models/Sauce"); //Utilise le modèle de sauce
const fs = require("fs"); //Package file system qui permet de modifier ou supprimer des fichiers

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // Changement du Format JSON en JS//
  const sauce = new Sauce({ //Creation d'une sauce //
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${ // Génération de l'URL -> http://localhost/images/nomdufichier //
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  sauce //Enregistrer Sauce dans la BDD //
    .save()
    .then(() => res.status(201).json({
      message: "Sauce enregistrée !"
    }))
    .catch((error) => res.status(400).json({
      error
    }));
};

exports.putSauce = (req, res, next) => {
  const sauceObject = req.file ? // Si un dossier existe alors -> //
    {
      ...JSON.parse(req.body.sauce), // Transforme format JSON sauce en JS //
      imageUrl: `${req.protocol}://${req.get("host")}/images/${ //Ainsi que l'URL de l'image //
          req.file.filename
        }`,
    } :
    {
      ...req.body //Si non faire référence //
    };
    Sauce.updateOne({ //Sauce modifié///
      _id: req.params.id
  }, { //Nouvelle sauce //
      ...sauceObject,
      _id: req.params.id
  })
  .then(() => res.status(200).json({
      message: 'Objet modifié !'
  }))
  .catch(error => res.status(400).json({
      error
  }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ // On cherche l'URL de l'image //
      _id: req.params.id
    })
    .then(sauce => {
      const filename = sauce.imageUrl.split("/images/")[1]; // On récupère le fichier //
      fs.unlink(`images/${filename}`, () => { // POur effacer le fichier (unlink)//
        Sauce.deleteOne({ // Supprimer le fichier de la BDD//
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: "Sauce supprimée !"
          }))
          .catch((error) => res.status(400).json({
            error
          }));
      });
    })
    .catch((error) => res.status(500).json({
      error
    }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ // Ciblage d'une sauce //
      _id: req.params.id
    })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({
      error
    }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find() // Ciblage de toutes les sauces // 
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({
      error
    }));
};

exports.likeSauce = (req, res, next) => {
  if (req.body.like === 1) { // si l'utilisateur aime la sauce //
      Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } }) // on ajoute 1 like et on le push l'array usersLiked //
          .then((sauce) => res.status(200).json({ message: 'Un like de plus !' }))
          .catch(error => res.status(400).json({ error }));
  } else if (req.body.like === -1) { // sinon si il aime pas la sauce //
      Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } }) // on ajoute 1 dislike et on le push l'array usersDisliked //
          .then((sauce) => res.status(200).json({ message: 'Un dislike de plus !' }))
          .catch(error => res.status(400).json({ error }));
  } else { // si l'utilisateur enleve son vote
      Sauce.findOne({ _id: req.params.id })
          .then(sauce => {
              if (sauce.usersLiked.includes(req.body.userId)) { // si l'array userLiked contient le id de like //
                  Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }) // $pull : ça vide l'array userLiked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
                      .then((sauce) => { res.status(200).json({ message: 'Un like de moins !' }) })
                      .catch(error => res.status(400).json({ error }))
              } else if (sauce.usersDisliked.includes(req.body.userId)) { //// si l'array userDisliked contient le id de like //
                  Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })// $pull : ça vide l'array userDisliked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
                      .then((sauce) => { res.status(200).json({ message: 'Un dislike de moins !' }) })
                      .catch(error => res.status(400).json({ error }))
              }
          })
          .catch(error => res.status(400).json({ error }));
  }
};











