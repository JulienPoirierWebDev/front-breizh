const {default: axios} = require("axios");
const {initialRequest} = require("../utils/controller_functions");
const {sqlToJsDate, rawurlencode, mapGoogle} = require("../utils/functions");
const parser = require("@deskeen/markdown");

exports.tousLesEvenements = async(req, res, next) => {


    let reseaux = [];

    let last_news;

    let achats;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2];

    res.render("evenement_tousLesEvenements", {last_news :last_news,reseaux:reseaux, achats:achats})
}

exports.voirUnEvenement = async(req, res, next) => {

    let keywords = "";
    let description = "Participez a notre évènement ! \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" soutient la recherche et organise des actions pour aider les malades à mieux vivre avec la maladie et ses traitements." ;
    let title = "Soutenez \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" !";

    let reseaux = [];

    let last_news;

    let achats;

    let event_id = req.params.id;

    let one_event;

    let paiements_event;

    let prices_event;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2]

    one_event = await axios.get("http://api-content.labreizhdelespoir.com/api/events/"+event_id).then((response) => {
        return response.data[0]
    })
    one_event.date_event = sqlToJsDate(one_event.date_event)

    paiements_event = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_event/").then((response) => {
        return response.data
    })
    console.log(paiements_event)

    prices_event = await axios.get("http://api-content.labreizhdelespoir.com/api/price_event/").then((response) => {
        return response.data
    })
    console.log(prices_event)

    title = one_event.name + " | " + title ;

    one_event.description = parser.parse(one_event.description).innerHTML



    let url_map = mapGoogle(one_event.city, one_event.location);

    res.render("evenement_voirUnEvenement", {title:title, description:description, keywords:keywords, last_news :last_news,reseaux:reseaux, achats:achats, one_event:one_event, url_map:url_map, prices_event:prices_event, paiements_event:paiements_event})
}