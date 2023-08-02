// models/product.js
const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const propertySchema = new mongoose.Schema({
  discount: {
    type: String,
    enum: ['10% Off', '20% Off', 'Free Shipping', 'Buy One Get One Free', 'Flash Sale']
  },
  variants: {
    type: String
  },
  tags: {
    type: String
  }
})

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean },
  listingDate: {
    type: Number,
    default: function() {
      return new Date()
    },
  },
  description: { 
    type: String,
    maxlength: 300,
    default: 'No description yet' 
  },
  property :[propertySchema]
});

module.exports = mongoose.model('Product', productSchema);