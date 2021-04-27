var express = require('express');
var router = express.Router();
const account = require('../models/accounts/handlerAccounts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/createUser", function (req, res, next) {
  res.render("createUser", { title: "Create User" });
});

router.post("/createUser", async function (req, res, next) {
  let result = await account.createAccount(req);
  res.render("createUser", {
    title: "Create a new user",
    account: result,
  });
});

router.get("/login", function (req, res) {
  // display register route
  res.render("login", {
    // display register form view
    title: "User login", // input data to view
  });
});

router.post("/login", async function (req, res) {
  // new user post route
  let rc = await account.verifyAccount(req); // verify credentials
  if ((rc && req.session.rights === "user") || req.session.rights === "admin") {
    res.render("index", {
      // find the view 'index'
      title: "Velkommen til Yadda", // input data to 'index'
      loggedin: true,
      who: req.session.user, // using session var(s)
    });
  } else {
    res.render("login", {
      // find the view 'login'
      title: "Ikke logget ind", // input data to 'login'
      loggedin: false,
    });
  }
});

router.get("/logout", function (req, res) {
  user = false;
  admin = false;
  console.log(admin);
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
