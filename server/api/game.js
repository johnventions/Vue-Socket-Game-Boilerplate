
const Game = require("../models/Game.js");
const GameService = require("../utils/GameService.js");
const routes = require('express').Router();

module.exports = function (db, io) {
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
            players: [newplayer],
            message: 'Connected!'
        });
    });

    routes.post("/:gameid/join", async function (req, res) {
        var name = req.body.user;
        var code = req.params.gameid.toUpperCase();
        var game = await GameService.FindGame(code);
        if (game == null) {
            return res.status(400).json({
                success: false,
                message: "Game not found"
            });
        }
        //check if player exists
        var newplayer = await GameService.FindPlayer(game._id, name);
        if (newplayer == null) {
            //create new player if not found
            newplayer = await GameService.NewPlayer(game, name, false);
        }
        var players = await GameService.FindPlayers(game._id);
        game.save();
        io.to(code).emit("NewPlayer", players);
        return res.status(200).json({
            success: true,
            game: GameService.GetGameData(game),
            player: GameService.GetPlayerData(newplayer),
            players: players,
            message: 'Connected!'
        });
    });

    routes.post("/:gameid/start", async function(req, res){
        var code = req.params.gameid;
        //find game to start
        var game = await GameService.FindGame(code);
        if (game == null) {
            return res.status(400).json({
                success: false,
                message: "Game not found"
            });
        }
        game.started = true;
        game.save();
        io.to(code).emit("StartGame", {});
        return res.status(200).json({
            success: true,
        });
    });

    return routes;
}