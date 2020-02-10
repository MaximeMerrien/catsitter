const express = require("express");
const fs = require("fs");
const moment = require('moment');
require("dotenv").config();

const router = express.Router();

const connectDb = require("../utils/connectDb");
const Annonce = require("../models/Annonces");

const db = connectDb();

router.get("/", (req, res) => {
    fs.readdir("public/images", (err, files) => {
        if (err) {
            res.render("home", { error: "Images non disponibles" });
        } else {
            if (db) {
                Annonce.find({})
                .exec((err, annonces) => {
                    if (err) {
                    return res
                        .status(500)
                        .json({ message: "Could not retrieve annonces" });
                    }
                    res.render("home", { files, annonces, moment });
                });
            } else {
                res.render("home", { files });
            }
        }
    });
});

module.exports = router;