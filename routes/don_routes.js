const express = require("express");
const router = express.Router();


const don_controller = require("../controllers/don_controller")

router.get('', don_controller.tousLesDons);

router.get('/merci-de-noter-votre-adresse/:id', don_controller.attentionAdresse);

module.exports = router;