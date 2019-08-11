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
        var codeapproved = false;
        while (!codeapproved) {
            var existing = await this.FindGame(code);
            if (existing == null) {
                codeapproved = true;
            } else {
                code = makecode();
            }
        }
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

    /** @param {game} game */
    /** @param {string} name */
    /** @param {bool} admin */
    NewPlayer: async function (game, name, admin) {
        var p = new Player({
            _id: new mongoose.Types.ObjectId,
            createDate: Date.now(),
            name: name,
            game: game._id,
            admin: admin
        });
        return p.save().then( function() {
            game.players++;
            return p;
        });
    },


    /** @param {string} code */
    FindGame: async function (code) {
        code = code.toUpperCase();
        return Game.findOne({ code: code }, function (err, game) {
            if (err) {
                return null;
            }
            return game;
        });
    },

    /** @param {id} gameID */
    /** @param {string} name */
    FindPlayer: async function(gameID, name) {
        return Player.findOne({game: gameID, name: name}, function(err, p) {
            if (err) {
                return null;
            }
            return p;
        });
    },

    /** @param {id} gameID */
    FindPlayers: async function(gameID) {
        return Player.find({game: gameID}, function(err, p){
            if (err) {
                return [];
            }
            return p;
        })
    },

    /** @param {game} game */
    GetGameData: function (game) {
        return {
            _id: game._id,
            code: game.code,
            started: game.started,
            completed: game.completed,
            players: game.players
        }
    },

    /** @param {player} player */
    GetPlayerData: function (player) {
        return player;
    }
}
