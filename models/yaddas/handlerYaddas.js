const mongoose = require('mongoose');
const Yadda = require('./yaddas');

module.exports = {
    createYaddas: async function (req) {
        const dbname = "yadda";         // databasen hedder yadda
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function () {
            console.log("Connected to server by mongoose");
        });

        let yadda = new Yadda({
            username: req.body.username,
            avatar: req.body.avatar,
            yadda: req.body.yadda,
            date: req.body.date,
            time: req.body.time
        });

        Yadda.create(yadda, function (error, savedDocument) {
            if (error)
                console.log(error);
            console.log(savedDocument);
            db.close();
        });
    },

    getYaddas: async function(query, sort) {
        const dbname = "yadda";         // databasen hedder yadda
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
        console.log("Connected to server by mongoose");
        });
        let result = await Yadda.find(query, null, sort);
        return result;
    }
};