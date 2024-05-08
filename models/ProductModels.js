const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: null },
  categories: [{ type: String }] // Array of strings for categories
});

// Compile the model from the schema.
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
