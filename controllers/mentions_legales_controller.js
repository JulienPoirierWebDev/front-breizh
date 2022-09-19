const {default: axios} = require("axios");
const {initialRequest} = require("../utils/controller_functions");

exports.mentionsLegales = async (req, res, next) => {

    let keywords = "";
    let description = "Mentions légales ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Mentions légales \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" !";

    let reseaux = [];
    let last_news;
    let achats;

    let association_infos;

    let documents;

    association_infos = await axios.get("http://api-content.labreizhdelespoir.com/api/associations").then((response) => {
        return response.data
    })

    documents = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2];

    res.render("mentions_legales", {achats : achats, title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, association_infos:association_infos, documents:documents})
}

exports.downloadDocument= async (req, res) => {

    let filename = req.params.doc;
    res.download( __basedir +"/public/images/uploads/" + filename )}