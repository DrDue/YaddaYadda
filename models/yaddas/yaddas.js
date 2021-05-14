const mongoose = require("mongoose");
const dato = require('../../public/javascripts/date');

const yaddasSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avatar: {
        data: Buffer, 
        MimeType: String
    },
    yadda: {
        type: String,
        required: true
    },
    created: {
        type: String,
        //default: `{dato$.formatedTime()} | ${dato.formatedDate()}`
        default: Date.now
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Yadda"
    },
    tag: {
        type: String,
    }
});

module.exports = mongoose.model("Yadda", yaddasSchema, 'yaddas');