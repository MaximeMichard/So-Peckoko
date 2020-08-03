const express= require ('express'); // Utilisation framework basé sur node.JS //
const router= express.Router(); 
const userCtrl= require ('../controllers/user');
const expressBouncer= require ("express-bouncer")(5000,600000,3); // Contre les attaques de force Brute // 

router.post('/signup', userCtrl.signup);
router.post('/login',expressBouncer.block, userCtrl.login);

module.exports= router; 