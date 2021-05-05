const mongoose = require("mongoose");

const accountsSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
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
    email: {
        type: String, 
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
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
