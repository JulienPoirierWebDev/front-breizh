const {default: axios} = require("axios");
const {initialRequest} = require("../utils/controller_functions");
const {escapeHtmlV2} = require("../utils/functions")
const fs = require("fs");
const nodemailer = require('nodemailer')

exports.contact = async (req, res, next) => {

    let keywords = "";
    let description = "Vous souhaitez contacter l'association \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" ? Si vous avez des questions sur la maladie ou souhaitez nous aider dans notre lutte, vous êtes au bon endroit ! Nous soutenons la recherche, organisons des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Contactez-nous ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\"";


    let numberCaptcha = Math.floor(Math.random()*10) + 1
    let urlCaptcha;
    let resultCaptcha;
    switch (numberCaptcha) {
        case 1 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 6;
            break;
        }
        case 2 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 7;
            break;
        }
        case 3 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 1;
            break;
        }
        case 4 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 9;
            break;
        }
        case 5 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 3;
            break;
        }
        case 6 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 6;
            break;
        }
        case 7 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 10;
            break;
        }
        case 8 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 1;
            break;
        }
        case 9 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 9;
            break;
        }
        case 10 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 4;
            break;
        }

    }

    let reseaux = [];

    let last_news;

    let achats;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2]

    res.render("contact", {achats:achats, title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, urlCaptcha:urlCaptcha, resultCaptcha:resultCaptcha})


}

exports.mail = async (req, res, next) => {

    const mailContact = escapeHtmlV2(req.body.email);
    const nameContact = escapeHtmlV2(req.body.name);
    const messageContact = escapeHtmlV2(req.body.message);
    const controlContact = req.body.objet;
    let motif;
    let html;
    let html2


    if(controlContact === "soutien"){
        motif = "Cette personne souhaite avoir des infos sur la maladie car un de ses proches ou elle-même en est atteinte.";
    } else if(controlContact === "mecenat") {
        motif = "Cette personne souhaite être contacter a propos d'un partenariat ou d'un mécénat";
    }else if(controlContact === "amelioration") {
        motif = "Cette personne souhaite donner son avis / faire un retour sur le site et son contenu";
    }

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });


    try {
        html = fs.readFileSync(__basedir + "/views/template_email/contact_email.html", "utf-8");
        html2 = fs.readFileSync(__basedir + "/views/template_email/confirmation_email.html", "utf-8");
    } catch (err) {
        res.send("Erreur lors de l'envoi du mail")
    }


    html = html.replace("'%mail_utilisateur%'", nameContact);
    html = html.replace("'%mail_message%'", messageContact);
    html2 = html2.replace("'%mail_utilisateur%'", nameContact);
    html2 = html2.replace("'%mail_message%'", messageContact);
    html2 = html2.replace("'%motif%'", motif);
    html2 = html2.replace("'%mailContact%'", mailContact);






    let altMessage = "Bonjour "+ nameContact + ",\n\n            Vous avez fait une demande de contact sur labreizhdelespoir.com avec le message suivant :\n\n" + messageContact +
        "Nous vous recontactons bientôt ! Ceci est une boite mail automatique, merci de ne pas répondre sur cette adresse.\n\n\n" +
        "Cordialement,\n\nPascal, Patricia, Logan et Frantz COTO";

    let altMessage2 = 'Vous avez reçu une demande de contact de' + nameContact + ' avec le message suivant : '+ messageContact +'. \n\nLe motif indiqué est le suivant : '+ motif +'. Vous pouvez contacter cette personne a l\'adresse mail suivante : '+ mailContact;



    let info = await transporter.sendMail({
        from: '"La Breizh de l\'Espoir, brûlons la mucoviscidose" <contact@labreizhdelespoir.fr>', // sender address
        to: mailContact, // list of receivers,
        cc: "labreizhdelespoir@outlook.com",
        subject: "Confirmation | Demande de contact | La Breizh de l'Espoir, brûlons la mucoviscidose", // Subject line
        text: altMessage, // plain text body
        html: html, // html body
    }, (err) => {
        if(err) {
            err = err + "  Erreur lors de l'envoi"
            console.log(err)
        }
    })

    let info2 = await transporter.sendMail({
        from: '"La Breizh de l\'Espoir, brûlons la mucoviscidose" <contact@labreizhdelespoir.fr>', // sender address
        to: "labreizhdelespoir@outlook.com", // list of receivers,
        subject: "Confirmation | Demande de contact | La Breizh de l'Espoir, brûlons la mucoviscidose", // Subject line
        text: altMessage2, // plain text body
        html: html2, // html body
    }, (err) => {
        if(err) {
            console.log(err)
        }
    })



    res.redirect("/");


}

exports.robot = async (req, res, next) => {

    let robot = "Vous avez fait une erreur dans le calcul : êtes-vous un robot ?"

    let numberCaptcha = Math.floor(Math.random()*10) + 1
    let urlCaptcha;
    let resultCaptcha;
    switch (numberCaptcha) {
        case 1 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 6;
            break;
        }
        case 2 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 7;
            break;
        }
        case 3 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 1;
            break;
        }
        case 4 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 9;
            break;
        }
        case 5 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 3;
            break;
        }
        case 6 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 6;
            break;
        }
        case 7 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 10;
            break;
        }
        case 8 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 1;
            break;
        }
        case 9 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 9;
            break;
        }
        case 10 : {
            urlCaptcha = "captcha_" + numberCaptcha + ".png";
            resultCaptcha = 4;
            break;
        }

    }

    let reseaux = [];

    let last_news;
    let achats;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2];


    res.render("contact", {achats:achats, last_news :last_news,reseaux:reseaux, urlCaptcha:urlCaptcha, resultCaptcha:resultCaptcha, robot:robot})


}