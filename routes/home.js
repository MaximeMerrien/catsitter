const express = require("express");
const moment = require('moment');
const paginate = require('express-paginate');

const AWS = require("aws-sdk");
const conf = require("../utils/config.js");
AWS.config.update(conf.config);

const router = express.Router();

router.use(paginate.middleware(5, 50));

router.get("/", (req, res) => {
    res.redirect("/1");
})
.get("/:page", async (req, res, next) => {
    // const perPage = 8;
    // const page = req.params.page || 1;

    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "catsitter";

    var params = {
        TableName: table,
        Key: {
            "id": "1"
        }
    };

    // Faut tout récup et afficher dans la var 'annonces'
    docClient.get(params, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "Error - " + JSON.stringify(err, null, 2) });
        } else {
            res.render('home', {
                annonces: data.Item,
                moment: moment,
                current: 1,
                pages: 1
            })
        }
    });

    // Annonce
    // .find({})
    // .skip((perPage * page) - perPage)
    // .limit(perPage)
    // .exec(function(err, annonces) {
    //     Annonce.count().exec(function(err, count) {
            // if (err) return next(err)
            // res.render('home', {
            //     // annonces: annonces,
            //     moment: moment,
            //     current: page,
            //     pages: 1 //Math.ceil(count / perPage)
            // })
    //     })
    // })
});

module.exports = router;