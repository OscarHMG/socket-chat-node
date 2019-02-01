class Users {

    constructor() {
        this.users = [];
    }


    addNewUser(id, name) {
        let user = { id, name };
        this.users.push(user);

        return this.users;
    }

    getUser(id) {
        let user = this.users.filter(u => {
            return u.id === id;
        })[0];

        return user;
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