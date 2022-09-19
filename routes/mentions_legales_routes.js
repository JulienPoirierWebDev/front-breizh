const express = require("express");
const router = express.Router();

const mentions_legales_controller = require("../controllers/mentions_legales_controller");

router.get('', mentions_legales_controller.mentionsLegales);

router.get('/:doc', mentions_legales_controller.downloadDocument);

module.exports = router;