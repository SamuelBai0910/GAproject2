// /routes.js/users.js
var express = require('express');
var router = express.Router();
var productController = require('../controllers/products');

/* Get all products */
router.get('/', productController.index);
// Form of adding new product 
router.get('/new', productController.new);
// Get details of product
router.get('/:id', productController.show);
// Create new product
router.post('/', productController.create);
// Form of editing page
router.get('/:id/edit', productController.edit);
// Confirming the editing form
router.put('/:id', productController.update);
// Delete product
router.delete('/:id', productController.delete);

module.exports = router;