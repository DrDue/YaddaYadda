const mongoose = require("mongoose");

const followersSchema = mongoose.Schema({
    followers: String,
    following: String
});

module.exports = mongoose.model("follower", followersSchema, 'followers');