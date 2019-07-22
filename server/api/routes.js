
module.exports = function (db) {
    const routes = require('express').Router();
    const game = require("./game")(db);

    routes.use("/game", game);

    routes.get('/', (req, res) => {
        res.status(200).json({ message: 'Connected!' });
    });


    return routes;
}