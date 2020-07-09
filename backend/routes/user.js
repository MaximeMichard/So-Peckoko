const express= require ('express'); // Utilisation framework basé sur node.JS //
const router= express.Router(); 
const userCtrl= require ('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports= router; 