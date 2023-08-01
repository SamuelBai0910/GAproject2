const { render } = require('ejs');
const Order = require('../models/order');
const Product = require('../models/product');


module.exports = {
  new: newOrder,
};

function newOrder(req, res) {
  res.render('orders/new', { errorMsg: '' });
}