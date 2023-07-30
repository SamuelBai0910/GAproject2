const Product = require('../models/product');

module.exports = {
  // 其他控制器方法...
  getFormattedListingDate
};

function getFormattedListingDate(listingDate) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return listingDate.toLocaleString('en-US', options);
}
