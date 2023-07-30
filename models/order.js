// models/orderls.js
const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  ordertName: { type: String, required: true },
  totalPrice: { type: Number, required: true, min: 0 },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  quantity: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model('Order', orderSchema);