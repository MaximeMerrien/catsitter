const express = require("express");
const moment = require('moment');
const paginate = require('express-paginate');
require("dotenv").config();

const router = express.Router();

const connectDb = require("../utils/connectDb");
const Annonce = require("../models/Annonces");

connectDb();

router.use(paginate.middleware(5, 50));

router.get("/", (req, res) => {
    res.redirect("/1");
})
.get("/:page", async (req, res, next) => {
    const perPage = 8;
    const page = req.params.page || 1;

        Annonce
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, annonces) {
            Annonce.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('home', {
                    annonces: annonces,
                    moment: moment,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
});

module.exports = router;