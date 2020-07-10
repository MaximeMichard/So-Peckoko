const multer = require("multer"); //Permet de gérer les fichiers entrants dans les requêtes HTTP //

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const storage = multer.diskStorage ({
    destination: (req, file, callback) => { //Indique où enregistrer les fichiers // 
        callback(null, "images");
    },
    filename: (req, file, callback) => { // Indique d'utiliser le nom d'origine //
        const name = file.originalname.split(" ").join("_"); // Remplacer les espaces par des underscores //
        const extension = MIME_TYPES[file.mimetype]; 
        callback(null, name + Date.now() + '.' + extension); // Utilisation timestamp comme nom de fichier //
    }
});


module.exports = multer({storage }).single('image'); // Export de l'élément multer -> constante storage + téléchargement 'image' //