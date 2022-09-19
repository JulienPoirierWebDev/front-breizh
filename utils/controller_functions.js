const {default: axios} = require("axios");
const {sqlToJsDate} = require("./functions");
exports.initialRequest = async () => {
    let reseaux, last_news, achats;
    reseaux = await axios.get("http://api-content.labreizhdelespoir.com/api/reseaux").then((response) => {
        return response.data
    })

    last_news = await axios.get("http://api-content.labreizhdelespoir.com/api/news/last_news").then((response) => {
        return response.data[0]
    })


    achats = await axios.get("http://api-content.labreizhdelespoir.com/api/achat").then((response) => {
        return response.data
    })

    last_news.creation_date = sqlToJsDate(last_news.creation_date)


    return [reseaux, last_news, achats]
}

exports.test_authenticated = async (req, res) => {
    let data = {
        token:req.body.token
    };
    let headers = {
        headers: {"Content-Type": "application/json"}
    }
    await axios.post("http://api-content.labreizhdelespoir.com/api/user/is_authenticated", data, headers).then((response) => {
        res.json(response)
        if(typeof response.token === "undefined"){
            res.redirect("/")
        } else {
            return true;
        }
    }).catch(()=> {
        res.json({error:"error",
        data:data})
    })
}