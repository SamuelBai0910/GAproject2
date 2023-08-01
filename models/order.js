// models/orders.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderName: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  productsPrice: { type: Number, min: 0 }
});

module.exports = mongoose.model('orders', orderSchema);
