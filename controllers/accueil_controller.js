const {initialRequest} = require("../utils/controller_functions");
const parser = require("@deskeen/markdown");
const axios = require('axios').default;

exports.accueil = async (req, res, next) => {
    let keywords = "";
    let description = "Besoin de connaître la mucoviscidose ou de faire un don ? Ici, vous trouverez des infos sur les traitements et sur l'action de l'association. L'association \"La Breizh De L'espoir, Brûlons La Mucoviscidose\" aide a soutenir la recherche, aux patients de mieux vivre avec la maladie et est solidaire de la lutte contre les maladies génétiques " ;
    let title = "La Breizh De L'espoir, Brûlons La Mucoviscidose vous informe sur la maladie.";

    let events = [];
    let dons = [];
    let don_paiements = [];
    let achats = []
    let achat_paiements = [];
    let reseaux = [];
    let last_news;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

events = await axios.get("http://api-content.labreizhdelespoir.com/api/events").then((response) => {
    return response.data
})

dons = await axios.get("http://api-content.labreizhdelespoir.com/api/dons").then((response) => {
    return response.data;
})

don_paiements = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_don").then((response) => {
    return response.data
})

 achats =  await axios.get("http://api-content.labreizhdelespoir.com/api/achat").then((response) => {
    return response.data
 })

    achat_paiements = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_achat").then((response) => {
    return response.data
})

    achats.forEach(one_achat => {
        one_achat.description = parser.parse(one_achat.description).innerHTML
    })

    console.log("hello")
res.render("accueil", {description:description, title:title, keywords:keywords, last_news :last_news, events:events, dons: dons, don_paiements:don_paiements, achats:achats, achat_paiements:achat_paiements, reseaux:reseaux})
}
