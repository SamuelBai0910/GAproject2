// controllers/produsts.js
const Product = require('../models/product');

module.exports = {
  index,
  show,
  new: newProduct,
  create,
};

async function index(req, res) {
  const products = await Product.find({});
  res.render('products/index', { products });
}

async function show(req, res) {
  const product = await Product.findById(req.params.id);
  const listingDate = new Date(product.listingDate);
  res.render('products/show', { product: { ...product._doc} });
}

function newProduct(req, res) {
  res.render('products/new', { errorMsg: '' });
}

async function create(req, res) {
  try {
    const newProduct = await Product.create(req.body);
    res.redirect(`/products/${newProduct._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('products/new', { errorMsg: err.message });
  }
} 

