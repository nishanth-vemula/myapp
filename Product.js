const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name']
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  category: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  }
});
module.exports = mongoose.model('Product', ProductSchema);