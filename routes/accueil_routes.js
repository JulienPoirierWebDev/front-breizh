const express = require("express");
const router = express.Router();


const accueil_controller = require("../controllers/accueil_controller")

router.get('', accueil_controller.accueil)

module.exports = router;