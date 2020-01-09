// Requires
const express = require("express");
const fs = require("fs");

// Other
const filename = "messages.txt";
const writer = fs.createWriteStream(filename, { flags: "a" });
const router = express.Router();

// Data
const coords = {
    address: "1 Avenue Alphonse Legault, 35170 Bruz",
    tel: "01-02-03-04-05",
    email: "contact@catsitter.com"
};

let messages = [];

router.get("/", (req, res) => {
    res.render("contact", { coords });
});

router.post("/", (req, res) => {
    const message = { message: req.body, date: new Date().toISOString() };
    messages = [...messages, message];
    writer.write(JSON.stringify(messages), err => {
        if (err) {
            return res.status(500).send({ msg: "Error saving data" });
        }
    });
    res.render("contact", { coords });
});

module.exports = router;