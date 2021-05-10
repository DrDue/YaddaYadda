var express = require("express");
var router = express.Router();
const account = require("../models/accounts/handlerAccounts");
const yadda = require("../models/yaddas/handlerYaddas");
const Yadda = require("../models/yaddas/yaddas");

/* GET home page. */

router.get("/", async function (req, res, next) {
  if (!req.session.authenticated) {
    res.redirect("/login");
  } else {
    let check = {};                                   // var der i forvejen
    let sort = {sort: {created: -1}}           // ny
    let result = await yadda.getYaddas(check, sort); // skal bruge check og sort
    res.render("index", {
      title: "Create a new Yadda",
      yaddas: result,
    });
  }
});

router.post("/", async function (req, res, next) {
  let result = await yadda.createYaddas(req);
  res.redirect("/");
});

router.get("/createUser", function (req, res, next) {
  res.render("createUser", { title: "Create User" });
});

router.post("/createUser", async function (req, res, next) {
  let result = await account.createAccount(req, res, next);
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
  if (
    (rc && req.session.rights === "user") ||
    (rc && req.session.rights === "admin")
  ) {
    res.redirect("/");
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
  // console.log(admin);
  req.session.destroy();
  res.redirect("/login");
});

router.get("/replyYadda/:yadda", async function (req, res) {
  if (!req.session.authenticated) {
    res.redirect("/login");
  } else {
    let check = {_id: req.params.yadda};
    let oneYadda = await yadda.getYaddas(check);
    let check2 = {};
    let result = await yadda.getYaddas(check2, null);
    console.log("result: " + result);
    res.render("replyYadda", {
      title: "Reply",
      oneYadda: oneYadda[0],
      yaddas: result
    })
  }
});

router.post("/replyYadda/:yadda", async function (req, res, next) {
  let result = await yadda.createYaddas(req);
  let check = {_id: req.params.yadda};
  let oneYadda = await yadda.getYaddas(check);
  res.redirect("/replyYadda/" + oneYadda[0]._id);
});

// Router to check profiles
router.get("/profiles/:username", async function (req, res) {
  if (!req.session.authenticated) {
    res.redirect("/login");
  } else {
    let check = {username: req.params.yadda};
    let oneYadda = await yadda.getYaddas(check);
    let check2 = {};
    let result = await yadda.getYaddas(check2, null);
    console.log("result: " + result);
    res.render("profiles", {
      title: "Reply",
      oneYadda: oneYadda[0],
      yaddas: result
    })
  }
});

router.get('/getimage/:userid', account.lookupImage);

module.exports = router;
