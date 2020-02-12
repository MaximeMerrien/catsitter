// Requires
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/home");
const annonceRouter = require("./routes/posterAnnonce");
const contactRouter = require("./routes/contact");
const reponseAnnonceRouter = require("./routes/reponseAnnonce");

// Vars
const app = express();
const PORT = 3000;

// Sets
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

// Middlewares
app.use(express.urlencoded({ extended: true }))
.use(expressLayouts)
.use(express.static(__dirname + "/public"))
// Custom
.use("/contact", contactRouter)
.use("/posterAnnonce", annonceRouter)
.use("/reponseAnnonce", reponseAnnonceRouter)
// On met ça à la fin sinon le middleware est utilisé sur toutes les routes,
// ce qui a pour effet de ne pas prendre en compte les middlewares ci-dessus
.use("/", indexRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});