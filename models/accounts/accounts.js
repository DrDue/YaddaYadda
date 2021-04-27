const mongoose = require("mongoose");

const accountsSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String, 
    lastname: String,
    username: String,
    rights: {type: String, enum: ["admin", "user", "awaiting"], default: "awaiting"},
    avatar: {data: Buffer, MimeType: String}
});

module.exports = mongoose.model("Account", accountsSchema, 'accounts');