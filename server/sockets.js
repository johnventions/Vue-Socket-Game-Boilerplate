const socketIO = require('socket.io');

module.exports = function (server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        io.emit('message', "Welcome friend!");
        console.log("Socket Connected!");
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
}