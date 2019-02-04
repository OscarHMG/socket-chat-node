var socket;

$(document).ready(function() {
    socket = io();
    var params = new URLSearchParams(window.location.search);

    if (!params.has('name') || !params.has('room')) {
        window.location = 'index.html';
        throw new Error('Param "name" and "room" are required');
    }

    var user = {
        name: params.get('name'),
        room: params.get('room')
    };

    socket.on('connect', function() {
        console.log('Conectado al servidor');

        //Send notification to server that the user is in the chat.
        socket.emit('enterChat', user, function(resp) {
            renderUsers(resp);
        });
    });

    // escuchar
    socket.on('disconnect', function() {

        console.log('Perdimos conexión con el servidor');

    });

    //Listen MESSAGES SENDED
    socket.on('sendMessage', function(message) {
        console.log('Server (New message)', message)
    });

    //Listen BROADCAST WHEN USER DISCONNECT
    socket.on('notifyUsers', function(resp) {
        console.log('Server :', resp);
        renderUsers(resp);

    });

    //LISTEN BROADCAST WHEN USER ENTER/LEAVES THE CHAT
    socket.on('listAllUsersConnected', function(users) {
        //console.log(users);
        renderUsers(users);
    });

    //Private messages
    socket.on('sendPrivateMessage', function(message) {
        console.log('Private mssg: ', message)
    });
});