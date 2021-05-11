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
    let theme = req.session.theme;
    res.render("index", {
      title: "Create a new Yadda",
      yaddas: result,
      theme: theme
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


// reply yadda router
router.get("/replyYadda/:yadda", async function (req, res) {
  if (!req.session.authenticated) {
    res.redirect("/login");
  } else {
    let check = {_id: req.params.yadda};
    console.log(check)
    let oneYadda = await yadda.getYaddas(check);
    let check2 = {};
    let result = await yadda.getYaddas(check2, null);
    let theme = req.session.theme
    console.log("result: " + result);
    res.render("replyYadda", {
      title: "Reply",
      oneYadda: oneYadda[0],
      yaddas: result,
      theme: theme
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
    let check = {username: req.params.username};
    let user = await account.getAccount(check);
    console.log(check);;
    let currentUser = req.session;
    let currentTheme = currentUser.theme
    let theme = req.session.theme;
    console.log(req.session.username);
    res.render("profiles", {
      title: "Profile",
      user: user[0],
      currentUser: currentUser,
      theme: theme,
      currentTheme: currentTheme
    })
  }
});

router.get("/changelight/:id", async function (req, res) {
  let result = await account.changeLight({username: req.params.id}, {});
  res.redirect("/profiles/" + req.session.username);  
});

router.get("/changedark/:id", async function (req, res) {
  let result = await account.changeDark({username: req.params.id}, {});
  res.redirect("/profiles/" + req.session.username);  
});

router.get('/getimage/:userid', account.lookupImage);

module.exports = router;
