// /routes.js/orders.js
var express = require('express');
var router = express.Router();
var orderController = require('../controllers/orders');

// /* Get all orders */
// // router.get('/', orderController.index);
// Form of adding new order
router.get('/new', orderController.new);
// // Get details of order
// // router.get('/:id', orderController.show);
// // Create new order
// // router.post('/', orderController.create);
// // Delete order
// // router.delete('/:id', orderController.delete);

module.exports = router;
