const express = require("express");
const router = express.Router();



const evenements_controller = require("../controllers/evenements_controller")

router.get('', evenements_controller.tousLesEvenements);

router.get('/:id/:name', evenements_controller.voirUnEvenement);


module.exports = router;