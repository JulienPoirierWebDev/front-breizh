const express = require("express");
const router = express.Router();


const maladie_controller = require("../controllers/maladie_controller")

router.get('', maladie_controller.tousLesArticles);

router.get('/:name(*)/:id', maladie_controller.voirUnArticle);


module.exports = router;