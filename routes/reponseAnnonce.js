const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("reponseAnnonce", {});
});

router.post("/", (req, res) => {
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

    res.render("reponseAnnonce", { nom, lieu, prix });
});

module.exports = router;