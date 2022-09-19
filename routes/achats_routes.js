const express = require("express");
const router = express.Router();

const achats_controller = require("../controllers/achats_controller")

router.get('', achats_controller.tousLesAchats);

router.get('/achats-:name', achats_controller.voirUnAchat);




module.exports = router;