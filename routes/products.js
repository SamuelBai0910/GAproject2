// /routes.js/users.js
var express = require('express');
var router = express.Router();
var productControllers = require('../controllers/products');

/* GET products */
router.get('/', productControllers.index);

module.exports = router;