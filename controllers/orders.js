// controllers/orders.js
const { render } = require('ejs');
const Order = require('../models/order');
const Product = require('../models/product');

module.exports = {
  index,
  show,
  new: newOrder,
  create,
  delete: deleteOrder,
};

async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    res.redirect('/orders');
  } catch (err) {
    console.error(err);
    res.redirect('/orders');
  }
}

async function index(req, res) {
  const orders = await Order.find({});
  res.render('orders/index', { orders });
}

async function show(req, res) {
  const order = await Order.findById(req.params.id);
  res.render('orders/show', { order: { ...order._doc } });
}

async function newOrder(req, res) {
  const products = await Product.find({});
  res.render('orders/new', { products, errorMsg: '' });
}

async function create(req, res) {
  try {
    await Order.create(req.body);
    res.redirect('/orders');
  } catch (err) {
    console.error(err);
    res.redirect('/orders');
  }
}
