
const Game = require("../models/Game.js");
const GameService = require("../utils/GameService.js");
const routes = require('express').Router();

module.exports = function (db) {
    routes.post("/", async function (req, res) {
        var name = req.body.user;
        var newgame = await GameService.NewGame();
        var newplayer = await GameService.NewPlayer(newgame, name, true);
        newgame.save();
        req.session.code = newgame.code;
        return res.status(200).json({
            success: true,
            game: GameService.GetGameData(newgame),
            player: GameService.GetPlayerData(newplayer),
            message: 'Connected!'
        });
    });

    routes.post("/join/:gameid", async function (req, res) {
        var name = req.body.user;
        var code = req.params.gameid;
        GameService.FindGame(code, async function (game) {
            var newplayer = await GameService.NewPlayer(game, name, true);
            game.save();
            return res.status(200).json({
                success: true,
                game: GameService.GetGameData(game),
                player: GameService.GetPlayerData(newplayer),
                message: 'Connected!'
            });
        });

    });

    return routes;
}