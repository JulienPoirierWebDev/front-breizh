const express = require("express");
const router = express.Router();

const news_controller = require("../controllers/news_controller");


router.get('', news_controller.toutesLesNews);

router.get(':id', news_controller.voirUneNews);



module.exports = router;