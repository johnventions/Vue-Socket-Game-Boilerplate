var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    createDate: { type: Date, Default: Date.now },
    name: String,
    game: Schema.Types.ObjectId,
    admin: Boolean
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
