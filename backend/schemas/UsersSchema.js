const { Schema } = require("mongoose");

const UsersSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = { UsersSchema };