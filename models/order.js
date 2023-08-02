// models/orders.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderName: { type: String, required: true },
  productSelection: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  quantity: [{ type: Number, required: true, min: 1 }],
  productsPrice: [{ type: Number, min: 0 }]
});

module.exports = mongoose.model('Order', orderSchema);
