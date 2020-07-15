const mongoose= require ('mongoose'); // Schéma de donnée //
const uniqueValidator= require('mongoose-unique-validator');  /* mongoose-unique-validator est un plugin qui
 ajoute une validation de pré-sauvegarde pour des champs uniques dans un schéma Mongoose.
Cela facilite la gestion des erreurs, car vous obtiendrez une erreur de validation Mongoose 
lorsque vous tentez de violer une contrainte unique , plutôt qu'une erreur E11000 de MongoDB. */

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

userSchema.plugin(uniqueValidator, {type : 'mongoose-unique-validator'}); 

module.exports= mongoose.model ("User", userSchema);

