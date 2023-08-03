const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const picSchema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  cloudinary_id: {
    type: String
  },
})

module.exports = mongoose.model('Pic', picSchema);
