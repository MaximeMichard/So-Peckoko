const express = require("express"); //importation framework Express //
const router = express.Router(); //Importation du router Express //

const sauceCtrl = require("../controllers/sauce"); 
const auth = require("../middleware/auth"); // Token // 
const multer = require("../middleware/multer-config"); //Importation de multer, Gére les fichiers entrant //


router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, multer, sauceCtrl.likeSauce);

module.exports = router;
