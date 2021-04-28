var express = require('express');
var router = express.Router();
const account = require('../models/accounts/handlerAccounts');
const yadda = require('../models/yaddas/handlerYaddas');
const Yadda = require('../models/yaddas/yaddas');

/* GET home page. */

router.get("/", async function (req, res) {
  let result = await account.getAccount({}, {});
  if (!req.session.authenticated) {
    res.redirect("/login");
  } else {
    res.render("index", {
      title: "Awaiting users",
      accounts: result,
    });
  }
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

router.get("/awaiting", function (req, res, next) {
  res.render("awaiting", { title: "Await" });
});

router.get("/logout", function (req, res) {
  user = false;
  admin = false;
  console.log(admin);
  req.session.destroy();
  res.redirect("/login");
});

router.get("/index", async function (req, res, next) {
  let result = await yadda.getYaddas(req);
  res.render("index", { 
    title: "Create a ned Yadda",
    yadda: result, 
  });
  console.log(result);
});

router.post("/index", async function (req, res, next) {
  let result = await yadda.createYaddas(req);
  res.render("index", {
    title: "Create a new Yadda",
    yadda: result,
  });
});

module.exports = router;
