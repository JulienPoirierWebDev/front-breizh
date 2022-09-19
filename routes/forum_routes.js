const express = require("express");
const router = express.Router();


const forum_controller = require("../controllers/forum_controller")

router.get('', forum_controller.forum);

module.exports = router;