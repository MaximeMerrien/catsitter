const express = require("express");
const router = express.Router();
require("dotenv").config();

const connectDb = require("../utils/connectDb");
const Annonce = require("../models/Annonces");

const db = connectDb();

router.get("/:id", (req, res) => {
    res.render("reponseAnnonce", { });
});

router.post("/:id", (req, res) => {
    const nom = req.body.nom;
    const annonceur = req.body.annonceur ? 'Chez l\'annonceur' : '';
    const catsitter = req.body.catsitter ? 'Chez le catsitter' : '';
    let lieu = '';
    if (req.body.annonceur)
    {
        lieu = annonceur;
        if (req.body.catsitter)
        {
            lieu = annonceur.concat(', ', catsitter);
        }
    } else if (req.body.catsitter)
    {
        lieu = catsitter;
    }
    const prix = req.body.prix;

    let idAnnonce = req.path;
    idAnnonce = idAnnonce.substring(1);

    if (db) {
        Annonce.find({ _id: idAnnonce})
        .exec((err, annonce) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Could not retrieve annonces" });
            }
            res.render("reponseAnnonce", { nom, lieu, prix, annonce });
        });
    } else {
        res.render("reponseAnnonce", {});
    }
});

module.exports = router;