const mongoose = require("mongoose");

const followersSchema = mongoose.Schema({
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accounts"
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accounts"
    }
});

module.exports = mongoose.model("follower", followersSchema, 'followers');