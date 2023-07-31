// /routes.js/users.js
var express = require('express');
var router = express.Router();
var productController = require('../controllers/products');

/* GET products */
router.get('/', productController.index);
// GET /products/new
router.get('/new', productController.new);
// Get details of products
router.get('/:id', productController.show);
// Create new product
router.post('/', productController.create);

module.exports = router;