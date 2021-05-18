const mongoose = require("mongoose");

const followersSchema = mongoose.Schema({
    followers: {
        type: String,
        ref: "Accounts"
    },
    following: {
        type: String,
        ref: "Accounts"
    }
});

module.exports = mongoose.model("Follower", followersSchema, 'followers');