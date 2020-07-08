const io = require('socket.io')();

io.on('connection', function(socket) {
    socket.on('add-circle', function(data) {
        io.emit('add-circle', data);
    });
    socket.on('clear-display', function() {
        io.emit('clear-display');
    });
});

module.exports = io;