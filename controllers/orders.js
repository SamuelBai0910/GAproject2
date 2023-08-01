const { render } = require('ejs');
const Order = require('../models/order');
const Product = require('../models/product');

module.exports = {
  calculateTotalPrice,
  new: newOrder,
  create,
};

async function calculateTotalPrice(req, res) {
  const selectedProductId = req.body.selectedProduct;
  const quantity = parseInt(req.body.quantity);

  try {
    const selectedProduct = await Product.findById(selectedProductId);
    const totalPrice = selectedProduct.price * quantity;
    res.render('orders/new', { products: [], selectedProduct, quantity, totalPrice });
  } catch (err) {
    console.error('Error fetching product from database:', err);
    res.redirect('/orders/new');
  }
}


async function newOrder(req, res) {
  try {
    const products = await Product.find({}); // 使用 await 来获取产品列表
    res.render('orders/new', { products });
  } catch (err) {
    console.error('Error fetching products from database:', err);
    res.redirect('/orders');
  }
}

async function create(req, res) {
  try {
    const totalPrice = await calculateTotalPrice(req.body.products);
    const newOrder = {
      orderName: req.body.orderName,
      totalPrice: totalPrice,
      products: req.body.products
    };
    await Order.create(newOrder);
    res.redirect('/orders');
  } catch (err) {
    console.error('Error creating order:', err);
    res.redirect('/orders');
  }
}
