// /routes/products.js
var express = require('express');
var router = express.Router();
var upload = require('../utils/multer');
var productController = require('../controllers/products');

/* Get all products */
router.get('/', productController.index);
// Form of adding new product 
router.get('/new', productController.new);
// Get details of product
router.get('/:id', productController.show);
// Create new property
router.post('/:id/property', productController.addProperty);
// Create new product
router.post('/', productController.create);
// Create new pic
router.post('/:id/pic', upload.single('image'), productController.createPic);
// Form of editing page
router.get('/:id/edit', productController.edit);
// Confirming the editing form
router.put('/:id', productController.update);
// Delete product
router.delete('/:id', productController.delete);
// Delete product/property
router.delete('/:productId/properties/:propertyId', productController.deleteProperty);

module.exports = router;