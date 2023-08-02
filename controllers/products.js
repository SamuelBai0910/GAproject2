// controllers/produsts.js
const { render } = require('ejs');
const Product = require('../models/product');

module.exports = {
  index,
  show,
  new: newProduct,
  addProperty,
  create,
  delete: deleteProduct,
  edit: editProduct,
  update: updateProduct
};

async function addProperty(req, res) {
  const { discount, variants } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    product.property.push({ discount, variants });
    await product.save();
    res.redirect(`/products/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding Property');
  }
}


async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;
    await Product.findByIdAndUpdate(productId, updatedProductData);
    res.redirect(`/products/${productId}`);
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
}

async function editProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
}

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

