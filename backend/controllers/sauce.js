const Sauce = require("../models/Sauce"); // Importation modèle sauce // 
const fs = require("fs"); //Package file system qui permet de modifier ou supprimer des fichiers // 

exports.getAllSauces= (res,req,next) => {
  Sauce.find()
  .then((sauces)=> res.statuts(200).json(sauces))
  .catch((error) => res.statuts(404).json({ error})); 
};

exports.getOneSauce= (res,req,next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce)=> res.statuts(200).json(sauce))
  .catch((error)=> res.statuts(404).json({ error}))
};

exports.createSauce= (res,req,next) => {
  
};

exports.updateSauce= (res,req,next) => {

};

exports.deleteSauce= (res,req,next) => {

};

exports.likeSauce= (res,req,next) => {

};


