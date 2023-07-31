// controllers/produsts.js
const { render } = require('ejs');
const Product = require('../models/product');

module.exports = {
  index,
  show,
  new: newProduct,
  create,
  delete: deleteProduct
};

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
}

async function index(req, res) {
  const products = await Product.find({});
  res.render('products/index', { products });
}

async function show(req, res) {
  const product = await Product.findById(req.params.id);
  const listingDate = new Date(product.listingDate);
  res.render('products/show', { product: { ...product._doc, listingDate} });
}

function newProduct(req, res) {
  res.render('products/new', { errorMsg: '' });
}

async function create(req, res) {
  try {
    await Product.create(req.body);
    res.redirect('/products');
  } catch (err) {
    console.log(err);
  }
} 


