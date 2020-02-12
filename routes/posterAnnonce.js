const express = require("express");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();

const router = express.Router();

const connectDb = require("../utils/connectDb");
const Annonce = require("../models/Annonces");

connectDb();

const allowedImageMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif"
];

let uploadedImageName = "";

var storage = multer.diskStorage({
    destination: "./public/images/",
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return cb(err);
            uploadedImageName = raw.toString("hex") + path.extname(file.originalname);
            cb(null, uploadedImageName);
        });
    }
});

const upload = multer({
    dest: "public/images",
    limits: 10 * 1024 * 1024,
    fileFilter: (req, file, cb) => {
        cb(null, allowedImageMimeTypes.includes(file.mimetype));
    },
    storage: storage
});

router.get("/", (req, res) => {
    res.render("posterAnnonce",  {});
});

router.post("/", upload.single("photosChats"), (req, res) => {
    const annonce = new Annonce({
        nom: req.body.nom,
        nbChats: req.body.nbChats,
        nomImage: req.file.filename,
        lieu: req.body.lieu,
        dateDebut: req.body.dateDebut + ':' + req.body.tempsDebut,
        dateFin: req.body.dateFin + ':' + req.body.tempsFin,
        email: req.body.email
    });

    annonce.save((err, annonce) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to save annonce" });
        } else {
            res.render("posterAnnonce", {});
        }
    });
});

module.exports = router;