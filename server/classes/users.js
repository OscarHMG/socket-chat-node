class Users {

    constructor() {
        this.users = [];
    }


    addNewUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return this.users;
    }

    getUser(id) {
        let user = this.users.filter(u => {
            return u.id === id;
        })[0];

        return user;
    }

    getUserByRoom(room) {
        let usersByRoom = this.users.filter(user => {
            return user.room === room;
        });
        return usersByRoom;
    }

    getAllUsers() {
        return this.users;
    }

    removeUser(id) {
        let userRemoved = this.getUser(id);

        this.users = this.users.filter(user => {
            return user.id !== id
        });



        return userRemoved;
    }

}

module.exports = {
    Users
};