const express = require("express");
const moment = require('moment');
require("dotenv").config();

const router = express.Router();

const connectDb = require("../utils/connectDb");
const Annonce = require("../models/Annonces");

const db = connectDb();

router.get("/", (req, res) => {
    if (db) {
        Annonce.find({})
        .exec((err, annonces) => {
            if (err) {
            return res
                .status(500)
                .json({ message: "Could not retrieve annonces" });
            }
            res.render("home", { annonces, moment });
        });
    } else {
        res.render("home", {});
    }
});

module.exports = router;