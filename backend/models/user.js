const mongoose= require ('mongoose'); // Schéma de donnée //
const mongooseUniqueValidator = require('mongoose-unique-validator');// Plugin: Adresse MAIL Unique //

const userSchema = mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
});

userSchema.plugin(mongooseUniqueValidator); 

module.exports= mongoose.model ("User", userSchema);