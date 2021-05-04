const mongoose = require("mongoose");

const accountsSchema = mongoose.Schema({
    email: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    rights: {
        type: String, 
        enum: ["admin", "user", "awaiting"], 
        default: "admin"
    },
    avatar: {
        data: Buffer, 
        MimeType: String
    },
    theme: {
        type: String, 
        enum: ["light", "dark"], 
        default: "light"
    }
});

module.exports = mongoose.model("Account", accountsSchema, 'accounts');