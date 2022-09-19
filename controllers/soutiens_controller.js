const {default: axios} = require("axios");
const {initialRequest} = require("../utils/controller_functions");
const parser = require("@deskeen/markdown");
const {removeTags} = require("../utils/functions");

exports.tousLesSoutiens = async (req, res, next) => {
    let keywords = "";
    let description = "Magloire  DELCROS, Anny DUPEREY, Philippe CANDELORO, Helène DARRAS et Brice GOIDIN (et tant d'autres !) nous soutiennent ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Les soutiens de \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" !";

    let reseaux = [];
    let last_news;
    let soutiens ;
    let achats

    let articles;

    function compareId(a, b) {
        return a.id - b.id
    }

    soutiens = await axios.get("http://api-content.labreizhdelespoir.com/api/support").then((response) => {
        return response.data
    })

    soutiens = soutiens.sort(compareId);

    articles = await axios.get("http://api-content.labreizhdelespoir.com/api/articles").then((response) => {
        return response.data
    })

    articles.forEach(article => {
        article.noHtml = removeTags(parser.parse(article.content).innerHTML);
        article.content = parser.parse(article.content).innerHTML
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2];

    res.render("soutiens_all", { achats:achats, title: title, keywords:keywords, description:description, last_news :last_news,reseaux:reseaux, soutiens:soutiens, articles:articles})
}

exports.voirUnTemoignage = async (req, res, next) => {

    let keywords = "";
    let description = "Magloire  DELCROS, Anny DUPEREY, Philippe CANDELORO, Helène DARRAS et Brice GOIDIN (et tant d'autres !) nous soutiennent ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Les soutiens de \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" !";

    let reseaux = [];

    let last_news;

    let achats;

    let temoignage_html

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats=result[2];

    let temoignage = await axios.get("http://api-content.labreizhdelespoir.com/api/articles/" + req.params.id).then((response) => {
        return response.data[0]
    })

    title = temoignage.title + " | " + title ;



    temoignage_html = parser.parse(temoignage.content).innerHTML


    res.render("soutiens_temoignage", {achats:achats, title: title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, temoignage_html:temoignage_html, temoignage:temoignage})
}