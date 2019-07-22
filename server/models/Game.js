var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var Player = require('./player');

var gameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    createDate: { type: Date, Default: Date.now },
    code: String,
    started: Boolean,
    completed: Boolean,
    // players: [Player]
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
