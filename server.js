// Requires
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/home");
const annonceRouter = require("./routes/posterAnnonce");
const contactRouter = require("./routes/contact");

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
.use(express.static("public"))
// Custom
.use("/", indexRouter)
.use("/contact", contactRouter)
.use("/posterAnnonce", annonceRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});