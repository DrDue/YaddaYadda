const mongoose = require("mongoose");

const yaddasSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avatar: {data: Buffer, MimeType: String},
    yadda: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Yadda"
    }
});

module.exports = mongoose.model("Yadda", yaddasSchema, 'yaddas');