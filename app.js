const express = require('express');

const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);


global.__basedir = __dirname;

const accueuilRoutes = require("./routes/accueil_routes")
const achatsRoutes = require("./routes/achats_routes")
const adminRoutes = require("./routes/admin_routes")
const contactRoutes = require("./routes/contact_routes")
const donRoutes = require("./routes/don_routes")
const evenementsRoutes = require("./routes/evenements_routes")
const forumRoutes = require("./routes/forum_routes")
const maladieRoutes = require("./routes/maladie_routes")
const newsRoutes = require("./routes/news_routes")
const soutiensRoutes = require("./routes/soutiens_routes")
const requestRoutes = require("./routes/request_routes")
const mentionsLegalesRoutes = require("./routes/mentions_legales_routes")


const app = express();

/*

app.use(function(request, response, next) {

    if (!request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
    }
    next();
})
*/



const options = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const sessionStore = new MySQLStore(options);


const sess = {
    secret: process.env.SESSION_SECRET,
    /*resave: false,*/
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge:604800000 },
    key: 'breizh-name',
    store:sessionStore
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

/*
const sess = {
    secret: 'keyboard cat',
    cookie: {maxAge:36000000},
    resave: false,
    saveUninitialized: true,
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

 */

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(express.json());


app.use('/', accueuilRoutes);
app.use('/achats-solidaires/', achatsRoutes);
app.use('/login-for-pp/', adminRoutes);
app.use('/contactez-nous/', contactRoutes);
app.use('/faire-un-don/', donRoutes);
app.use('/nos-evenements/', evenementsRoutes);
app.use('/notre-forum/', forumRoutes);
app.use('/connaitre-la-maladie/', maladieRoutes);
app.use('/nos-actualites/', newsRoutes);
app.use('/nos-soutiens/', soutiensRoutes);
app.use('/request/', requestRoutes);
app.use('/mentions-legales/', mentionsLegalesRoutes)











app.use((req, res, next) => {
    res.status(404).send("404")
})





module.exports = app;