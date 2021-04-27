var express = require('express');
var router = express.Router();
const account = require("../models/handlerAccounts");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
