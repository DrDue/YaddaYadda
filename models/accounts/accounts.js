const mongoose = require("mongoose");

const accountsSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String, 
    lastname: String,
    rights: {type: String, enum: ["admin", "user", "awaiting"], default: "admin"},
    avatar: {data: Buffer, MimeType: String}
});

module.exports = mongoose.model("Account", accountsSchema, 'accounts');