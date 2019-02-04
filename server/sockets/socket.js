const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');
const users = new Users();

io.on('connection', (client) => {

    //Here USER connect into the chat
    client.on('enterChat', (user, callback) => {
        console.log('Entered to the chat');
        if (!user.name || !user.room) {
            return callback({
                error: true,
                mssg: 'Name/room are required'
            });
        }
        //Assign room 
        client.join(user.room)

        let allUsers = users.addNewUser(client.id, user.name, user.room);

        client.broadcast.emit('listAllUsersConnected', users.getAllUsers());

        //Returna ll the users connected in the chat
        callback(allUsers);
    });


    client.on('sendMessage', (data) => {

        let user = users.getUser(client.id);
        let message = createMessage(user.name, data.message);
        client.broadcast.emit('sendMessage', message);
    });

    client.on('disconnect', () => {
        let userRemoved = users.removeUser(client.id);


        //User is retired from the chat, notify all the users
        client.broadcast.emit('notifyUsers', createMessage('Admin', `${userRemoved.name} left the chat`));

        client.broadcast.emit('listAllUsersConnected', users.getAllUsers());
    });



    //SEND PRIVATE MESSAGE
    client.on('sendPrivateMessage', (data) => {
        let user = users.getUser(client.id);

        //SEND DATA 1 TO 1

        client.broadcast.to(data.to).emit('sendPrivateMessage', createMessage(user.name, data.message));
    });


});