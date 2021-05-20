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
    console.log("CHEKKER: " + chk);
    Followers.findOneAndDelete({ _id: chk }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    });
  },

  follow: async function (req, user) {
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
    console.log("THIS IS USER: " + user)
    let follower = new Followers({
      _id: req.session.username + " Follows " + user ,
      follower: req.session.username,
      following: user
    });
    Followers.create(follower, function(error, savedDocument) {
      if (error) 
          console.log(error);
      console.log(savedDocument);
      db.close(); 
  });
  }
};
