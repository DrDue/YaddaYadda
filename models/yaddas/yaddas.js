const mongoose = require("mongoose");

const yaddasSchema = mongoose.Schema({
    username: String,
    avatar: {data: Buffer, MimeType: String},
    yadda: String,
    date: String,
    time: String
});

module.exports = mongoose.model("Yadda", yaddasSchema, 'yaddas');