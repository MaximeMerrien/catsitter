const mongoose = require("mongoose");

const AnnonceSchema = new mongoose.Schema({
    nom: mongoose.Schema.Types.String,
    nbChats: mongoose.Schema.Types.Number,
    dateDebut: mongoose.Schema.Types.Date,
    dateFin: mongoose.Schema.Types.Date
});

module.exports = mongoose.model("Annonces", AnnonceSchema);