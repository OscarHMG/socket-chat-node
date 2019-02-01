const { io } = require('../server');
const { Users } = require('../classes/users');

const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (user, callback) => {
        if (!user.name) {
            return callback({
                error: true,
                mssg: 'Name is required'
            });
        }

        let allUsers = users.addNewUser(client.id, user.name);

        //Returna ll the users connected in the chat
        callback(allUsers);
    });


});