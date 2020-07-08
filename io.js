const io = require('socket.io')();

io.on('connection', function(socket) {
    socket.on('add-circle', function(data) {
        io.emit('add-circle', data);
    });
});

module.exports = io;