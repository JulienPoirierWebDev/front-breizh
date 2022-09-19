const {response} = require("express");
const {initialRequest} = require("../utils/controller_functions");
const axios = require('axios').default;

// include node fs module
const fs = require('fs');

const path = require('path');


exports.postNews = async (req, res, next) => {
    try{
    let now = new Date(Date.now());
    let creation_date = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();
    let update_date = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + (now.getDate()+1);


    let data = {
        content:req.body.content,
        creation_date:creation_date,
        update_date:update_date
    }

    let bearer = "bearer " + req.session.token;
    console.log(bearer)

    let auth = {
        authorization: bearer
    }


    await axios.post("http://api-content.labreizhdelespoir.com/api/news", data, {headers:auth}).then(response => {
            res.redirect("/login-for-pp/gerer-les-news")

    }).catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
    )

}
catch (err) {
    res.json(err)
}
}

exports.updateNews = async (req, res, next) => {
    let now = new Date(Date.now());
    let id = req.body.id;
    let content = req.body.content;
    let creation_date = req.body.creation_date;
    let update_date = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + (now.getDate()+1);

    let data = {
        content:content,
        creation_date:creation_date,
        update_date:update_date
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/news/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-news")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deleteNews = async (req, res, next) => {
    let id = req.params.id;

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/news/" + id, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-news")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}


//Evenements
exports.postEvent = async (req, res, next) => {

    let data = {
        name:req.body.name,
        description:req.body.description,
        city:req.body.city,
        location:req.body.location,
        poster:req.body.poster,
        date_event:req.body.date_event,
        link_map:req.body.link_map
    }
    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.post("http://api-content.labreizhdelespoir.com/api/events", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-evenements")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updateEvent = async (req, res, next) => {
    let id = req.body.event_id;

    let data = {
        name:req.body.name,
        description:req.body.description,
        city:req.body.city,
        location:req.body.location,
        poster:req.body.poster,
        date_event:req.body.date_event,
        link_map:req.body.link_map
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/events/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-evenements")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deleteEvent = async (req, res, next) => {
    console.log(req.params)
    let id = req.params.id;

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.delete("http://api-content.labreizhdelespoir.com/api/paiement_event/delete_custom/id_event/" + id, {headers:auth}).then(async response => {
        await axios.delete("http://api-content.labreizhdelespoir.com/api/price_event/delete_custom/id_event/" + id, {headers:auth}).then(async response => {
            await axios.delete("http://api-content.labreizhdelespoir.com/api/events/" + id, {headers:auth}).then(response => {

                res.redirect("/login-for-pp/gerer-les-evenements")

            }).catch((error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }
                        console.log(error.config);
                    })
        }).catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })
    }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })

}


// articles
exports.postArticle = async (req, res, next) => {

    let data = {
        title:req.body.title,
        content:req.body.content,
        article_type:req.body.article_type,
    }
    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.post("http://api-content.labreizhdelespoir.com/api/articles", data, {headers:auth}).then(response => {
        if(data.article_type === "lily") {
            res.redirect("/login-for-pp/gerer-la-section-lily-art")
        } else if (data.article_type === "maladie") {
            res.redirect("/login-for-pp/gerer-la-section-maladie")
        } else if (data.article_type === "message_support") {
            res.redirect("/login-for-pp/gerer-les-soutiens")
        }

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updateArticle = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        title:req.body.title,
        content:req.body.content,
        article_type:req.body.article_type,
    }

    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/articles/" + id , data, {headers:auth}).then(response => {
        if(data.article_type === "lily") {
            res.redirect("/login-for-pp/gerer-la-section-lily-art")
        } else if (data.article_type === "maladie") {
            res.redirect("/login-for-pp/gerer-la-section-maladie")
        } else if (data.article_type === "message_support") {
            res.redirect("/login-for-pp/gerer-les-soutiens")
        }
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deleteArticle = async (req, res, next) => {
    let id = req.params.id;
    let article_type = req.params.article_type;


    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/articles/" + id, {headers:auth}).then(response => {
        if(article_type === "lily") {
            res.redirect("/login-for-pp/gerer-la-section-lily-art")
        } else if (article_type === "maladie") {
            res.redirect("/login-for-pp/gerer-la-section-maladie")
        } else if (article_type === "message_support") {
            res.redirect("/login-for-pp/gerer-les-soutiens")
        }
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

// Paiement_don
exports.postPaiement_don = async (req, res, next) => {

    let data = {
        method:req.body.method,
        link_paiement:req.body.link_paiement,
        id_don:parseInt(req.body.id_paiement_don),
    }
    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.post("http://api-content.labreizhdelespoir.com/api/paiement_don", data, {headers:auth}).then(response => {
            res.redirect("/login-for-pp/gerer-la-page-dons")
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updatePaiement_don = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        method:req.body.method,
        link_paiement:req.body.link_paiement,
        id_don:req.body.id_don,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/paiement_don/" + id , data, {headers:auth}).then(response => {
            res.redirect("/login-for-pp/gerer-la-page-dons")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deletePaiement_don = async (req, res, next) => {
    let id = req.params.id;


    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/paiement_don/" + id, {headers:auth}).then(response => {
            res.redirect("/login-for-pp/gerer-la-page-dons")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

// Paiement_event
exports.postPaiement_event = async (req, res, next) => {

    let data = {
        method:req.body.method,
        link_paiement:req.body.link_paiement,
        id_event:parseInt(req.body.id_paiement_event),
    }
    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.post("http://api-content.labreizhdelespoir.com/api/paiement_event", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-evenements")
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updatePaiement_event = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        method:req.body.method,
        link_paiement:req.body.link_paiement,
        id_event:req.body.id_event,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/paiement_event/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-evenements")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deletePaiement_event = async (req, res, next) => {
    let id = req.params.id;


    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/paiement_event/" + id, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-evenements")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

// Paiement_achat
exports.postPaiement_achat = async (req, res, next) => {

    let data = {
        method:req.body.method,
        link_paiement:req.body.link_paiement,
        id_achat:parseInt(req.body.id_paiement_achat),
    }
    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.post("http://api-content.labreizhdelespoir.com/api/paiement_achat", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-la-page-vente")
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updatePaiement_achat = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        method:req.body.method,
        link_paiement:req.body.link_paiement,
        id_achat:req.body.id_achat,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/paiement_achat/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-la-page-achat")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deletePaiement_achat = async (req, res, next) => {
    let id = req.params.id;


    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/paiement_achat/" + id, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-la-page-vente")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}


//Achats
exports.postAchat = async (req, res, next) => {

    let data = {
        name:req.body.name,
        description:req.body.description,
    }
    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.post("http://api-content.labreizhdelespoir.com/api/achat", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-la-page-vente")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updateAchat = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        name:req.body.name,
        description:req.body.description,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/achat/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-la-page-vente")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deleteAchat = async (req, res, next) => {
    let id = req.params.id;

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }
/*    await axios.delete("http://api-content.labreizhdelespoir.com/api/paiement_event/delete_custom/id_event/" + id, {headers:auth}).then(async response => {
*/
    await axios.delete("http://api-content.labreizhdelespoir.com/api/paiement_achat/delete_custom/id_achat/" + id, {headers:auth}).then(async response => {
        await axios.delete("http://api-content.labreizhdelespoir.com/api/price_achat/delete_custom/id_achat/" + id, {headers:auth}).then(async response => {
            await axios.delete("http://api-content.labreizhdelespoir.com/api/achat/" + id, {headers:auth}).then(response => {

                res.redirect("/login-for-pp/gerer-la-page-vente")

            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
    }).catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    })

}

// Document
exports.postDocument = async (req, res, next) => {

    let data = {
        doc_name:req.body.doc_name,
        doc_link:req.file.filename
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.post("http://api-content.labreizhdelespoir.com/api/document", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-le-contenu-fixe")
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updateDocument = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        doc_name:req.body.doc_name,
        doc_link:req.body.doc_link,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/document/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-le-contenu-fixe")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deleteDocument = async (req, res, next) => {
    let id = req.params.id;
    let name = req.params.name;
    console.log(name)

    let randomPath = __basedir +'/public/images/uploads/'+name;
    let newPath = path.normalize(randomPath)
// delete file named rs'sample.txt' Synchronously
    console.log(newPath)
    if(fs.existsSync(newPath)) {
        fs.unlinkSync(newPath);
        console.log('File deleted!');
    }
    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/document/" + id, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-le-contenu-fixe")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}


// Reseaux
exports.postReseaux = async (req, res, next) => {

    let data = {
        name:req.body.name,
        link_reseau:req.body.link_reseau,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.post("http://api-content.labreizhdelespoir.com/api/reseaux", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-le-contenu-fixe")
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updateReseaux = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        name:req.body.name,
        link_reseau:req.body.link_reseau,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/reseaux/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-le-contenu-fixe")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deleteReseaux = async (req, res, next) => {
    let id = req.params.id;


    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/reseaux/" + id, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-le-contenu-fixe")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}


//Dons
exports.postDons = async (req, res, next) => {

    let data = {
        name:req.body.name,
        content:req.body.content,
        poster:req.body.poster
    }
    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.post("http://api-content.labreizhdelespoir.com/api/dons", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-la-page-dons")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updateDons = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        name:req.body.name,
        content:req.body.content,
        poster:req.body.poster
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/dons/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-la-page-dons")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.deleteDons = async (req, res, next) => {
    let id = req.params.id;

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.delete("http://api-content.labreizhdelespoir.com/api/paiement_don/delete_custom/id_dons/" + id, {headers:auth}).then(async response => {
            await axios.delete("http://api-content.labreizhdelespoir.com/api/dons/" + id, {headers:auth}).then(response => {

                res.redirect("/login-for-pp/gerer-la-page-dons")

            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })

}

// Price_event
exports.postPrice_event = async (req, res, next) => {
    let data = {
        categ_name:req.body.categ_name,
        categ_descr:req.body.categ_descr,
        id_event:parseInt(req.body.id_price_event),
        price: parseInt(req.body.price),
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.post("http://api-content.labreizhdelespoir.com/api/price_event", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-evenements")
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updatePrice_event = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        categ_name:req.body.method,
        id_event:req.body.link_paiement,
        price:req.body.id_don,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/price_event/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-evenements")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )

}

exports.deletePrice_event = async (req, res, next) => {
    let id = req.params.id;


    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/price_event/" + id, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-evenements")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )

}

// Supports
exports.postSupport = async (req, res, next) => {

    let data = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        description:req.body.description,
        poster:req.body.poster,
        type_support:req.body.type_support,
        link_website:req.body.link_website
    }
    console.log(data)

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }

    await axios.post("http://api-content.labreizhdelespoir.com/api/support", data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-soutiens")
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )


}

exports.updateSupport = async (req, res, next) => {

    let id = req.body.id;

    let data = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        description:req.body.description,
        poster:req.body.poster,
        type_support:req.body.type_support,
        link_website:req.body.link_website
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/support/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-soutiens")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )

}

exports.deleteSupport = async (req, res, next) => {
    let id = req.params.id;


    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/support/" + id, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-soutiens")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )

}

// Images
exports.postImage = async (req, res, next) => {
try{

    console.log(req.body)

       let data = {
           name:req.file.filename,
           alt:req.body.alt,
       }



           let bearer = "bearer " + req.session.token;


           let auth = {
               authorization: bearer
           }

    console.log(auth)
           await axios.post("http://api-content.labreizhdelespoir.com/api/images", data, {headers:auth}).then(response => {
               res.redirect("/login-for-pp/gerer-les-images")
           }).catch((error) => {
                   if (error.response) {
                       // The request was made and the server responded with a status code
                       // that falls out of the range of 2xx
                       console.log(error.response.data);
                       console.log(error.response.status);
                       console.log(error.response.headers);
                   } else if (error.request) {
                       // The request was made but no response was received
                       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                       // http.ClientRequest in node.js
                       console.log(error.request);
                   } else {
                       // Something happened in setting up the request that triggered an Error
                       console.log('Error', error.message);
                   }
                   console.log(error.config);
               }
           )


} catch (err) {
    res.json([{err: err, message:"Erreur server"}])
}
}

exports.updateImage = async (req, res, next) => {
    let id = req.body.id;

    let data = {
        name:req.body.name,
        alt:req.body.alt,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/images/" + id , data, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-images")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )

}

exports.deleteImage = async (req, res, next) => {
    let id = req.params.id;
    let name = req.params.name;
    console.log(name)

    let randomPath = __basedir +'/public/images/uploads/'+name;
    let newPath = path.normalize(randomPath)
// delete file named rs'sample.txt' Synchronously
    fs.unlinkSync(newPath);
    console.log('File deleted!');

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.delete("http://api-content.labreizhdelespoir.com/api/images/" + id, {headers:auth}).then(response => {
        res.redirect("/login-for-pp/gerer-les-images")

    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )

}

exports.updateAssociation = async (req, res, next) => {
    let id1 = req.body["info-id-1"];
    let name1 = req.body["info-name-1"];
    let content1 = req.body["info-content-1"];

    let id2 = req.body["info-id-2"];
    let name2 = req.body["info-name-2"];
    let content2 = req.body["info-content-2"];

    let id3 = req.body["info-id-3"];
    let name3 = req.body["info-name-3"];
    let content3 = req.body["info-content-3"];

    let id4 = req.body["info-id-4"];
    let name4 = req.body["info-name-4"];
    let content4 = req.body["info-content-4"];

    let data1 = {
        name:name1,
        content:content1,
    }

    let data2 = {
        name:name2,
        content:content2,
    }

    let data3 = {
        name:name3,
        content:content3,
    }

    let data4 = {
        name:name4,
        content:content4,
    }

    let bearer = "bearer " + req.session.token;

    let auth = {
        authorization: bearer
    }


    await axios.put("http://api-content.labreizhdelespoir.com/api/associations/" + id1 , data1, {headers:auth}).then(async (response) => {
        await axios.put("http://api-content.labreizhdelespoir.com/api/associations/" + id2 , data2, {headers:auth}).then(async(response) => {
            await axios.put("http://api-content.labreizhdelespoir.com/api/associations/" + id3 , data3, {headers:auth}).then(async(response) => {
                await axios.put("http://api-content.labreizhdelespoir.com/api/associations/" + id4 , data4, {headers:auth}).then(response => {
                    res.redirect("/login-for-pp/gerer-les-news")
                }).catch((error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }
                        console.log(error.config);
                    }
                )
            }).catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                }
            )
        }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            }
        )
    }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    )








}

