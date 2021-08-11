const sql = require("../config/db");

// constructor
const User = function(user) {
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.bio = user.bio;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
};

User.create = (newUser, result) => {  
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Create current date
        let timestamp = new Date();
        date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(timestamp);

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser, createdAt: date, updatedAt: date });
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.updateById = (id, user, result) => {

    sql.query("UPDATE users SET email = ?, username = ?, bio = ? WHERE id = ?",
    [user.email, user.username, user.bio, id], (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        // Create current date
        let timestamp = new Date();
        date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(timestamp);

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user, updatedAt: date });
    });
};

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

module.exports = User;