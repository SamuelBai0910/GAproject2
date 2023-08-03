// controllers/produsts.js
const { render } = require('ejs');
const Product = require('../models/product');
const Pic = require('../models/pic');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

module.exports = {
  index,
  show,
  new: newProduct,
  addProperty,
  create,
  createPic,
  delete: deleteProduct,
  deleteProperty,
  edit: editProduct,
  update: updateProduct
};

async function createPic(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newPic = new Pic({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id
    });

    const savedPic = await newPic.save();

    product.pic = savedPic._id;
    console.log(savedPic);
    await product.save();

    res.redirect(`/products/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.redirect(`/products/${req.params.id}`); // Handle the error by redirecting to the product page
  }
}


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

async function deleteProperty(req, res) {
  try {
    const productId = req.params.productId; // 修改为正确的参数名
    const propertyId = req.params.propertyId; // 获取要删除的属性 ID

    // 通过产品 ID 查找产品
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    // 使用 $pull 操作符从 property 数组中移除对应的属性
    product.property.pull({ _id: propertyId });
    await product.save();

    res.redirect(`/products/${productId}`); // 删除成功后返回 show 页面
  } catch (err) {
    console.error(err);
    res.redirect(`/products/${productId}`); // 出现错误时也返回 show 页面
  }
}


async function index(req, res) {
  const products = await Product.find({});
  res.render('products/index', { products });
}

async function show(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    const listingDate = new Date(product.listingDate);
    const pic = await Pic.findById(product.pic); // Find the associated pic
    console.log(pic);
    res.render('products/show', { product: { ...product._doc, listingDate }, pic });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
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
