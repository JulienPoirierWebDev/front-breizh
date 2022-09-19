const express = require("express");
const router = express.Router();

const soutiens_controller = require("../controllers/soutiens_controller");


router.get('', soutiens_controller.tousLesSoutiens);

router.get('/:name(*)/:id', soutiens_controller.voirUnTemoignage);


module.exports = router;