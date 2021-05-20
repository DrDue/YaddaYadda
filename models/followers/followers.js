const mongoose = require("mongoose");

const followersSchema = mongoose.Schema({
    _id: {
        type: String,
        unique: true
    },
    follower: {
        type: String,
        ref: "Accounts"
    },
    following: {
        type: String,
        ref: "Accounts"
    },
    
});

module.exports = mongoose.model("Follower", followersSchema, 'followers');