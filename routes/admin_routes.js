const express = require("express");
const router = express.Router();



const admin_controller = require("../controllers/admin_controller")

router.post('', admin_controller.validationLoginAdmin);

router.get('', admin_controller.loginAdmin);

router.get('/logout', admin_controller.logout);

router.post('/admin-logged', admin_controller.adminPanel);


router.get('/gerer-les-evenements', admin_controller.gestionAdminEvenements);

router.get('/gerer-les-evenements/update/:id', admin_controller.gestionAdminEvenements_update);


router.get('/gerer-les-news', admin_controller.gestionAdminNews);

router.get('/gerer-les-news/update/:id', admin_controller.gestionAdminNews_update);


router.get('/gerer-les-soutiens', admin_controller.gestionAdminSoutiens);

router.get('/gerer-les-soutiens/update/:id', admin_controller.gestionAdminSoutiens_update);


router.get('/gerer-la-section-lily-art', admin_controller.gestionAdminLily);

router.get('/gerer-la-section-lily-art/update/:id', admin_controller.gestionAdminLily_update);


router.get('/gerer-la-section-maladie', admin_controller.gestionAdminMaladie);



router.get('/gerer-la-page-vente', admin_controller.gestionAdminVente);

router.get('/gerer-la-page-vente/update/:id', admin_controller.gestionAdminVente_update);


router.get('/gerer-la-page-dons', admin_controller.gestionAdminDons);

router.get('/gerer-la-page-dons/update/:id', admin_controller.gestionAdminDons_update);


router.get('/gerer-le-contenu-fixe',  admin_controller.gestionAdminContenuFixe);

router.get('/gerer-les-images',  admin_controller.gestionAdminImages);

router.get('/gerer-les-images/update/:id', admin_controller.gestionAdminImages_update);


router.get('/creer-un-prix/:type/:type_id/', admin_controller.gestionAdminPrice);

router.get('/update-un-prix/:type/:type_id/:id', admin_controller.gestionAdminPrice_update);

router.get('/creer-un-paiement/:type/:type_id/', admin_controller.gestionAdminPaiement);

router.get('/update-un-paiement/:type/:type_id/:id', admin_controller.gestionAdminPaiement_update);

router.get('/gerer-les-articles/update/:id', admin_controller.gestionAdminArticle_update);


module.exports = router;