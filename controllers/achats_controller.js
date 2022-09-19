const {default: axios} = require("axios");
const {initialRequest} = require("../utils/controller_functions");
const parser = require("@deskeen/markdown");

exports.tousLesAchats = async (req, res, next) => {

    let keywords = "";
    let description = "Réalisez des achats solidaires pour aider l'association \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" à soutenir la recherche et à organiser des actions pour aider les malades à mieux vivre avec la maladie et ses traitements" ;
    let title = "Les achats solidaires de \"La Breizh De L'espoir, Brûlons La Mucoviscidose\"";

    let achats = [];

    let achats_paiement = [];

    let achats_prix = [];

    let reseaux = [];

    let last_news;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];


    achats = await axios.get("http://api-content.labreizhdelespoir.com/api/achat").then((response) => {
        return response.data
    })

    achats_paiement = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_achat").then((response) => {
        return response.data
    })

    achats_prix = await axios.get("http://api-content.labreizhdelespoir.com/api/price_achat").then((response) => {
        return response.data
    })

    achats.forEach(one_achat => {
        one_achat.description = parser.parse(one_achat.description).innerHTML
    })

    res.render("achat_all", {title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, achats:achats, achats_paiement:achats_paiement, achats_prix:achats_prix})

}

exports.voirUnAchat = async(req, res, next) => {

    let keywords = "";
    let description = "Réalisez des achats solidaires pour aider l'association \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" à soutenir la recherche et à organiser des actions pour aider les malades à mieux vivre avec la maladie et ses traitements" ;
    let title = "Les achats solidaires de \"La Breizh De L'espoir, Brûlons La Mucoviscidose\"";


    let id = req.params.id;

    let achats_paiement = [];

    let achats_prix = [];

    let objet = [];

    let reseaux = [];

    let last_news;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];



    objet = await axios.get("http://api-content.labreizhdelespoir.com/api/achat/"+id).then((response) => {
        return response.data
    })


    achats_paiement = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_achat").then((response) => {
        return response.data
    })

    achats_prix = await axios.get("http://api-content.labreizhdelespoir.com/api/price_achat").then((response) => {
        return response.data
    })

    title = objet.name + " | " + title ;


    res.render("achat_one", {title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, objet:objet, achats_paiement:achats_paiement, achats_prix:achats_prix})

}
