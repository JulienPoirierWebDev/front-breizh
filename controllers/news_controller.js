const {default: axios} = require("axios");
const {initialRequest} = require("../utils/controller_functions");
const {sqlToJsDate} = require("../utils/functions");

exports.toutesLesNews = async (req, res, next) => {

    let keywords = "";
    let description = "Découvre nos dernières actualités : Pascal COTO, le président, vous informe ! ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Les actualités de \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" !";

    let reseaux = [];

    let last_news;

    let achats;

    let news;

    news = await axios.get("http://api-content.labreizhdelespoir.com/api/news").then((response) => {
        return response.data
    })

    news.forEach(element => {
        element.creation_date = sqlToJsDate(element.creation_date)

    })


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2]


    res.render("news_all", {achats:achats, title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, news:news})
}

exports.voirUneNews = async (req, res, next) => {
    let keywords = "";
    let description = "Découvre nos dernières actualités : Pascal COTO, le président, vous informe ! ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Les actualités de \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" !";

    let reseaux = [];

    let last_news;

    let achats;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2];

    res.render("news_one", { achats:achats, title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux})
}