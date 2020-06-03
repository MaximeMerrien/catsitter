const express = require("express");
const path = require("path");
const fs = require("fs");

const AWS = require("aws-sdk");
const conf = require("../utils/config.js");
AWS.config.update(conf.config);
const bucketName = 'groupe1-2020';

const router = express.Router();

router.get("/", (req, res) => {
    res.render("posterAnnonce",  {});
});

router.post("/", (req, res) => {
    var uploadImageParams = {
        Bucket: bucketName,
        Key: '',
        Body: ''
    };

    var nomImage = req.file.filename;

    var fileStream = fs.createReadStream(nomImage);
    fileStream.on('error', function(err) {
        return res.status(500).json({ message: "Erreur lors de la création du lecteur" });
    });
    uploadImageParams.Body = fileStream;
    uploadImageParams.Key = path.basename(nomImage);

    s3.upload(uploadImageParams, function (err, data) {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'ajout de l'image" });
        }
    });

    var imagePath = "https://"+ bucketName +".s3.amazonaws.com/" + nomImage;

    var nom = req.body.nom;
    var nbChats = req.body.nbChats;
    var lieu = req.body.lieu;
    var dateDebut = req.body.dateDebut + ':' + req.body.tempsDebut;
    var dateFin = req.body.dateFin + ':' + req.body.tempsFin;
    var email = req.body.email;
    var display = req.body.display;

    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "catsitter";

    var params = {
        TableName:table,
        Item:{
            "id": Math.floor(Math.random() * Math.floor(500)).toString(),
            "nom": nom,
            "nbChats": nbChats,
            "nomImage": imagePath,
            "lieu": lieu,
            "dateDebut": dateDebut,
            "dateFin": dateFin,
            "email": email
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            return res.status(500).json({ message: JSON.stringify(err, null, 2) });
        } else {
            res.render("posterAnnonce", { display });
        }
    });
});

module.exports = router;