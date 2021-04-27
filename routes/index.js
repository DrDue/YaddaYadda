var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/createUser", function (req, res, next) {
  res.render("createUser", { title: "Home Page" });
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

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
