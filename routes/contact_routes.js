const express = require("express");
const router = express.Router();


const contact_controller = require("../controllers/contact_controller")

router.get('', contact_controller.contact);

router.post('', contact_controller.mail);

router.get('etes-vous-un-robot-?', contact_controller.robot);



module.exports = router;