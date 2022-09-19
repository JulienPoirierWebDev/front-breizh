const {default: axios} = require("axios");
const {initialRequest} = require("../utils/controller_functions");
const parser = require("@deskeen/markdown");

exports.tousLesDons = async (req, res, next) => {

    let keywords = "";
    let description = "Pour lutter contre la mucoviscidose, chaque euro compte ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Faites un don ! Soutenez \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" !";


    let reseaux = [];

    let dons;

    let don_paiements;

    let last_news;


    dons = await axios.get("http://api-content.labreizhdelespoir.com/api/dons").then((response) => {
        return response.data;
    })

    don_paiements = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_don").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    let achats = result[2];

    res.render("don_tousLesDons", {title:title, description:description, keywords:keywords,achats:achats, last_news :last_news,reseaux:reseaux, dons:dons, don_paiements:don_paiements})

}

exports.attentionAdresse = async(req, res, next) => {

    let keywords = "";
    let description = "Pour lutter contre la mucoviscidose, chaque euro compte ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Faitez un don ! Soutenez \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" !";


    let don_id = req.params.id;
    let reseaux = [];
    let last_news;
    let dons, don_paiements;

    don = await axios.get("http://api-content.labreizhdelespoir.com/api/dons/" + don_id).then((response) => {
        return response.data[0];
    })

    don_id = parseInt(req.params.id);


    don.content = parser.parse(don.content).innerHTML

    don_paiements = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_don").then((response) => {
        return response.data
    })




    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    let achats = result[2];
    res.render("don_attention", {title:title, description:description, keywords:keywords,achats:achats, last_news :last_news,reseaux:reseaux, dons:dons, don_paiements:don_paiements, don_id:don_id})
}