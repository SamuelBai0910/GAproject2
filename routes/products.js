// /routes.js/users.js
var express = require('express');
var router = express.Router();
var productController = require('../controllers/products');

/* GET products */
router.get('/', productController.index);

module.exports = router;