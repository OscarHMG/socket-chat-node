$(document).ready(function() {
    var socket = io();
    var params = new URLSearchParams(window.location.search);

    if (!params.has('name')) {
        window.location = 'index.html';
        throw new Error('Param "name" is required');
    }

    var user = {
        name: params.get('name')
    };

    socket.on('connect', function() {
        console.log('Conectado al servidor');

        //Send notification to server that the user is in the chat.
        socket.emit('enterChat', user, function(resp) {
            console.log('Users connected: ', resp)
        });
    });

    // escuchar
    socket.on('disconnect', function() {

        console.log('Perdimos conexión con el servidor');

    });
});