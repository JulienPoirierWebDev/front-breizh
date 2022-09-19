const {default: axios} = require("axios");
const {initialRequest} = require("../utils/controller_functions");


const parser = require('@deskeen/markdown')
const {removeTags} = require("../utils/functions");


exports.tousLesArticles = async (req, res, next) => {
    let articles;

    let keywords = "";
    let description = "Vous souhaitez mieux connaitre la muco ? \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "La maladie et nos articles | \"La Breizh De L'espoir, Brûlons La Mucoviscidose\"";


    articles = await axios.get("http://api-content.labreizhdelespoir.com/api/articles").then((response) => {
        return response.data
    })

    articles.forEach(article => {
        article.noHtml = removeTags(parser.parse(article.content).innerHTML);
    })

    let result = await initialRequest();
    let reseaux = result[0];
    let last_news = result[1];
    let achats = result[2];

    res.render("maladie_all", {achats:achats, title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, articles:articles})
}

exports.voirUnArticle = async (req, res, next) => {

    let keywords = "";
    let description = "Vous souhaitez mieux connaitre la muco ? \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "La maladie et nos articles | \"La Breizh De L'espoir, Brûlons La Mucoviscidose\"";

    let reseaux = [];

    let last_news;
    let achats;

    let article;

    article = await axios.get("http://api-content.labreizhdelespoir.com/api/articles/" + req.params.id).then((response) => {
        return response.data[0]
    })

    let articleHtml = parser.parse(article.content).innerHTML


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2];

    title = article.title + " | " + title ;


    res.render("maladie_oneArticle", {achats:achats, title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, articleHtml:articleHtml, article:article})
}