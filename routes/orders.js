// /routes.js/orders.js
var express = require('express');
var router = express.Router();

/* GET order home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;