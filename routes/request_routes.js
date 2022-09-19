const express = require("express");
const router = express.Router();


const multer = require("multer");

// paramètres de l'upload MULTER
const storage = multer.diskStorage({
    // stocker le fichier dans le répertoire suivant :
    destination: function (req, file, cb) {
        cb(null, __basedir + '/public/images/uploads')
    },
    //changer le nom du fichier par une variable unique
    filename: function (req, file, cb) {
        let type;
        if(file.mimetype === "image/png") {
            type = ".png"
        } else if(file.mimetype === "image/jpeg") {
            type = ".jpg"
        } else if(file.mimetype === "application/pdf") {
            type = ".pdf"
        } else if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            type = ".docx"
        } else if(file.mimetype === "application/msword") {
            type = ".doc"
        } else if(file.mimetype === "text/csv") {
            type = ".csv"
        } else if(file.mimetype === "application/vnd.ms-excel") {
            type = ".xls"
        } else if(file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            type = ".xlsx"
        }

        let name;
        if(typeof req.body.name !== "undefined") {
            name = req.body.name
        } else if(typeof req.body.doc_name !== "undefined") {
            name = req.body.doc_name
        }
        const uniqueSuffix = Date.now() + "-" + name + type
        cb(null, uniqueSuffix)


    }
})

const upload = multer({ storage: storage })


const request_controller = require("../controllers/request_controller")

//News
router.post('/post_news', request_controller.postNews)

router.post('/update_news', request_controller.updateNews)

router.get('/delete_news/:id', request_controller.deleteNews)

//Event
router.post('/post_event', request_controller.postEvent)

router.post('/update_event', request_controller.updateEvent)

router.get('/delete_event/:id', request_controller.deleteEvent)

//Articles
router.post('/post_articles', request_controller.postArticle)

router.post('/update_articles', request_controller.updateArticle)

router.get('/delete_articles/:article_type/:id', request_controller.deleteArticle)

//Paiement_don
router.post('/post_paiement_don', request_controller.postPaiement_don)

router.post('/update_paiement_don', request_controller.updatePaiement_don)

router.get('/delete_paiement_don/:id', request_controller.deletePaiement_don)

//Paiement_event
router.post('/post_paiement_event', request_controller.postPaiement_event)

router.post('/update_paiement_event', request_controller.updatePaiement_event)

router.get('/delete_paiement_event/:id', request_controller.deletePaiement_event)

//Paiement_achat
router.post('/post_paiement_achat', request_controller.postPaiement_achat)

router.post('/update_paiement_achat', request_controller.updatePaiement_achat)

router.get('/delete_paiement_achat/:id', request_controller.deletePaiement_achat)

//Achat
router.post('/post_achat', request_controller.postAchat)

router.post('/update_achat', request_controller.updateAchat)

router.get('/delete_achat/:id', request_controller.deleteAchat)

//Document
router.post('/post_document', upload.single('item', ), request_controller.postDocument)

//router.post('/update_document', request_controller.updateDocument)

router.get('/delete_document/:id/:name', request_controller.deleteDocument)

//Reseaux
router.post('/post_reseaux', request_controller.postReseaux)

router.post('/update_reseaux', request_controller.updateReseaux)

router.get('/delete_reseaux/:id', request_controller.deleteReseaux)

//Dons
router.post('/post_dons', request_controller.postDons)

router.post('/update_dons', request_controller.updateDons)

router.get('/delete_dons/:id', request_controller.deleteDons)

//Price_event
router.post('/post_price_event', request_controller.postPrice_event)

router.post('/update_price_event', request_controller.updatePrice_event)

router.get('/delete_price_event/:id', request_controller.deletePrice_event)

//Supports
router.post('/post_support', request_controller.postSupport)

router.post('/update_support', request_controller.updateSupport)

router.get('/delete_support/:id', request_controller.deleteSupport)

//Images
router.post('/post_image', upload.single('item'), request_controller.postImage)

router.post('/update_image', request_controller.updateImage)

router.get('/delete_image/:id/:name', request_controller.deleteImage)

router.post('/update_association', request_controller.updateAssociation)

module.exports = router;