const Order = require('../models/product');

module.exports = {
  calculateTotalPrice
};

// 根据选择的产品们的价格和数量，计算订单总价
async function calculateTotalPrice(products) {
  let totalPrice = 0;

  // 遍历选择的产品数组
  for (const product of products) {
    // 获取产品的_id和数量
    const productId = product.productId;
    const quantity = product.quantity;

    // 从数据库中查找产品并获取其价格
    try {
      const foundProduct = await Product.findById(productId);
      if (foundProduct) {
        // 将产品的价格乘以数量，并累加到总价中
        totalPrice += foundProduct.price * quantity;
      }
    } catch (err) {
      // 处理数据库查询错误
      console.error('Error fetching product from database:', err);
    }
  }
  return totalPrice;
}

