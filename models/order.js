// models/orders.js
const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderName: { type: String, required: true },
  productSelection: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  quantity: [{ type: Number, required: true, min: 1 }],
  ProductsPrice: [{ type: Number, min: 0 }]
});

module.exports = mongoose.model('orders', orderSchema);
