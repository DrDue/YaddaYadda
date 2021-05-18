const mongoose = require("mongoose");
const Followers = require("./followers");

module.exports = {
  getFollowers: async function (query, sort) {
    const dbname = "yadda"; // databasen hedder yadda
    const findDB = `mongodb://localhost:27017/${dbname}`;
    const conparam = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    await mongoose.connect(findDB, conparam);
    const db = mongoose.connection;
    db.once("open", function () {
      console.log("Connected to server by mongoose");
    });
    let result = await Followers.find(query, null, sort);
    return result;
  },

  unfollow: async function (chk) {
    const dbname = "yadda"; // databasen hedder yadda
    const findDB = `mongodb://localhost:27017/${dbname}`;
    const conparam = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    await mongoose.connect(findDB, conparam);
    const db = mongoose.connection;
    db.once("open", function () {
      console.log("Connected to server by mongoose");
    });
    Followers.findOneAndDelete({
      _id: chk,
      function(error, savedDocument) {
        if (error) console.log(error);
        console.log(savedDocument);
        db.close();
      },
    });
  },
};
