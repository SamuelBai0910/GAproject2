const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new mongoose.Schema({
  discount: {
    type: String,
    enum: ['10% Off', '20% Off', 'Free Shipping', 'Buy One Get One Free', 'Flash Sale']
  },
  variants: {
    type: String
  }
})

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  listingDate: {
    type: Date,
    default: function() {
      return new Date()
    },
  },
  description: { 
    type: String,
    maxlength: 300,
    default: 'No description yet' 
  },
  property :[propertySchema],
  pic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pic',
  }
});

module.exports = mongoose.model('Product', productSchema);