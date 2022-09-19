const {initialRequest, test_authenticated} = require("../utils/controller_functions");
const {default: axios} = require("axios");



exports.loginAdmin = async (req, res, next) => {

    let reseaux = [];
    let last_news;
    let achats;


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2]




    res.render("admin_login", {last_news :last_news, reseaux:reseaux, achats:achats})

}

exports.validationLoginAdmin = async (req, res, next) => {

    let login = req.body.pseudo;
    let password = req.body.password

    await axios.post("http://api-content.labreizhdelespoir.com/api/user/login",{
            login:login,
            password:password
        }
    ).then(async (response) => {
        let logged = response.data;
        req.session.id = logged.id;
        req.session.token = logged.token;
        req.session.save((err) => {
            if(err){
                res.json({
                    err : err,
                message : "Probleme avec la session save"})
            }
        })

        let reseaux = [];
        let last_news;
        let achats

        let result = await initialRequest();
        reseaux = result[0];
        last_news = result[1];
        achats = result[2]

        res.render("admin_panel", {last_news :last_news, reseaux:reseaux, achats:achats})


    }).catch( async error => {
        let reseaux = [];
        let last_news;
        let achats;

        let result = await initialRequest();
        reseaux = result[0];
        last_news = result[1];
        achats = result[2]

        res.render("admin_login", {last_news :last_news, reseaux:reseaux, message_erreur:error, achats:achats})    })

}

exports.adminPanel = async (req, res, next) => {
    let reseaux = [];
    let last_news;
    let achats;

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2]


    res.render("admin_panel", {last_news :last_news, reseaux:reseaux, achats:achats})

}

exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
}

exports.gestionAdminEvenements = async (req, res, next) => {
    try{
    let reseaux = [];
    let last_news;
    let achats;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

        /*
    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })
    */
    let evenements;

    let paiements;

    let prix;

    evenements = await axios.get("http://api-content.labreizhdelespoir.com/api/events").then((response) => {
        return response.data
    })

    paiements = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_event").then((response) => {
        return response.data
    })

    prix = await axios.get("http://api-content.labreizhdelespoir.com/api/price_event").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2]

    res.render("admin/gestion_evenements", {last_news :last_news, achats:achats, images:images, docs:allDocs, reseaux:reseaux, evenements:evenements, paiements:paiements, prices:prix})
    }
    catch(err){
        res.json(err)
    }
}

exports.gestionAdminEvenements_update = async (req, res, next) => {



    let id = req.params.id;

    let reseaux = [];
    let last_news;
    let achats;

    let one_event;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    one_event = await axios.get("http://api-content.labreizhdelespoir.com/api/events/" + id).then((response) => {
        return response.data[0]
    })


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2]

    res.render("admin/gestion_evenements_update", {
        docs:allDocs,
        last_news :last_news,
        reseaux:reseaux,
        one_event:one_event,
        images:images,
        achats:achats
    })

}


exports.gestionAdminNews = async (req, res, next) => {



    let reseaux = [];
    let last_news;
    let achats;

    let news;

    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    news = await axios.get("http://api-content.labreizhdelespoir.com/api/news").then((response) => {
        return response.data
    })


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2]

    res.render("admin/gestion_news", {last_news :last_news, reseaux:reseaux, news:news, images:images, achats:achats})

}

exports.gestionAdminNews_update = async (req, res, next) => {



    let reseaux = [];
    let last_news;
    let achats;

    let news;

    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    let id = req.params.id;

    news = await axios.get("http://api-content.labreizhdelespoir.com/api/news/"+id).then((response) => {
        return response.data[0]
    })



    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];
    achats = result[2];

    res.render("admin/gestion_news_update", {last_news :last_news, reseaux:reseaux, news:news, images:images, achats:achats})

}


exports.gestionAdminSoutiens = async (req, res, next) => {

    let reseaux = [];
    let last_news;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    let soutiens;

    let articles ;

    soutiens = await axios.get("http://api-content.labreizhdelespoir.com/api/support").then((response) => {
        return response.data
    })

    articles = await axios.get("http://api-content.labreizhdelespoir.com/api/articles").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_supports", {last_news :last_news, reseaux:reseaux, soutiens:soutiens, articles:articles, images:images, docs:allDocs})

}

exports.gestionAdminSoutiens_update = async (req, res, next) => {

    let reseaux = [];
    let last_news;

    let soutien;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    let soutien_id = req.params.id;

    soutien = await axios.get("http://api-content.labreizhdelespoir.com/api/support/" + soutien_id).then((response) => {
        return response.data[0]
    })


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_supports_update", {docs:allDocs,last_news :last_news, reseaux:reseaux, soutien:soutien, images:images})

}


exports.gestionAdminLily = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let articles ;


    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    articles = await axios.get("http://api-content.labreizhdelespoir.com/api/articles").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_lily", {docs:allDocs,last_news :last_news, reseaux:reseaux, articles:articles, images:images})

}

exports.gestionAdminLily_update = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    let articles ;

    articles = await axios.get("http://api-content.labreizhdelespoir.com/api/articles").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_lily", {docs:allDocs,last_news :last_news, reseaux:reseaux, articles:articles, images:images})

}


exports.gestionAdminMaladie = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let articles ;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    articles = await axios.get("http://api-content.labreizhdelespoir.com/api/articles").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_maladie", {docs:allDocs, last_news :last_news, reseaux:reseaux, articles:articles, images:images})

}

exports.gestionAdminArticle_update = async (req, res, next) => {



    let id_article = req.params.id
    let reseaux = [];
    let last_news;

    let article ;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    article = await axios.get("http://api-content.labreizhdelespoir.com/api/articles/" + id_article).then((response) => {
        return response.data[0]
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_article_update", {docs:allDocs, last_news :last_news, reseaux:reseaux, article:article, images:images})

}


exports.gestionAdminVente = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    let ventes ;

    let paiements;

    let prix;


    ventes = await axios.get("http://api-content.labreizhdelespoir.com/api/achat").then((response) => {
        return response.data
    })

    paiements = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_achat").then((response) => {
        return response.data
    })

    prix = await axios.get("http://api-content.labreizhdelespoir.com/api/price_achat").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_ventes", {docs:allDocs, last_news :last_news, reseaux:reseaux, ventes:ventes, paiements_ventes:paiements, prix:prix, images:images})

}

exports.gestionAdminVente_update = async (req, res, next) => {



    let vente_id = req.params.id;

    let reseaux = [];
    let last_news;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    let vente ;



    vente = await axios.get("http://api-content.labreizhdelespoir.com/api/achat/" + vente_id).then((response) => {
        return response.data[0]
    })



    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_ventes_update", {docs:allDocs, last_news :last_news, reseaux:reseaux, vente:vente, images:images})

}


exports.gestionAdminDons = async (req, res, next) => {



    let reseaux = [];
    let last_news;


    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })
    let dons ;

    let paiements;

    dons = await axios.get("http://api-content.labreizhdelespoir.com/api/dons").then((response) => {
        return response.data
    })

    paiements = await axios.get("http://api-content.labreizhdelespoir.com/api/paiement_don").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_dons", {docs:allDocs, last_news :last_news, reseaux:reseaux, dons:dons, paiements:paiements, images:images})

}

exports.gestionAdminDons_update = async (req, res, next) => {



    let id_don = req.params.id;
    let reseaux = [];
    let last_news;

    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    let don ;


    don = await axios.get("http://api-content.labreizhdelespoir.com/api/dons/" + id_don).then((response) => {
        return response.data[0]
    })



    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_dons_update", {docs:allDocs, last_news :last_news, reseaux:reseaux, don:don, images:images})

}


exports.gestionAdminContenuFixe = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let association;

    let documents;

    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    association = await axios.get("http://api-content.labreizhdelespoir.com/api/associations").then((response) => {
        return response.data
    })


    documents = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_params", {last_news :last_news, reseaux:reseaux, informations:association, documents:documents, images:images})

}


exports.gestionAdminImages = async (req, res, next) => {



    let reseaux = [];
    let last_news;



    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_images", {last_news :last_news, reseaux:reseaux, images:images})

}

exports.gestionAdminImages_update = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_images", {last_news :last_news, reseaux:reseaux, images:images})

}


exports.gestionAdminPrice = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })



    let type = req.params.type;
    let type_id = req.params.type_id;

    let action = "create";


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_price", {
        last_news :last_news,
        reseaux:reseaux,
        type_id:type_id,
        type:type,
        action:action,
        images:images

    })


}

exports.gestionAdminPrice_update = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })



    let type = req.params.type;
    let type_id = req.params.type_id;
    let id = req.params.id

    let price;

    price = await axios.get("http://api-content.labreizhdelespoir.com/api/"+ type+"/" + id).then((response) => {
        return response.data
    })

    let action = "update";


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_price", {
        last_news :last_news,
        reseaux:reseaux,
        type_id:type_id,
        type:type,
        id:id,
        action:action,
        categ_name:price.categ_name,
        categ_descr:price.categ_descr,
        price:price.price,
        images:images
    })


}


exports.gestionAdminPaiement = async (req, res, next) => {



    let reseaux = [];
    let last_news;

    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    let type = req.params.type;
    let type_id = req.params.type_id;

    let action = "create";


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_paiement", {
        last_news :last_news,
        reseaux:reseaux,
        type_id:type_id,
        type:type,
        action:action,
        images:images
    })

}
exports.gestionAdminPaiement_update = async (req, res, next) => {



    let reseaux = [];
    let last_news;
    let images;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    let type = req.params.type;
    let type_id = req.params.type_id;
    let id = req.params.id

    let paiement;

    paiement = await axios.get("http://api-content.labreizhdelespoir.com/api/"+ type +"/" + id).then((response) => {
        return response.data
    })

    let action = "update";


    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_price", {
        last_news: last_news,
        reseaux: reseaux,
        type_id: type_id,
        type: type,
        id: id,
        action: action,
        link_paiement: paiement.link_paiement,
        images:images
    })
}

exports.gestionArticleUpdate = async (req, res, next) => {



    let reseaux = [];
    let last_news;
    let images;

    let allDocs;

    images = await axios.get("http://api-content.labreizhdelespoir.com/api/images").then((response) => {
        return response.data
    })

    allDocs = await axios.get("http://api-content.labreizhdelespoir.com/api/document").then((response) => {
        return response.data
    })

    let article ;

    let id_article = req.params.id;

    article = await axios.get("http://api-content.labreizhdelespoir.com/api/articles/" + id_article).then((response) => {
        return response.data[0]
    })

    let result = await initialRequest();
    reseaux = result[0];
    last_news = result[1];

    res.render("admin/gestion_article_update", {docs:allDocs, last_news :last_news, reseaux:reseaux, article:article, images:images})

}