const mongoose = require("mongoose");

const AnnonceSchema = new mongoose.Schema({
    nom: mongoose.Schema.Types.String,
    nbChats: mongoose.Schema.Types.Number,
    nomImage: mongoose.Schema.Types.String,
    lieu: mongoose.Schema.Types.String,
    dateDebut: mongoose.Schema.Types.Date,
    dateFin: mongoose.Schema.Types.Date,
    email: mongoose.Schema.Types.String
});

module.exports = mongoose.model("Annonces", AnnonceSchema);