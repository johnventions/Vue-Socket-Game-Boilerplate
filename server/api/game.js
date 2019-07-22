
var mongoose = require("mongoose");

const Game = require("../models/Game.js");
const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function makecode() {
    var code = "";
    for (var i = 0; i < 4; i++)
        code += alpha.charAt(Math.floor(Math.random() * alpha.length));
    return code;
}

module.exports = function (db) {
    const routes = require('express').Router();

    routes.post("/", async function (req, res) {
        var code = makecode();
        var newgame = new Game({
            "_id": new mongoose.Types.ObjectId,
            "code": code,
            "createDate": Date.now(),
            "started": false,
            "completed": false,
        });
        newgame.save();
        req.session.code = code;
        console.log("Created game: " + code);
        return res.status(200).json({ message: 'Connected!' + code });
    });

    routes.post("/join/:gameid", async function (req, res) {
        var code = req.params.gameid;
        return res.status(200).json({ message: 'Connected!' + code });
    });

    return routes;
}