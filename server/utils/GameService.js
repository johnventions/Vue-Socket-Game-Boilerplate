const Game = require("../models/Game.js");
const Player = require("../models/Player.js");
var mongoose = require("mongoose");

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function makecode() {
    var code = "";
    for (var i = 0; i < 4; i++)
        code += alpha.charAt(Math.floor(Math.random() * alpha.length));
    return code;
}

module.exports = {
    NewGame: async function () {
        var code = makecode();
        var g = new Game({
            _id: new mongoose.Types.ObjectId,
            code: code,
            createDate: Date.now(),
            started: false,
            completed: false,
            players: 0
        });
        return g;
    },

    NewPlayer: async function (game, name, admin) {
        var p = new Player({
            _id: new mongoose.Types.ObjectId,
            createDate: Date.now(),
            name: name,
            game: game._id,
            admin: admin
        });
        p.save();
        game.players++;
        return p;
    },

    FindGame: async function (code, callback) {
        console.log("Finding " + code);
        Game.findOne({ code: code }, function (err, g) {
            if (err) {
                return err;
            }
            if (callback) {
                callback(g);
            }
        });
    },

    JoinGame: async function (game, callback) {
        console.log("Joining " + game.code)
        if (callback) {
            callback(game);
        }
    },

    GetGameData: function (game) {
        return {
            _id: game._id,
            code: game.code,
            started: game.started,
            completed: game.completed,
            players: game.players
        }
    },

    GetPlayerData: function (player) {
        return player;
    }
}
